import Link from "next/link"

export default function Footer() {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()

    return (
        <footer className='px-6 2xl:px-0 text-center py-6 text-gray-400 bg-[#282b30] backdrop:blur-lg'>
            <div className="block lg:flex container max-w-6xl mx-auto">
                <div className="me-auto">
                    <span>&copy; { currentYear } <Link href={'/'} className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500 font-semibold">Lara Anime</Link> | made with ❤️ by 
                        <span className="inline-flex">&nbsp;variz&nbsp;</span>
                    </span>
                    <span className="inline-flex">v1.0.0 | all rights reserved.</span>
                </div>

                <div className="ms-auto">
                    <Link href={'/doc/privacy-policy'} className="hover:underline">Privacy policy</Link> | 
                    <Link href={'/doc/term-of-service'} className="hover:underline">Term of service</Link>
                </div>
            </div>
        </footer>
    )
}