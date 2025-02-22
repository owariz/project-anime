'use client'

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Anime {
    id: number;
    animeId: string;
    title: string;
    description: string;
    thumbnail: string;
    tag: string;
    views: number;
}

export default function Page() {
    const [animes, setAnimes] = useState<Anime[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAnimes = async () => {
            try {
                const res = await fetch('/api/anime');
                const data = await res.json();

                if (!data.isError) {
                    setAnimes(data.data);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                setError('Error fetching anime data');
            } finally {
                setLoading(false);
            }
        };

        fetchAnimes();
    }, []);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Anime List</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {animes.map(anime => (
                  <>
                  <Link href={`/anime/${anime.animeId}`}>
                    <div key={anime.id} className="border rounded-lg p-4 shadow-md">
                          <img src={anime.thumbnail} alt={anime.title} className="w-full h-48 object-cover rounded-md mb-4" />
                          <h2 className="text-xl font-semibold mb-2">{anime.title}</h2>
                          <p className="text-gray-600">{anime.description}</p>
                          <p className="text-sm text-gray-500">Tags: {anime.tag}</p>
                          <p className="text-sm text-gray-500">Views: {anime.views}</p>
                      </div>
                  </Link>
                  </>
                ))}
            </div>
        </div>
    );
}
