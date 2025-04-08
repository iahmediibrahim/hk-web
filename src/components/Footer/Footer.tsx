'use client'
import { SimplifiedPage } from '@/lib/contentful'
import {
	faFacebookF,
	faLinkedinIn,
	faWhatsapp,
	faXTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faArrowUp, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { AbardoLogo } from '../AbardoLogo'
import { Logo } from '../Logo'
import { PatrecLogo } from '../PatrecLogo'

export function Footer({ pages }: { pages: SimplifiedPage[] }) {
	return (
		<div
			className="container mx-auto footer w-full p-5 mt-20"
			style={{ zIndex: 1000 }}
		>
			{/* WhatsApp Floating Button */}
			<div className="fixed bottom-6 right-5 z-50">
				<a
					href="https://web.whatsapp.com/send?phone=00447930308386"
					target="_blank"
					rel="noopener noreferrer"
					className="h-16 w-16 bg-black rounded-full text-white flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors duration-300"
				>
					<FontAwesomeIcon icon={faWhatsapp} size="2xl" />
				</a>
			</div>

			<div className="flex flex-col lg:flex-row justify-between items-start gap-8">
				{/* Left Section - Logo and Social Media */}
				<div className="flex flex-col w-full lg:w-auto items-center lg:items-start">
					<Logo color="black" size={48} />
					<div className="flex space-x-4 mt-8">
						<a
							href="https://www.facebook.com/profile.php?id=61559533246846"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FontAwesomeIcon
								icon={faFacebookF}
								size="lg"
								className="w-6 h-6 text-gray-900 hover:text-gray-700"
							/>
						</a>

						<a
							href="https://x.com/HoldenKnight"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FontAwesomeIcon
								icon={faXTwitter}
								size="lg"
								className="w-6 h-6 text-gray-900 hover:text-gray-700"
							/>
						</a>
						<a
							href="https://www.linkedin.com/company/holden-knight-group/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FontAwesomeIcon
								icon={faLinkedinIn}
								size="lg"
								className="w-6 h-6 text-gray-900 hover:text-gray-700"
							/>
						</a>
					</div>
					<div className="flex flex-col justify-center mt-8">
						<Link
							href="/terms-of-use"
							className="block p-2 px-4 rounded-full hover:text-black hover:font-normal hover:bg-[#edecec] text-center lg:text-left"
						>
							Terms of use
						</Link>
						<Link
							href="/privacy-policy"
							className="block p-2 px-4 rounded-full hover:text-black hover:font-normal hover:bg-[#edecec] text-center lg:text-left"
						>
							Privacy policy
						</Link>
					</div>
				</div>

				{/* Middle Section - Page Links */}
				<div className="flex flex-col items-center w-full lg:w-auto">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
						{pages.map((page) => (
							<div
								key={page.slug}
								className="flex flex-col items-center lg:items-start"
							>
								<Link
									href={`/${page.slug}`}
									className="block p-2 px-4 text-xl rounded-full hover:text-black font-normal hover:bg-[#edecec] text-center lg:text-left"
								>
									{page.title}
								</Link>
								{page.children && page.children.length > 0 && (
									<div className="w-full text-center lg:text-left">
										{page.children.map((childPage) => (
											<Link
												key={childPage.slug}
												href={`/${childPage.slug}`}
												className="block p-2 px-4 rounded-full text-gray-600 hover:text-black hover:font-normal hover:bg-[#edecec]"
											>
												{childPage.title}
											</Link>
										))}
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				{/* Right Section - Partners */}
				<div className="flex flex-col items-center w-full lg:w-auto">
					<h4 className="font-semibold mb-4">Our Partners</h4>
					<div className="grid grid-cols-1">
						<div className="flex items-center gap-2 mb-2 px-3 py-2 w-[240px] bg-white border rounded-full shadow-sm hover:shadow-md transition-shadow duration-300">
							<AbardoLogo />
							<div className="flex flex-col justify-center">
								<span className="font-semibold text-gray-800">
									Abardo
									<FontAwesomeIcon
										icon={faArrowUp}
										className="ml-1 rotate-45"
									/>
								</span>
								<p className="text-[11px] text-gray-600">
									All in one event platform
								</p>
							</div>
						</div>
						<div className="flex items-center gap-2 mb-2 px-3 py-2 w-[240px] bg-white border rounded-full shadow-sm hover:shadow-md transition-shadow duration-300">
							<PatrecLogo />
							<div className="flex flex-col justify-center">
								<span className="font-semibold text-gray-800">
									Patrec
									<FontAwesomeIcon
										icon={faArrowUp}
										className="ml-1 rotate-45"
									/>
								</span>
								<p className="text-[11px] text-gray-600">
									Connecting Healthcare
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Section - Copyright and Legal Links */}
			<div className="relative mt-8">
				<button
					onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
					className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black rounded-full p-3 shadow-md hover:shadow-lg transition-shadow"
				>
					<FontAwesomeIcon icon={faChevronUp} color="white" className="w-6 " />
				</button>
				<hr className="border-gray-200 mb-8" />
				<div className="text-center">
					<h3 className="mb-2 text-sm sm:text-base">
						&copy; {new Date().getFullYear()} Holden Knight Group.
					</h3>
				</div>
			</div>
		</div>
	)
}
