// import db from "@/app/lib/db";
// import client from "@/app/lib/elasticsearch";
// import { NextResponse } from "next/server";

// // POST handler for indexing products and variants to Elasticsearch
// export async function getStaticProps() {
//   try {
//     // Fetch products and their variants with images where order = 1 from the database using Prisma
//     const products = await db.product.findMany({
//       include: {
//         variants: {
//           include: {
//             images: true, // Get all images (we'll handle filtering later)
//           },
//         },
//       },
//     });

//     // Prepare the body for bulk indexing in Elasticsearch
//     const body = products.flatMap((product) =>
//       product.variants.flatMap((variant) => {
//         // Get the image with order = 1, or fallback to the first image if none with order = 1
//         const image =
//           variant.images.find((img) => img.order === 1) || variant.images[0];

//         return [
//           {
//             index: { _index: "products", _id: variant.id }, // Index by variant ID
//           },
//           {
//             name: `${product.name} · ${variant.variantName}`, // Combined name
//             link: `/product/${product.slug}?variant=${variant.slug}`, // Link to product variant
//             image: image ? image.url : "", // Use the image URL (fallback if no image is found)
//           },
//         ];
//       }),
//     );

//     // Execute the bulk request to Elasticsearch
//     const bulkResponse = await client.bulk({ refresh: true, body });

//     // Check for any errors in the bulk response
//     if (bulkResponse.errors) {
//       return NextResponse.json(
//         {
//           message: "Failed to index products and variants",
//         },
//         { status: 500 },
//       );
//     }

//     return NextResponse.json(
//       {
//         message: "Products indexed successfully",
//       },
//       { status: 200 },
//     );
//   } catch (error: any) {
//     // Handle any unexpected errors
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }
