import Link from 'next/link';
import React from 'react'

interface AdminMenuProps {
    pageTitle: String
}

export default function AdminMenu({ pageTitle }: AdminMenuProps) {
    return (
        <>
            <header className="flex flex-row items-center justify-between">
                <h4 className="text-2xl font-semibold mb-3">{pageTitle}</h4>

                <div className="flex">
                    <Link 
                        href="/admin/account" 
                        className="bg-[#36393e] text-white px-4 py-2 border border-[#36393e] rounded-l-md hover:bg-[#424549] hover:text-red-400 transition"
                    >
                        Manage account
                    </Link>
                    <Link 
                        href="/admin/setting" 
                        className="bg-[#36393e] text-white px-4 py-2 border border-[#36393e] hover:bg-[#424549] hover:text-red-400 transition"
                    >
                        Setting
                    </Link>
                    <Link 
                        href="/admin/anime" 
                        className="bg-[#36393e] text-white px-4 py-2 border border-[#36393e] hover:bg-[#424549] hover:text-red-400 transition"
                    >
                        Manage Anime
                    </Link>
                    <Link 
                        href="/admin/report" 
                        className="bg-[#36393e] text-white px-4 py-2 border border-[#36393e] rounded-r-md hover:bg-[#424549] hover:text-red-400 transition"
                    >
                        View Report
                    </Link>
                </div>
            </header>
        </>
    );
}
