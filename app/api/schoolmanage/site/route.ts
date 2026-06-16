import { NextRequest, NextResponse } from 'next/server';
import db from "@/app/lib/db";
import { Resend } from 'resend';


import { generateContactFormEmail } from '../email-templates/contactEmail';


import { convertDateToIso } from '../exams/convertDateToIso';



import { generateSlug } from '../generateSlug';


import { getFormattedDate } from '../getFormatedDate';


import { SectionType } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

const resend = new Resend(process.env.RESEND_API_KEY);

// ==================== TİP TANIMLAMALARI ====================
interface ContactSectionSettings {
  title?: string;
  description?: string;
  locationInfo?: {
    title?: string;
    address?: string;
    note?: string;
  };
  emailInfo?: {
    title?: string;
    email?: string;
    note?: string;
  };
  phoneInfo?: {
    title?: string;
    phone?: string;
    note?: string;
  };
  hoursInfo?: {
    title?: string;
    hours?: string;
    note?: string;
  };
  formSettings?: {
    nameLabel?: string;
    namePlaceholder?: string;
    phoneLabel?: string;
    phonePlaceholder?: string;
    emailLabel?: string;
    emailPlaceholder?: string;
    subjectLabel?: string;
    subjectPlaceholder?: string;
    messageLabel?: string;
    messagePlaceholder?: string;
    buttonText?: string;
    buttonColor?: string;
  };
}

interface ContactFormMailData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  schoolName: string;
}

interface ActivityCreateDTO {
  activity: string;
  description: string;
  time: string;
  schoolId: string;
  type?: string;
}

interface EventCreateDTO {
  title: string;
  description: string;
  image: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  schoolId: string;
}

interface GalleryCategoryCreateDTO {
  name: string;
  order: number;
  schoolId: string;
}

interface GalleryImageCreateDTO {
  title: string;
  description?: string;
  image: string;
  date?: string;
  categoryId?: string;
  schoolId: string;
}

interface NewsCreateDTO {
  title: string;
  content: string;
  image: string;
  schoolId: string;
  slug?: string;
}

interface WebsiteContactCreateDTO {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  schoolId: string;
}

interface SiteCreateProps {
  schoolId: string;
  siteEnabled: boolean;
  sections: Array<{
    type: SectionType;
    title: string;
    subtitle?: string;
    order: number;
    settings?: any;
  }>;
}

// ==================== YARDIMCI FONKSİYONLAR ====================
function parseSettings(settings: JsonValue | null | undefined): ContactSectionSettings {
  if (settings === null) {
    return {};
  }

  if (
    typeof settings === "object" &&
    settings !== null &&
    !Array.isArray(settings)
  ) {
    return settings as unknown as ContactSectionSettings;
  }

  return {};
}

