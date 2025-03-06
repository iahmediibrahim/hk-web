import Link from 'next/link'

export function Footer() {
	return (
		<div
			className="footer w-full p-5 flex flex-wrap items-center justify-center mt-8"
			style={{ zIndex: 1000 }}
		>
			<h3>&copy; {new Date().getFullYear()} Holden Knight Group.</h3>
			<Link
				href="/terms-of-use"
				className="block p-2 px-4 rounded-full hover:text-black hover:font-normal hover:bg-[#edecec]"
			>
				Terms of use
			</Link>

			<Link
				href="/privacy-policy"
				className="block p-2 px-4 rounded-full hover:text-black hover:font-normal hover:bg-[#edecec]"
			>
				Privacy policy
			</Link>
		</div>
	)
}
