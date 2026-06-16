"use client";

import { useEffect, useState, use } from "react";
import CandidateDetails from "../page";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default function CandidateDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug ?? null;


console.log("Resolved params:", resolvedParams);
console.log("Slug:", slug);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    candidate: null,
    professions: [],
    skills: [],
    languages: [],
    experiences: [],
    education: [],
  });

  useEffect(() => {
    async function fetchCandidate() {
      setLoading(true);
      try {
        const url = slug
          ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/candidat/${slug}`
          : `${process.env.NEXT_PUBLIC_BASE_URL}/api/candidat`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch candidate");

        const result = await response.json();
        setData({
          candidate: result.candidate,
          professions: result.professions || [],
          skills: result.skills || [],
          languages: result.languages || [],
          experiences: result.experiences || [],
          education: result.education || [],
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCandidate();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (!data.candidate) return <div>Candidate not found</div>;

  return <CandidateDetails candidate={data.candidate} />;
}
