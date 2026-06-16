"use client";

import { Suspense, useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { PlaylistsView } from "../../modules/playlists/views/playlists-view";


const LIMIT = 20;

export const dynamic = "force-dynamic";

const Page = async () => {
  // Placeholder: Veriyi çekme işlemi. TRPC yerine manuel veri çekme işlemi ekleyeceğiz.
  const fetchPlaylists = async () => {
    try {
      const response = await fetch(`/api/video/playlists?limit=${LIMIT}`);
      if (!response.ok) throw new Error("Failed to fetch playlists");
      const data = await response.json();
      return data; // Dönen veriyi işleyebiliriz (örneğin, PlaylistsView için kullanabiliriz)
    } catch (error) {
      console.error("Error fetching playlists:", error);
      return []; // Hata durumunda boş bir liste döndürürüz
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary fallback={<p>Error loading playlists</p>}>
        <PlaylistsView />
      </ErrorBoundary>
    </Suspense>
  );
};

export default Page;
