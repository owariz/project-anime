'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Episode {
    episodeNumber: number;
    title: string;
    video: string;
}

interface Anime {
    title: string;
    episodes: Episode[];
}

export default function EpisodeNumber({ params }: { params: { animeId: string, episodeNumber: string } }) {
    const animeId = params.animeId;
    const episodeNumber = parseInt(params.episodeNumber); // เปลี่ยนเป็นตัวเลข
    const router = useRouter();

    const [episode, setEpisode] = useState<Episode | null>(null);
    const [anime, setAnime] = useState<Anime | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEpisode = async () => {
            try {
                const res = await fetch(`/api/anime/${animeId}/${episodeNumber}`);
                const data = await res.json();

                if (!data.isError) {
                    setEpisode(data.data);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                setError('Error fetching episode details');
            } finally {
                setLoading(false);
            }
        };

        const fetchAnimeDetails = async () => {
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
            }
        };

        fetchEpisode();
        fetchAnimeDetails();
    }, [animeId, episodeNumber]);

    const handleNextEpisode = () => {
        if (anime && episodeNumber < anime.episodes.length) {
            router.push(`/anime/${animeId}/${episodeNumber + 1}`);
        }
    };

    const handlePreviousEpisode = () => {
        if (episodeNumber > 1) {
            router.push(`/anime/${animeId}/${episodeNumber - 1}`);
        }
    };

    const reportBrokenEpisode = async () => {
        try {
            const res = await fetch(`/api/anime/${animeId}/${episodeNumber}/report`);
            const data = await res.json();
  
            if (!data.isError) {
                alert(data.message); // แจ้งผู้ใช้ว่าการรายงานสำเร็จ
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('Error reporting episode');
        }
    };

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <>
            <div className="max-w-4xl mx-auto p-4">
                {episode && (
                    <>
                        <div className="text-center mb-6">
                            <h1 className="text-3xl font-bold mb-4">Episode {episode.episodeNumber}: {episode.title}</h1>
                        </div>

                        <div className="h-[485px] mb-6">
                            <iframe
                                className="w-full h-full rounded-lg shadow-lg"
                                src={episode.video}
                                title={episode.title}
                                allowFullScreen
                                width="100%"
                                height="480"
                            ></iframe>
                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={handlePreviousEpisode}
                                className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
                                disabled={episodeNumber <= 1} // ปิดปุ่มถ้าเป็นตอนแรก
                            >
                                Previous Episode
                            </button>

                            <button
                                onClick={reportBrokenEpisode}
                                className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
                            >
                                Report
                            </button>

                            <button
                                onClick={handleNextEpisode}
                                className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
                                disabled={anime === null || episodeNumber >= (anime.episodes?.length || 0)} // ปิดปุ่มถ้าไม่มีตอนถัดไป
                            >
                                Next Episode
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}