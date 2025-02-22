'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { useState } from 'react'

export default function Navbar() {
    const { data: session, status } = useSession()
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <nav className={`w-full top-0 left-0 z-10 h-[70px] flex justify-center bg-[#282b30]`}>
            <div className="container max-w-6xl mx-auto h-full flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Link href={'/'} className="flex space-x-2 items-center transition duration-500 ease-out hover:scale-110">
                        <h1 className={`font-eng font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-400`}>Lara Anime</h1>
                    </Link>
                </div>

                <div className="hidden md:flex items-center font-medium space-x-8 text-gray-400">
                    <Link href={'/users'} className="transition-colors duration-500 ease-out hover:text-gray-300">Users</Link>
                    <Link href={'/student'} className="transition-colors duration-500 ease-out hover:text-gray-300">Student</Link>

                    {status === 'unauthenticated' ? (
                        <button
                            onClick={() => signIn("discord")}
                            className="font-bold px-10 py-1.5 rounded-lg bg-[#7289da]/20 border-2 border-[#7289da] text-[#7289da] hover:bg-[#7289da] hover:text-white transition duration-300 ease-out"
                        >
                            Sign In
                        </button>
                    ) : (
                        <div className="relative">
                            <Menu as="div" className="relative inline-block text-left">
                                <MenuButton className="font-bold px-10 py-1.5 rounded-lg bg-[#7289da]/20 border-2 border-[#7289da] text-[#7289da] hover:bg-[#7289da] hover:text-white transition duration-300 ease-out">
                                    {session?.user?.name || "User"}
                                </MenuButton>

                                <Transition
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <MenuItems className="absolute right-0 z-20 mt-2 w-52 origin-top-right rounded-md bg-[#282b30] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="px-4 py-2">
                                            Signed in as
                                            <div className="font-medium truncate">{session?.user?.email}</div>
                                        </div>
                                        <hr />
                                        <div className="py-2 px-4">
                                            <MenuItem>
                                                {({ active }) => (
                                                    <Link
                                                        href="/profile"
                                                        className={`${
                                                            active ? 'bg-[#424549]' : ''
                                                        } rounded-md block px-4 py-2 mb-2 text-sm bg-[#36393e] transition-all duration-300 ease-out`}
                                                    >
                                                        Profile
                                                    </Link>
                                                )}
                                            </MenuItem>
                                            <MenuItem>
                                                {({ active }) => (
                                                    <button
                                                        onClick={() => signOut()}
                                                        className={`${
                                                            active ? 'bg-red-500 text-white' : ''
                                                        } border border-red-400 rounded-md bg-red-400/20 block w-full px-4 py-2 font-semibold text-left text-sm text-red-400 transition-all duration-300 ease-out`}
                                                    >
                                                        Sign Out
                                                    </button>
                                                )}
                                            </MenuItem>
                                        </div>
                                    </MenuItems>
                                </Transition>
                            </Menu>
                        </div>
                    )}
                </div>

                {/* Toggle Button for Mobile Menu */}
                <div className="block md:hidden relative">
                    <button onClick={toggleMenu} className="font-bold px-2 py-1.5 rounded-lg bg-[#7289da]/20 border-2 border-[#7289da] text-[#7289da] hover:bg-[#7289da] hover:text-white transition duration-300 ease-out">
                        {isOpen ? (
                            <i className="fal fa-times"></i> // แสดงไอคอน 'close' เมื่อเมนูเปิด
                        ) : (
                            <i className="fal fa-bars"></i> // แสดงไอคอน 'menu' เมื่อเมนูปิด
                        )}
                        <span className="ml-2">{isOpen ? 'Close Menu' : 'Open Menu'}</span>
                    </button>
                </div>

                {/* Mobile Menu with Animation */}
                <Transition
                    show={isOpen}
                    enter="transition ease-out duration-300"
                    enterFrom="transform opacity-0 -translate-y-4"
                    enterTo="transform opacity-100 translate-y-0"
                    leave="transition ease-in duration-300"
                    leaveFrom="transform opacity-100 translate-y-0"
                    leaveTo="transform opacity-0 -translate-y-4"
                >
                    <div className="z-10 absolute top-[70px] left-0 w-full bg-[#282b30] shadow-lg rounded-b-md">
                        <div className="flex flex-col p-4">
                            <Link href={'/users'} className="py-2 hover:text-blue-500">Users</Link>
                            <Link href={'/student'} className="py-2 hover:text-blue-500">Student</Link>
                            {status === 'unauthenticated' ? (
                                <button onClick={() => signIn("discord")} className="py-2 bg-blue-500 text-white rounded-lg text-center">Sign In</button>
                            ) : (
                                <button
                                    onClick={() => signOut()}
                                    className="border border-red-400 rounded-md bg-red-400/20 block w-full px-4 py-2 font-semibold text-left text-sm text-red-400 transition-all duration-300 ease-out"
                                >
                                    Sign Out
                                </button>
                            )}
                        </div>
                    </div>
                </Transition>
            </div>
        </nav>
    )
}
