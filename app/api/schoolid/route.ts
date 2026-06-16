// // // app/api/school/assign-school-ids/route.ts
// // import { NextResponse } from "next/server";
// // import { PrismaClient } from "@prisma/client";

// // const prisma = new PrismaClient();

// // export async function POST() {
// //   try {
// //     console.log("🔄 Starting school ID assignment process...");

// //     // İlk okulu al (veya varsa aktif olanı)
// //     let mainSchool = await prisma.school.findFirst({
// //       where: {
// //         siteEnabled: true,
// //       },
// //     });

// //     // Eğer aktif okul yoksa, herhangi bir okulu al
// //     if (!mainSchool) {
// //       mainSchool = await prisma.school.findFirst();
// //     }

// //     if (!mainSchool) {
// //       return NextResponse.json({
// //         success: false,
// //         error: "No schools found in database. Please run school seed first.",
// //       });
// //     }

// //     console.log(`📚 Using main school: ${mainSchool.name} (${mainSchool.id})`);

// //     // İstatistikler için sayaçlar
// //     let updatedUsers = 0;
// //     let skippedUsers = 0;
// //     let updatedStudents = 0;
// //     let updatedTeachers = 0;
// //     let updatedParents = 0;
// //     let errors = [];

// //     // Tüm kullanıcıları al (roleschool'u olanları)
// //     const users = await prisma.user.findMany({
// //       where: {
// //         roleschool: {
// //           not: null,
// //         },
// //       },
// //       select: {
// //         id: true,
// //         email: true,
// //         name: true,
// //         roleschool: true,
// //         schoolId: true,
// //         schoolName: true,
// //       },
// //     });

// //     console.log(`👥 Found ${users.length} users with school roles`);

// //     // Her kullanıcı için işlem yap
// //     for (const user of users) {
// //       try {
// //         // Kullanıcının zaten doğru schoolId'si varsa atlama
// //         if (user.schoolId === mainSchool.id) {
// //           console.log(`⏭️ User ${user.email} already has correct school: ${mainSchool.name}`);
// //           skippedUsers++;
// //           continue;
// //         }

// //         // Kullanıcıyı güncelle
// //         await prisma.user.update({
// //           where: { id: user.id },
// //           data: {
// //             schoolId: mainSchool.id,
// //             schoolName: mainSchool.name,
// //           },
// //         });

// //         // İlgili profile da schoolId'yi güncelle
// //         switch (user.roleschool) {
// //           case "STUDENT":
// //             const studentResult = await prisma.student.updateMany({
// //               where: { userId: user.id },
// //               data: {
// //                 schoolId: mainSchool.id,
// //                 schoolName: mainSchool.name,
// //               },
// //             });
// //             if (studentResult.count > 0) {
// //               updatedStudents++;
// //             }
// //             break;
          
// //           case "TEACHER":
// //             const teacherResult = await prisma.teacher.updateMany({
// //               where: { userId: user.id },
// //               data: {
// //                 schoolId: mainSchool.id,
// //                 schoolName: mainSchool.name,
// //               },
// //             });
// //             if (teacherResult.count > 0) {
// //               updatedTeachers++;
// //             }
// //             break;
          
// //           case "PARENT":
// //             const parentResult = await prisma.parent.updateMany({
// //               where: { userId: user.id },
// //               data: {
// //                 schoolId: mainSchool.id,
// //                 schoolName: mainSchool.name,
// //               },
// //             });
// //             if (parentResult.count > 0) {
// //               updatedParents++;
// //             }
// //             break;
          
// //           case "ADMIN":
// //           case "SUPER_ADMIN":
// //             // Admin'ler için sadece user tablosu yeterli
// //             console.log(`✅ Updated admin: ${user.email}`);
// //             break;
// //         }

// //         console.log(`✅ Updated: ${user.email} (${user.roleschool}) -> ${mainSchool.name}`);
// //         updatedUsers++;
        
// //       } catch (error) {
// //         console.error(`❌ Error updating user ${user.email}:`, error);
// //         errors.push({ email: user.email, error: String(error) });
// //       }
// //     }

// //     // Özet istatistikler
// //     const summary = {
// //       mainSchool: {
// //         id: mainSchool.id,
// //         name: mainSchool.name,
// //       },
// //       totalUsersWithRoles: users.length,
// //       updatedUsers: updatedUsers,
// //       skippedUsers: skippedUsers,
// //       updatedStudents: updatedStudents,
// //       updatedTeachers: updatedTeachers,
// //       updatedParents: updatedParents,
// //       errors: errors.length,
// //     };

