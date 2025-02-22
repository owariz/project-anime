'use client'

import { useState, useEffect } from 'react';

interface Episode {
  episodeNumber: number;
  title: string;
  video: string;
}

interface Anime {
  title: string;
  description: string;
  thumbnail: string;
  tag: string;
  episodes: Episode[];
}

export default function AnimePage({ params }: { params: { animeId: string } }) {
  const animeId = params.animeId;
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!animeId) return;

    const fetchAnime = async () => {
      try {
        const res = await fetch(`/api/anime/${animeId}`);
        const data = await res.json();

        if (!data.isError) {
          setAnime(data.data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Error fetching anime details');
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [animeId]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {anime && (
        <>
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">{anime.title}</h1>
            <img
              src={anime.thumbnail}
              alt={anime.title}
              className="w-48 h-64 mx-auto mb-4 rounded-md shadow-lg"
            />
            <p className="text-lg mb-4">{anime.description}</p>
            <span className="inline-block bg-blue-200 text-blue-800 px-3 py-1 rounded-full">
              {anime.tag}
            </span>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Episodes</h2>
            <ul className="space-y-4">
              {anime.episodes.map((episode) => (
                <li key={episode.episodeNumber} className="bg-[#282b30] p-4 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold">
                    Episode {episode.episodeNumber}: {episode.title}
                  </h3>
                  <a
                    href={`/anime/${animeId}/${episode.episodeNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Watch Episode
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
