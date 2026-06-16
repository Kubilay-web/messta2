import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";
import { validateRequest } from '@/app/auth';


export async function POST(
  request: NextRequest,
  { params }: { params: { questionId: string } }
) {
  try {
    const {user} = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const users = await db.user.findUnique({
      where: { email: user.email }
    });

    if (!users) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { voteType } = await request.json();

    // Check existing vote
    const existingVote = await db.voteForum.findFirst({
      where: {
        userId: user.id,
        actionId: params.questionId,
        actionType: 'question'
      }
    });

    const question = await db.questionForum.findUnique({
      where: { id: params.questionId }
    });

    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    if (existingVote) {
      // Remove vote if same type
      if (existingVote.voteType === voteType) {
        await db.voteForum.delete({
          where: { id: existingVote.id }
        });

        // Update question vote count
        await db.questionForum.update({
          where: { id: params.questionId },
          data: {
            [voteType === 'upvote' ? 'upvotes' : 'downvotes']: {
              decrement: 1
            }
          }
        });
      } else {
        // Change vote type
        await db.voteForum.update({
          where: { id: existingVote.id },
          data: { voteType }
        });

        // Update question vote counts
        await db.questionForum.update({
          where: { id: params.questionId },
          data: {
            [existingVote.voteType === 'upvote' ? 'upvotes' : 'downvotes']: {
              decrement: 1
            },
            [voteType === 'upvote' ? 'upvotes' : 'downvotes']: {
              increment: 1
            }
          }
        });
      }
    } else {
      // Create new vote
      await db.voteForum.create({
        data: {
          userId: user.id,
          actionId: params.questionId,
          actionType: 'question',
          voteType
        }
      });

      // Update question vote count
      await db.questionForum.update({
        where: { id: params.questionId },
        data: {
          [voteType === 'upvote' ? 'upvotes' : 'downvotes']: {
            increment: 1
          }
        }
      });
    }

    // Get updated question
    const updatedQuestion = await db.questionForum.findUnique({
      where: { id: params.questionId },
      include: {
        user: {
          select: {
            id: true,
            displayName: true,
            avatarUrl: true
          }
        }
      }
    });

    // Get user's current vote
    const currentVote = await db.voteForum.findFirst({
      where: {
        userId: user.id,
        actionId: params.questionId,
        actionType: 'question'
      }
    });

    const questionWithVote = {
      ...updatedQuestion,
      userVote: currentVote?.voteType || null
    };

    return NextResponse.json(questionWithVote);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process vote' }, { status: 500 });
  }
}