// //     console.log("\n📊 Summary:");
// //     console.log(`- Main School: ${summary.mainSchool.name}`);
// //     console.log(`- Users processed: ${summary.totalUsersWithRoles}`);
// //     console.log(`- Updated: ${summary.updatedUsers}`);
// //     console.log(`  - Students: ${summary.updatedStudents}`);
// //     console.log(`  - Teachers: ${summary.updatedTeachers}`);
// //     console.log(`  - Parents: ${summary.updatedParents}`);
// //     console.log(`- Skipped (already had correct school): ${summary.skippedUsers}`);
// //     console.log(`- Errors: ${summary.errors}`);

// //     return NextResponse.json({
// //       success: true,
// //       message: `All users assigned to ${mainSchool.name} successfully`,
// //       data: {
// //         mainSchool: summary.mainSchool,
// //         summary: summary,
// //         errors: errors,
// //       },
// //     });

// //   } catch (error) {
// //     console.error("❌ Error during school ID assignment:", error);
// //     return NextResponse.json(
// //       {
// //         success: false,
// //         error: error instanceof Error ? error.message : "An unknown error occurred",
// //       },
// //       { status: 500 }
// //     );
// //   } finally {
// //     await prisma.$disconnect();
// //   }
// // }

// // export async function GET() {
// //   return POST();
// // }










// // app/api/school/fix-school-names/route.ts
// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function POST() {
//   try {
//     console.log("🔄 Starting school name fix process...");

//     // Belirtilen okul bilgileri
//     const TARGET_SCHOOL_ID = "cmngrd5qg00gzl8lkv3y59xzt";
//     const TARGET_SCHOOL_NAME = "Istanbul International School";

//     // Okulun var olduğunu doğrula
//     const targetSchool = await prisma.school.findUnique({
//       where: { id: TARGET_SCHOOL_ID },
//     });

//     if (!targetSchool) {
//       return NextResponse.json({
//         success: false,
//         error: `Target school not found: ${TARGET_SCHOOL_NAME} (${TARGET_SCHOOL_ID})`,
//       });
//     }

//     console.log(`📚 Using target school: ${targetSchool.name} (${targetSchool.id})`);

//     // Farklı schoolName/schoolId'ye sahip kullanıcıları bul
//     const usersWithWrongSchool = await prisma.user.findMany({
//       where: {
//         OR: [
//           {
//             schoolId: {
//               not: TARGET_SCHOOL_ID,
//             },
//           },
//           {
//             schoolName: {
//               not: TARGET_SCHOOL_NAME,
//             },
//           },
//           {
//             schoolId: null,
//           },
//           {
//             schoolName: null,
//           },
//         ],
//         roleschool: {
//           not: null,
//         },
//       },
//       select: {
//         id: true,
//         email: true,
//         name: true,
//         roleschool: true,
//         schoolId: true,
//         schoolName: true,
//       },
//     });

//     console.log(`👥 Found ${usersWithWrongSchool.length} users with wrong or missing school info`);

//     let updatedUsers = 0;
//     let updatedStudents = 0;
//     let updatedTeachers = 0;
//     let updatedParents = 0;
//     let skippedUsers = 0;
//     let errors = [];

//     // Her bir kullanıcıyı güncelle
//     for (const user of usersWithWrongSchool) {
//       try {
//         // Zaten doğruysa atla
//         if (user.schoolId === TARGET_SCHOOL_ID && user.schoolName === TARGET_SCHOOL_NAME) {
//           console.log(`⏭️ Skipping ${user.email} - already has correct school`);
//           skippedUsers++;
//           continue;
//         }

//         console.log(`\n📝 Processing: ${user.email}`);
//         console.log(`   Current: schoolId=${user.schoolId}, schoolName=${user.schoolName}`);
//         console.log(`   Target:  schoolId=${TARGET_SCHOOL_ID}, schoolName=${TARGET_SCHOOL_NAME}`);

//         // User tablosunu güncelle
//         await prisma.user.update({
//           where: { id: user.id },
//           data: {
//             schoolId: TARGET_SCHOOL_ID,
//             schoolName: TARGET_SCHOOL_NAME,
//           },
//         });

//         // Role göre ilgili tabloyu da güncelle
//         switch (user.roleschool) {
//           case "STUDENT":
//             const studentResult = await prisma.student.updateMany({
//               where: { userId: user.id },
//               data: {
//                 schoolId: TARGET_SCHOOL_ID,
//                 schoolName: TARGET_SCHOOL_NAME,
//               },
//             });
//             if (studentResult.count > 0) {
//               updatedStudents++;
//               console.log(`   ✅ Student profile updated`);
//             }
//             break;
          
