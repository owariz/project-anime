'use client'

import AdminMenu from '@/components/AdminMenu';
import Link from 'next/link';
import { useState } from 'react'

export default function Anime() {
  const animeList = [
    { id: 1, title: "Naruto", releaseDate: "2002-10-03", status: "Completed" },
    { id: 2, title: "Attack on Titan", releaseDate: "2013-04-07", status: "Ongoing" },
    { id: 3, title: "My Hero Academia", releaseDate: "2016-04-03", status: "Ongoing" },
    { id: 4, title: "One Piece", releaseDate: "1999-10-20", status: "Ongoing" },
    // เพิ่มอนิเมะอื่น ๆ ตามต้องการ
  ];

  return (
    <>
      <AdminMenu pageTitle={'Anime'} />
      <hr className='mt-2 mb-6 border border-[#424549]' />
      <Link href={'/admin/anime/add'} className="font-medium px-10 py-1.5 rounded-lg bg-[#36393e] border-2 border-[#424549] text-white hover:bg-[#424549] hover:text-white transition duration-300 ease-out">เพิ่มเรื่องใหม่</Link>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {animeList.map(anime => (
          <div key={anime.id} className="bg-[#36393e] rounded-md p-4 hover:bg-[#424549] transition">
            <h5 className="text-lg font-semibold">{anime.title}</h5>
            <p className="text-gray-300">Release Date: {anime.releaseDate}</p>
            <p className="text-gray-300">Status: {anime.status}</p>
            <div className="mt-2">
              <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition">Edit</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition ml-2">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
