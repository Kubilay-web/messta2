import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";
import { UserLogCreateProps } from '../types/types';

// ==================== GET İŞLEMLERİ ====================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const logId = searchParams.get('id');
    const userId = searchParams.get('userId');
    const type = searchParams.get('type'); // 'recent', 'by-user', 'stats'
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    // Tek bir log getir
    if (logId) {
      const log = await db.userLog.findUnique({
        where: { id: logId },
        include: {
          school: {
            select: {
              id: true,
              name: true,
              logo: true,
            },
          },
        },
      });

      if (!log) {
        return NextResponse.json(
          { error: 'Log not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        data: log,
        error: null,
      });
    }

    // Kullanıcıya göre log'lar
    if (userId && type === 'by-user') {
      const logs = await db.userLog.findMany({
        where: { name: { contains: userId } }, // name alanında kullanıcı adı aranabilir
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
      });

      const total = await db.userLog.count({
        where: { name: { contains: userId } },
      });

      return NextResponse.json({
        data: {
          logs,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        },
        error: null,
      });
    }

    // Son aktiviteler (recent)
    if (type === 'recent' && schoolId) {
      const recentLogs = await db.userLog.findMany({
        where: { schoolId },
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: {
          id: true,
          name: true,
          activity: true,
          time: true,
          createdAt: true,
          ipAddress: true,
          device: true,
        },
      });

      return NextResponse.json({
        data: recentLogs,
        error: null,
      });
    }

    // İstatistikler
    if (type === 'stats' && schoolId) {
      const now = new Date();
      const today = new Date(now.setHours(0, 0, 0, 0));
      const weekAgo = new Date(now.setDate(now.getDate() - 7));
      const monthAgo = new Date(now.setMonth(now.getMonth() - 1));

      const [todayCount, weekCount, monthCount, totalCount, uniqueUsers] = await Promise.all([
        db.userLog.count({
          where: {
            schoolId,
            createdAt: { gte: today },
          },
        }),
        db.userLog.count({
          where: {
            schoolId,
            createdAt: { gte: weekAgo },
          },
        }),
        db.userLog.count({
          where: {
            schoolId,
            createdAt: { gte: monthAgo },
          },
        }),
        db.userLog.count({
          where: { schoolId },
        }),
        db.userLog.groupBy({
          by: ['name'],
          where: { schoolId },
          _count: true,
        }),
      ]);

      // Aktivite tipine göre dağılım
      const activityTypes = await db.userLog.groupBy({
        by: ['activity'],
        where: { schoolId },
        _count: true,
        orderBy: {
          _count: {
            activity: 'desc',
          },
        },
        take: 10,
      });

      return NextResponse.json({
        data: {
          counts: {
            today: todayCount,
            thisWeek: weekCount,
            thisMonth: monthCount,
            total: totalCount,
          },
          uniqueUsers: uniqueUsers.length,
          topActivities: activityTypes.map(a => ({
            activity: a.activity,
            count: a._count,
          })),
        },
        error: null,
      });
    }

    // School'a göre log'ları getir (sayfalı)
    if (schoolId) {
      const [logs, total] = await Promise.all([
        db.userLog.findMany({
          where: { schoolId },
          orderBy: { createdAt: 'desc' },
          take: limit,
          skip,
          select: {
            id: true,
            name: true,
            activity: true,
            time: true,
            ipAddress: true,
            device: true,
            createdAt: true,
          },
        }),
        db.userLog.count({ where: { schoolId } }),
      ]);

      return NextResponse.json({
        data: {
          logs,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        },
        error: null,
      });
    }

    // Tüm log'lar (filtresiz - sayfalı)
    const [logs, total] = await Promise.all([
      db.userLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
        include: {
          school: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
      db.userLog.count(),
    ]);

    return NextResponse.json({
      data: {
        logs,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      error: null,
    });
  } catch (error) {
    console.error('GET user logs error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Failed to fetch user logs',
      },
      { status: 500 }
    );
  }
}

// ==================== POST İŞLEMLERİ (Yeni Log Oluştur) ====================
export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as UserLogCreateProps;

    // Gerekli alanları kontrol et
    if (!data.name || !data.activity || !data.schoolId) {
      return NextResponse.json(
        {
          data: null,
          error: 'Missing required fields: name, activity, schoolId',
        },
        { status: 400 }
      );
    }

    // Eğer time yoksa şu anki zamanı ekle
    if (!data.time) {
      data.time = new Date().toLocaleString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    }

    // Yeni log oluştur
    const newLog = await db.userLog.create({
      data,
      include: {
        school: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    console.log(`Log created successfully: ${newLog.name} - ${newLog.activity} (${newLog.id})`);

    return NextResponse.json(
      {
        data: newLog,
        error: null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST user log error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

// ==================== DELETE İŞLEMLERİ ====================
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const logId = searchParams.get('id');
    const schoolId = searchParams.get('schoolId');
    const olderThan = searchParams.get('olderThan'); // days

    // Belirli bir log'u sil
    if (logId) {
      const log = await db.userLog.findUnique({
        where: { id: logId },
      });

      if (!log) {
        return NextResponse.json(
          { error: 'Log not found' },
          { status: 404 }
        );
      }

      await db.userLog.delete({
        where: { id: logId },
      });

      return NextResponse.json({
        data: { message: 'Log deleted successfully' },
        error: null,
      });
    }

    // Belirli bir tarihten eski log'ları sil
    if (schoolId && olderThan) {
      const daysAgo = parseInt(olderThan);
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);

      const deleted = await db.userLog.deleteMany({
        where: {
          schoolId,
          createdAt: { lt: date },
        },
      });

      return NextResponse.json({
        data: {
          message: `${deleted.count} logs deleted successfully`,
          count: deleted.count,
        },
        error: null,
      });
    }

    // School'un tüm log'larını sil
    if (schoolId) {
      await db.userLog.deleteMany({
        where: { schoolId },
      });

      return NextResponse.json({
        data: { message: 'All logs deleted successfully' },
        error: null,
      });
    }

    return NextResponse.json(
      { error: 'Log ID, School ID, or olderThan parameter is required' },
      { status: 400 }
    );
  } catch (error) {
    console.error('DELETE user log error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Failed to delete logs',
      },
      { status: 500 }
    );
  }
}

// ==================== BATCH DELETE (Toplu Silme) ====================
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'clear-all' && searchParams.get('schoolId')) {
      const schoolId = searchParams.get('schoolId') as string;
      
      await db.userLog.deleteMany({
        where: { schoolId },
      });

      return NextResponse.json({
        data: { message: 'All logs cleared successfully' },
        error: null,
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('PATCH user log error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}