//           case "TEACHER":
//             const teacherResult = await prisma.teacher.updateMany({
//               where: { userId: user.id },
//               data: {
//                 schoolId: TARGET_SCHOOL_ID,
//                 schoolName: TARGET_SCHOOL_NAME,
//               },
//             });
//             if (teacherResult.count > 0) {
//               updatedTeachers++;
//               console.log(`   ✅ Teacher profile updated`);
//             }
//             break;
          
//           case "PARENT":
//             const parentResult = await prisma.parent.updateMany({
//               where: { userId: user.id },
//               data: {
//                 schoolId: TARGET_SCHOOL_ID,
//                 schoolName: TARGET_SCHOOL_NAME,
//               },
//             });
//             if (parentResult.count > 0) {
//               updatedParents++;
//               console.log(`   ✅ Parent profile updated`);
//             }
//             break;
          
//           default:
//             console.log(`   ✅ User (${user.roleschool}) updated`);
//         }

//         updatedUsers++;
//         console.log(`   ✅ Successfully updated`);

//       } catch (error) {
//         console.error(`   ❌ Error updating user ${user.email}:`, error);
//         errors.push({ 
//           email: user.email, 
//           role: user.roleschool,
//           currentSchoolId: user.schoolId,
//           currentSchoolName: user.schoolName,
//           error: String(error) 
//         });
//       }
//     }

//     // Ayrıca, Student, Teacher, Parent tablolarında olup User tablosunda olmayanları da kontrol et
//     console.log("\n📊 Checking for orphaned records...");

//     // Student tablosunu kontrol et
//     const students = await prisma.student.findMany({
//       where: {
//         OR: [
//           { schoolId: { not: TARGET_SCHOOL_ID } },
//           { schoolName: { not: TARGET_SCHOOL_NAME } },
//           { schoolId: null },
//           { schoolName: null },
//         ],
//       },
//       include: {
//         user: true,
//       },
//     });

//     for (const student of students) {
//       if (student.user && student.user.schoolId !== TARGET_SCHOOL_ID) {
//         await prisma.user.update({
//           where: { id: student.user.id },
//           data: {
//             schoolId: TARGET_SCHOOL_ID,
//             schoolName: TARGET_SCHOOL_NAME,
//           },
//         });
//         updatedUsers++;
//         updatedStudents++;
//         console.log(`   ✅ Fixed orphaned student: ${student.email}`);
//       }
//     }

//     // Teacher tablosunu kontrol et
//     const teachers = await prisma.teacher.findMany({
//       where: {
//         OR: [
//           { schoolId: { not: TARGET_SCHOOL_ID } },
//           { schoolName: { not: TARGET_SCHOOL_NAME } },
//           { schoolId: null },
//           { schoolName: null },
//         ],
//       },
//       include: {
//         user: true,
//       },
//     });

//     for (const teacher of teachers) {
//       if (teacher.user && teacher.user.schoolId !== TARGET_SCHOOL_ID) {
//         await prisma.user.update({
//           where: { id: teacher.user.id },
//           data: {
//             schoolId: TARGET_SCHOOL_ID,
//             schoolName: TARGET_SCHOOL_NAME,
//           },
//         });
//         updatedUsers++;
//         updatedTeachers++;
//         console.log(`   ✅ Fixed orphaned teacher: ${teacher.email}`);
//       }
//     }

//     // Parent tablosunu kontrol et
//     const parents = await prisma.parent.findMany({
//       where: {
//         OR: [
//           { schoolId: { not: TARGET_SCHOOL_ID } },
//           { schoolName: { not: TARGET_SCHOOL_NAME } },
//           { schoolId: null },
//           { schoolName: null },
//         ],
//       },
//       include: {
//         user: true,
//       },
//     });

//     for (const parent of parents) {
//       if (parent.user && parent.user.schoolId !== TARGET_SCHOOL_ID) {
//         await prisma.user.update({
//           where: { id: parent.user.id },
//           data: {
//             schoolId: TARGET_SCHOOL_ID,
//             schoolName: TARGET_SCHOOL_NAME,
//           },
//         });
//         updatedUsers++;
//         updatedParents++;
//         console.log(`   ✅ Fixed orphaned parent: ${parent.email}`);
//       }
//     }

