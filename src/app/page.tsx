"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!url) return;
    setLoading(true);
    setSource("Chargement du code source...");

    try {
      // On appelle une "API" (qu'on va créer à l'étape suivante)
      const response = await fetch(`/api/fetch?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      setSource(data.content || "Impossible de récupérer le code.");
    } catch (error) {
      setSource("Erreur lors de la récupération.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--background)] p-8 font-sans text-[var(--foreground)]">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Clone View-Page-Source</h1>
        <p className="text-gray-400 mb-8">Entrez une URL pour voir son code HTML</p>

        <div className="flex gap-2 mb-8">
          <input
            type="text"
            placeholder="https://example.com"
            className="flex-1 p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#2a2a2a] text-white placeholder-gray-400"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-800 disabled:text-gray-400"
          >
            {loading ? "Analyse..." : "View Source"}
          </button>
        </div>

        <div className="bg-[#111] text-green-400 p-6 rounded-xl overflow-x-auto text-left shadow-2xl min-h-[400px] border border-gray-700">
          <pre className="whitespace-pre-wrap break-all text-sm">
            <code>{source || "// Le code source s'affichera ici..."}</code>
          </pre>
        </div>
      </div>
    </main>
  );
}
