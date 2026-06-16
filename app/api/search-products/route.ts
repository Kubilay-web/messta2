import client from "@/app/lib/elasticsearch";
import { NextResponse } from "next/server";

// Define product type
interface Product {
  name: string;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("search");

  if (!q || typeof q !== "string") {
    return NextResponse.json(
      {
        message: "Invalid search query",
      },
      { status: 400 },
    );
  }

  try {
    // Query Elasticsearch with improved types
    const response = await client.search<{ _source: Product }>({
      index: "products",
      body: {
        query: {
          match: {
            // match is more efficient for typical searches
            name: q,
          },
        },
      },
    });

    // Extract the results
    const results = response.hits.hits.map((hit) => hit._source);

    // Return results as a JSON response
    return NextResponse.json(results);
  } catch (error: any) {
    // Log the error and return a response
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
