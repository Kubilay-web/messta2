'use server';


import { validateRequest } from "@/app/auth";
import db from "@/app/lib/db";
import {uniq} from "lodash";

export async function getSessionEmail(): Promise<string|null|undefined> {
  const {user} = await validateRequest();
  return user?.email;
}

export async function getSessionEmailOrThrow(): Promise<string> {
  const userEmail = await getSessionEmail();
  if (!userEmail) {
    throw 'not logged in';
  }
  return userEmail;
}

export async function updateProfile(data: FormData) {
  const userEmail = await getSessionEmailOrThrow();
  const newUserInfo = {
    username: data.get('username') as string,
    name: data.get('name') as string,
    subtitle: data.get('subtitle') as string,
    bio: data.get('bio') as string,
    avatar: data.get('avatar') as string,
  };
  await db.profileInstagram.upsert({
    where: {
      email: userEmail,
    },
    update: newUserInfo,
    create: {
      email: userEmail,
      ...newUserInfo,
    },
  });
}

export async function postEntry(data: FormData) {
  const sessionEmail = await getSessionEmailOrThrow();
  const postDoc = await db.postInstagram.create({
    data: {
      author: sessionEmail,
      image: data.get('image') as string,
      description: data.get('description') as string || '',
    },
  });
  return { id: postDoc.id };
}

export async function postComment(data: FormData) {
  const authorEmail = await getSessionEmailOrThrow();
  return db.commentInstagram.create({
    data: {
      author: authorEmail,
      postId: data.get('postId') as string,
      text: data.get('text') as string,
    },
  })
}

async function updatePostLikesCount(postId: string) {
  await db.postInstagram.update({
    where:{id:postId},
    data:{
      likesCount: await db.likeInstagram.count({where:{postId}}),
    },
  });
}

export async function likePost(data: FormData) {
  const postId = data.get('postId') as string;
  await db.likeInstagram.create({
    data: {
      author: await getSessionEmailOrThrow(),
      postId,
    },
  });
  await updatePostLikesCount(postId);
}

export async function removeLikeFromPost(data: FormData) {
  const postId = data.get('postId') as string;
  await db.likeInstagram.deleteMany({
    where: {
      postId,
      author: await getSessionEmailOrThrow(),
    },
  });
  await updatePostLikesCount(postId);
}

export async function getSinglePostData(postId:string) {
  const postInstagram = await db.postInstagram.findFirstOrThrow({where:{id:postId}});
  const authorProfile = await db.profileInstagram.findFirstOrThrow({where:{email:postInstagram.author}});
  const comments = await db.commentInstagram.findMany({where:{postId:postInstagram.id}});
  const commentsAuthors = await db.profileInstagram.findMany({
    where: {
      email: {in: uniq(comments.map(c => c.author))},
    },
  });
  const sessionEmail = await getSessionEmailOrThrow();
  const myLike = await db.likeInstagram.findFirst({
    where: {
      author: sessionEmail,
      postId: postInstagram.id,
    }
  });
  const myBookmark = await db.bookmarkInstagram.findFirst({
    where: {
      author: sessionEmail,
      postId: postInstagram.id,
    }
  });
  return {
    postInstagram, authorProfile, comments,
    commentsAuthors, myLike, myBookmark,
  };
}

export async function followProfile(profileIdToFollow:string) {
  const sessionProfile = await db.profileInstagram.findFirstOrThrow({
    where:{email: await getSessionEmailOrThrow()},
  });
  await db.followerInstagram.create({
    data: {
      followingProfileEmail: sessionProfile.email,
      followingProfileId: sessionProfile.id,
      followedProfileId: profileIdToFollow,
    },
  });
}

export async function unfollowProfile(profileIdToFollow:string) {
  const sessionProfile = await db.profileInstagram.findFirstOrThrow({
    where:{email: await getSessionEmailOrThrow()},
  });
  await db.followerInstagram.deleteMany({
    where: {
      followingProfileEmail: sessionProfile.email,
      followingProfileId: sessionProfile.id,
    },
  });
}

export async function bookmarkPost(postId:string) {
  const sessionEmail = await getSessionEmailOrThrow();
  await db.bookmarkInstagram.create({
    data:{
      author: sessionEmail,
      postId,
    },
  });
}

export async function unbookmarkPost(postId:string) {
  const sessionEmail = await getSessionEmailOrThrow();
  await db.bookmarkInstagram.deleteMany({
    where:{
      author: sessionEmail,
      postId,
    },
  });
}




export async function ensureInstagramProfile(email: string) {
  // Profile var mı kontrol et
  let profile = await db.profileInstagram.findFirst({ where: { email } });

  if (!profile) {
    const user = await db.user.findFirst({ where: { email } });
    if (!user) throw new Error("User not found");

    profile = await db.profileInstagram.create({
      data: {
        email: user.email,
        username: user.username || user.email.split("@")[0],
        name: user.displayName || null,
        avatar: user.avatarUrl || null,
        bio: "",
        subtitle: "",
      },
    });
  }

  return profile;
}