// ==================== GET İŞLEMLERİ ====================
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const schoolId = searchParams.get('schoolId');
    const sectionId = searchParams.get('sectionId');
    const type = searchParams.get('type'); 
    const sectionType = searchParams.get('sectionType') as SectionType | null;

    if (!schoolId) {
      return NextResponse.json(
        { error: 'School ID is required' },
        { status: 400 }
      );
    }

    // Tek bir section getir (ID ile)
    if (sectionId) {
      const section = await db.section.findUnique({
        where: { id: sectionId },
      });

      if (!section) {
        return NextResponse.json(
          { error: 'Section not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        data: section,
        error: null,
      });
    }

    // Section type'a göre getir
    if (sectionType) {
      const section = await db.section.findFirst({
        where: {
          schoolId,
          type: sectionType,
        },
      });

      return NextResponse.json({
        data: section,
        error: null,
      });
    }

    // Tüm section'ları getir
    if (type === 'sections') {
      const sections = await db.section.findMany({
        where: { schoolId },
        orderBy: { order: 'asc' },
      });

      return NextResponse.json({
        data: sections,
        error: null,
      });
    }

    // Recent activities getir
    if (type === 'activities') {
      const activities = await db.recentActivity.findMany({
        where: {
          schoolId,
          type: "site",
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          activity: true,
          description: true,
          time: true,
          createdAt: true,
        },
        take: 2,
      });

      return NextResponse.json({
        data: activities,
        error: null,
      });
    }

    // Notifications getir
    if (type === 'notifications') {
      const notifications = await db.recentActivity.findMany({
        where: {
          schoolId,
          read: false,
          type: "contact-form",
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return NextResponse.json({
        data: notifications,
        error: null,
      });
    }

    // News getir
    if (type === 'news') {
      const news = await db.newsItem.findMany({
        where: { schoolId },
        orderBy: { createdAt: "desc" },
        take: 6,
      });

      return NextResponse.json({
        data: news,
        error: null,
      });
    }

    // Events getir
    if (type === 'events') {
      const events = await db.event.findMany({
        where: { schoolId },
        orderBy: { createdAt: "desc" },
        take: 6,
      });

      return NextResponse.json({
        data: events,
        error: null,
      });
    }

    // Gallery categories getir
    if (type === 'gallery-categories') {
      const categories = await db.galleryCategory.findMany({
        where: {
          schoolId,
          active: true,
        },
        orderBy: { order: "desc" },
        select: {
          id: true,
          name: true,
        },
      });

      return NextResponse.json({
        data: categories,
        error: null,
      });
    }

    // Gallery images getir
    if (type === 'gallery-images') {
      const images = await db.galleryImage.findMany({
        where: {
          schoolId,
          active: true,
        },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json({
        data: images,
        error: null,
      });
    }

    // Contact messages getir
    if (type === 'messages') {
      const messages = await db.schoolContactMessage.findMany({
        where: { schoolId },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json({
        data: messages,
        error: null,
      });
    }

    return NextResponse.json(
      { error: 'Invalid type parameter' },
      { status: 400 }
    );
  } catch (error) {
    console.error('GET site error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

// ==================== POST İŞLEMLERİ ====================
export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action'); 
    const data = await request.json();

    // CREATE SITE
    if (action === 'create-site') {
      const siteData = data as SiteCreateProps;
      
      for (const section of siteData.sections) {
        await db.section.create({
          data: {
            schoolId: siteData.schoolId,
            type: section.type,
            title: section.title,
            subtitle: section.subtitle,
            order: section.order,
            settings: section.settings as any,
          },
        });
        
        await db.school.update({
          where: { id: siteData.schoolId },
          data: { sectionCount: { increment: 1 } },
        });
      }

      const school = await db.school.update({
        where: { id: siteData.schoolId },
        data: { siteEnabled: siteData.siteEnabled },
      });

      await db.recentActivity.createMany({
        data: [
          {
            activity: "School Site Created",
            description: "School Site was Created and Section editing was enabled",
            time: getFormattedDate(new Date()),
            schoolId: siteData.schoolId,
          },
          {
            activity: "10 Sections Initiated",
            description: "10 Sections with Dummy data were created",
            time: getFormattedDate(new Date()),
            schoolId: siteData.schoolId,
          },
        ],
      });

      return NextResponse.json({
        data: school,
        error: null,
      }, { status: 201 });
    }

    // CREATE ACTIVITY
    if (action === 'create-activity') {
      const activityData = data as ActivityCreateDTO;
      const activity = await db.recentActivity.create({
        data: activityData,
      });

      return NextResponse.json({
        data: activity,
        error: null,
      }, { status: 201 });
    }

    // CREATE NEWS
    if (action === 'create-news') {
      const newsData = data as NewsCreateDTO;
      newsData.slug = generateSlug(newsData.title);

      const news = await db.newsItem.create({
        data: newsData,
      });

      await db.recentActivity.create({
        data: {
          activity: "Added New News Item",
          description: "Admin created a news item",
          time: getFormattedDate(new Date()),
          schoolId: newsData.schoolId,
        },
      });

      return NextResponse.json({
        data: news,
        error: null,
      }, { status: 201 });
    }

    // CREATE EVENT
    if (action === 'create-event') {
      const eventData = data as EventCreateDTO;
      eventData.date = convertDateToIso(eventData.date);

      const event = await db.event.create({
        data: eventData,
      });

      await db.recentActivity.create({
        data: {
          activity: "Added New Event",
          description: "Admin created a new event",
          time: getFormattedDate(new Date()),
          schoolId: eventData.schoolId,
        },
      });

      return NextResponse.json({
        data: event,
        error: null,
      }, { status: 201 });
    }

    // CREATE GALLERY CATEGORY
    if (action === 'create-gallery-category') {
      const categoryData = data as GalleryCategoryCreateDTO;

      const category = await db.galleryCategory.create({
        data: categoryData,
      });

      await db.recentActivity.create({
        data: {
          activity: "Added New Gallery Category",
          description: "Admin created a Gallery Category",
          time: getFormattedDate(new Date()),
          schoolId: categoryData.schoolId,
        },
      });

      return NextResponse.json({
        data: category,
        error: null,
      }, { status: 201 });
    }

    // CREATE GALLERY IMAGE
    if (action === 'create-gallery-image') {
      const imageData = data as GalleryImageCreateDTO;

      const image = await db.galleryImage.create({
        data: imageData,
      });

      await db.recentActivity.create({
        data: {
          activity: "Added New Gallery Image",
          description: "Admin created a new Gallery Image",
          time: getFormattedDate(new Date()),
          schoolId: imageData.schoolId,
        },
      });

      return NextResponse.json({
        data: image,
        error: null,
      }, { status: 201 });
    }

    // CREATE CONTACT MESSAGE
    if (action === 'create-contact-message') {
      const messageData = data as WebsiteContactCreateDTO;

      const message = await db.schoolContactMessage.create({
        data: messageData,
      });

      // Send email notification
      const school = await db.school.findUnique({
        where: { id: message.schoolId },
      });

      const contactSection = await db.section.findFirst({
        where: {
          schoolId: message.schoolId,
          type: "CONTACT",
        },
      });

      const typedSettings = parseSettings(contactSection?.settings);
      const contactEmail = typedSettings.emailInfo?.email;
      const schoolEmail = school?.primaryEmail || contactEmail;

      if (schoolEmail) {
        const mailData: ContactFormMailData = {
          name: messageData.fullName,
          email: messageData.email,
          phone: messageData.phone,
          subject: messageData.subject,
          message: messageData.message,
          schoolName: school?.name ?? "",
        };

        await resend.emails.send({
          from: "Desishub <info@desishub.com>",
          to: schoolEmail,
          subject: "New Message from Website Contact Form",
          html: generateContactFormEmail(mailData),
        });
      }

      await db.recentActivity.create({
        data: {
          activity: "New Message from Website Contact Form",
          description: `A person named ${message.fullName} sent a message with subject - ${message.subject}`,
          type: "contact-form",
          time: getFormattedDate(new Date()),
          schoolId: messageData.schoolId,
        },
      });

      return NextResponse.json({
        data: message,
        error: null,
      }, { status: 201 });
    }

    return NextResponse.json(
      { error: 'Invalid action parameter' },
      { status: 400 }
    );
  } catch (error) {
    console.error('POST site error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

// ==================== PUT/PATCH İŞLEMLERİ (Güncelleme) ====================
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sectionId = searchParams.get('sectionId');
    const schoolId = searchParams.get('schoolId');
    const action = searchParams.get('action');

    // Update section
    if (sectionId) {
      const data = await request.json();
      
      const section = await db.section.update({
        where: { id: sectionId },
        data,
      });

      if (schoolId && data.isComplete !== undefined) {
        const school = await db.school.findUnique({
          where: { id: schoolId },
          select: { siteCompletion: true },
        });

        if (school) {
          const completion = data.isComplete
            ? school.siteCompletion + 10
            : school.siteCompletion - 10;

          await db.school.update({
            where: { id: schoolId },
            data: { siteCompletion: completion },
          });
        }
      }

      return NextResponse.json({
        data: section,
        error: null,
      });
    }

    return NextResponse.json(
      { error: 'Section ID is required' },
      { status: 400 }
    );
  } catch (error) {
    console.error('PATCH site error:', error);
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
    const categoryId = searchParams.get('categoryId');
    const imageId = searchParams.get('imageId');
    const action = searchParams.get('action');

    // Delete gallery category
    if (action === 'delete-category' && categoryId) {
      const category = await db.galleryCategory.findUnique({
        where: { id: categoryId },
        include: { images: true },
      });

      if (!category) {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 404 }
        );
      }

      if (category.images.length > 0) {
        // Hide the category and its images
        const updatedCat = await db.galleryCategory.update({
          where: { id: categoryId },
          data: { active: false },
        });

        await db.galleryImage.updateMany({
          where: { categoryId },
          data: { active: false },
        });

        await db.recentActivity.create({
          data: {
            activity: "Archived the Gallery Category",
            description: "Admin archived the Gallery Category",
            time: getFormattedDate(new Date()),
            schoolId: updatedCat.schoolId,
          },
        });

        return NextResponse.json({
          data: updatedCat,
          error: null,
        });
      } else {
        const deleted = await db.galleryCategory.delete({
          where: { id: categoryId },
        });

        await db.recentActivity.create({
          data: {
            activity: "Deleted the Gallery Category",
            description: "Admin deleted the Gallery Category",
            time: getFormattedDate(new Date()),
            schoolId: deleted.schoolId,
          },
        });

        return NextResponse.json({
          data: deleted,
          error: null,
        });
      }
    }

    // Delete gallery image
    if (action === 'delete-image' && imageId) {
      const image = await db.galleryImage.findUnique({
        where: { id: imageId },
      });

      if (!image) {
        return NextResponse.json(
          { error: 'Image not found' },
          { status: 404 }
        );
      }

      const deleted = await db.galleryImage.delete({
        where: { id: imageId },
      });

      await db.recentActivity.create({
        data: {
          activity: "Deleted the Gallery Image",
          description: "Admin deleted the Gallery Image",
          time: getFormattedDate(new Date()),
          schoolId: deleted.schoolId,
        },
      });

      return NextResponse.json({
        data: deleted,
        error: null,
      });
    }

    return NextResponse.json(
      { error: 'Invalid delete parameters' },
      { status: 400 }
    );
  } catch (error) {
    console.error('DELETE site error:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}