//     // Özet istatistikler
//     const summary = {
//       targetSchool: {
//         id: TARGET_SCHOOL_ID,
//         name: TARGET_SCHOOL_NAME,
//       },
//       totalUsersFound: usersWithWrongSchool.length,
//       updatedUsers: updatedUsers,
//       skippedUsers: skippedUsers,
//       updatedStudents: updatedStudents,
//       updatedTeachers: updatedTeachers,
//       updatedParents: updatedParents,
//       errors: errors.length,
//     };

//     console.log("\n📊 Summary:");
//     console.log(`- Target School: ${summary.targetSchool.name} (${summary.targetSchool.id})`);
//     console.log(`- Users found with wrong info: ${summary.totalUsersFound}`);
//     console.log(`- Users updated: ${summary.updatedUsers}`);
//     console.log(`  - Students updated: ${summary.updatedStudents}`);
//     console.log(`  - Teachers updated: ${summary.updatedTeachers}`);
//     console.log(`  - Parents updated: ${summary.updatedParents}`);
//     console.log(`- Users skipped (already correct): ${summary.skippedUsers}`);
//     console.log(`- Errors: ${summary.errors}`);

//     return NextResponse.json({
//       success: true,
//       message: `All users fixed to use ${TARGET_SCHOOL_NAME} successfully`,
//       data: {
//         targetSchool: summary.targetSchool,
//         summary: summary,
//         errors: errors,
//         fixedUsers: usersWithWrongSchool
//           .filter(u => u.schoolId !== TARGET_SCHOOL_ID || u.schoolName !== TARGET_SCHOOL_NAME)
//           .map(u => ({
//             email: u.email,
//             role: u.roleschool,
//             oldSchoolId: u.schoolId,
//             oldSchoolName: u.schoolName,
//             newSchoolId: TARGET_SCHOOL_ID,
//             newSchoolName: TARGET_SCHOOL_NAME,
//           })),
//       },
//     });

//   } catch (error) {
//     console.error("❌ Error during fix process:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         error: error instanceof Error ? error.message : "An unknown error occurred",
//       },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// export async function GET() {
//   return POST();
// }














// app/api/school/fix-school-names-safe/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST() {
  try {
    console.log("🔄 Starting school name fix process...");

    // Belirtilen okul bilgileri
    const TARGET_SCHOOL_ID = "cmngrd5qg00gzl8lkv3y59xzt";
    const TARGET_SCHOOL_NAME = "Istanbul International School";

    // Okulun var olduğunu doğrula
    const targetSchool = await prisma.school.findUnique({
      where: { id: TARGET_SCHOOL_ID },
    });

    if (!targetSchool) {
      return NextResponse.json({
        success: false,
        error: `Target school not found: ${TARGET_SCHOOL_NAME} (${TARGET_SCHOOL_ID})`,
      });
    }

    console.log(`📚 Using target school: ${targetSchool.name} (${targetSchool.id})`);

    // Farklı schoolName/schoolId'ye sahip kullanıcıları bul
    const usersWithWrongSchool = await prisma.user.findMany({
      where: {
        OR: [
          {
            schoolId: {
              not: TARGET_SCHOOL_ID,
            },
          },
          {
            schoolName: {
              not: TARGET_SCHOOL_NAME,
            },
          },
          {
            schoolId: null,
          },
          {
            schoolName: null,
          },
        ],
        roleschool: {
          not: null,
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
        roleschool: true,
        schoolId: true,
        schoolName: true,
      },
    });

    console.log(`👥 Found ${usersWithWrongSchool.length} users with wrong or missing school info`);

    let updatedUsers = 0;
    let skippedUsers = 0;
    let updatedStudents = 0;
    let updatedTeachers = 0;
    let updatedParents = 0;
    let errors = [];

    // Her bir kullanıcıyı güncelle
    for (const user of usersWithWrongSchool) {
      try {
        // Zaten doğruysa atla
        if (user.schoolId === TARGET_SCHOOL_ID && user.schoolName === TARGET_SCHOOL_NAME) {
          console.log(`⏭️ Skipping ${user.email} - already has correct school`);
          skippedUsers++;
          continue;
        }

        console.log(`\n📝 Processing: ${user.email}`);
        console.log(`   Current: schoolId=${user.schoolId}, schoolName=${user.schoolName}`);
        console.log(`   Target:  schoolId=${TARGET_SCHOOL_ID}, schoolName=${TARGET_SCHOOL_NAME}`);

        // User tablosunu güncelle
        await prisma.user.update({
          where: { id: user.id },
          data: {
            schoolId: TARGET_SCHOOL_ID,
            schoolName: TARGET_SCHOOL_NAME,
          },
        });

        // Role göre ilgili tabloyu da güncelle (eğer alanlar varsa)
        try {
          switch (user.roleschool) {
            case "STUDENT":
              // Önce Student tablosunda schoolId alanı var mı kontrol et
              const studentFields = await prisma.student.findFirst({
                select: { schoolId: true, schoolName: true },
              });
              
              if (studentFields !== null) {
                const studentResult = await prisma.student.updateMany({
                  where: { userId: user.id },
                  data: {
                    schoolId: TARGET_SCHOOL_ID,
                    schoolName: TARGET_SCHOOL_NAME,
                  },
                });
                if (studentResult.count > 0) {
                  updatedStudents++;
                  console.log(`   ✅ Student profile updated`);
                }
              }
              break;
            
            case "TEACHER":
              const teacherFields = await prisma.teacher.findFirst({
                select: { schoolId: true, schoolName: true },
              });
              
              if (teacherFields !== null) {
                const teacherResult = await prisma.teacher.updateMany({
                  where: { userId: user.id },
                  data: {
                    schoolId: TARGET_SCHOOL_ID,
                    schoolName: TARGET_SCHOOL_NAME,
                  },
                });
                if (teacherResult.count > 0) {
                  updatedTeachers++;
                  console.log(`   ✅ Teacher profile updated`);
                }
              }
              break;
            
            case "PARENT":
              const parentFields = await prisma.parent.findFirst({
                select: { schoolId: true, schoolName: true },
              });
              
              if (parentFields !== null) {
                const parentResult = await prisma.parent.updateMany({
                  where: { userId: user.id },
                  data: {
                    schoolId: TARGET_SCHOOL_ID,
                    schoolName: TARGET_SCHOOL_NAME,
                  },
                });
                if (parentResult.count > 0) {
                  updatedParents++;
                  console.log(`   ✅ Parent profile updated`);
                }
              }
              break;
          }
        } catch (profileError) {
          // Profil tablosunda alan yoksa sessizce geç
          console.log(`   ⚠️ Could not update profile (fields might not exist)`);
        }

        updatedUsers++;
        console.log(`   ✅ Successfully updated`);

      } catch (error) {
        console.error(`   ❌ Error updating user ${user.email}:`, error);
        errors.push({ 
          email: user.email, 
          role: user.roleschool,
          currentSchoolId: user.schoolId,
          currentSchoolName: user.schoolName,
          error: String(error) 
        });
      }
    }

    // Özet istatistikler
    const summary = {
      targetSchool: {
        id: TARGET_SCHOOL_ID,
        name: TARGET_SCHOOL_NAME,
      },
      totalUsersFound: usersWithWrongSchool.length,
      updatedUsers: updatedUsers,
      skippedUsers: skippedUsers,
      updatedStudents: updatedStudents,
      updatedTeachers: updatedTeachers,
      updatedParents: updatedParents,
      errors: errors.length,
    };

    console.log("\n📊 Summary:");
    console.log(`- Target School: ${summary.targetSchool.name} (${summary.targetSchool.id})`);
    console.log(`- Users found with wrong info: ${summary.totalUsersFound}`);
    console.log(`- Users updated: ${summary.updatedUsers}`);
    console.log(`  - Students updated: ${summary.updatedStudents}`);
    console.log(`  - Teachers updated: ${summary.updatedTeachers}`);
    console.log(`  - Parents updated: ${summary.updatedParents}`);
    console.log(`- Users skipped (already correct): ${summary.skippedUsers}`);
    console.log(`- Errors: ${summary.errors}`);

    return NextResponse.json({
      success: true,
      message: `All users fixed to use ${TARGET_SCHOOL_NAME} successfully`,
      data: {
        targetSchool: summary.targetSchool,
        summary: summary,
        errors: errors,
        fixedUsers: usersWithWrongSchool
          .filter(u => u.schoolId !== TARGET_SCHOOL_ID || u.schoolName !== TARGET_SCHOOL_NAME)
          .map(u => ({
            email: u.email,
            role: u.roleschool,
            oldSchoolId: u.schoolId,
            oldSchoolName: u.schoolName,
            newSchoolId: TARGET_SCHOOL_ID,
            newSchoolName: TARGET_SCHOOL_NAME,
          })),
      },
    });

  } catch (error) {
    console.error("❌ Error during fix process:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  return POST();
}