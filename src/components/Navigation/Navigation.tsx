'use client'

import { SimplifiedPage } from '@/lib/contentful/types'
import { faBars, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Logo } from '../Logo'
import { MobileMenu } from './MobileMenu'

export function Navigation({ pages }: { pages: SimplifiedPage[] }) {
	const [isOpen, setIsOpen] = useState(false)
	const pathname = usePathname()
	const activeMainPage = pages.find((page) => {
		return pathname?.startsWith(`/${page.slugPath.join('/')}`)
	})

	const HomeLink = (
		<div className="flex-1 flex justify-center">
			<Link
				href={`/`}
				className="flex justify-center items-center w-12 h-12 bg-primary-hover hover:bg-gray-200/60 rounded-xl"
			>
				<Logo color="black" />
			</Link>
		</div>
	)
	return (
		<>
			<section className="header fixed inset-x-0 top-0 flex justify-between items-center backdrop-blur-lg bg-white/80 shadow-sm z-50 py-2 px-2">
				<div className="hidden lg:block">{HomeLink}</div>
				{/* Mobile Toggle */}
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="lg:hidden flex justify-center items-center w-12 h-12 bg-primary-hover hover:bg-gray-200/60 rounded-xl"
				>
					<FontAwesomeIcon className="w-6 h-6" icon={faBars} />
				</button>

				<div className="hidden lg:flex">
					{/* Top Navigation */}
					<nav className="flex justify-start items-center space-x-4 py-4 pl-4">
						{pages.map((page) => (
							<Link
								key={page.id}
								href={`/${page.slugPath.join('/')}`}
								className="px-4 py-2 text-sm font-medium rounded-xl hover:bg-primary-hover"
								style={
									pathname.includes(page.slug)
										? {
												backgroundColor: `rgb(from var(--${activeMainPage?.slug}) r g b / 10%)`,
												color: `var(--${activeMainPage?.slug})`,
										  }
										: undefined
								}
							>
								{page.title.toUpperCase()}
							</Link>
						))}
					</nav>
				</div>

				<div className="lg:hidden">{HomeLink}</div>
				<div className="flex items-center gap-2">
					<Link
						href="/contact"
						className="flex justify-center items-center w-12 h-12 bg-primary-hover hover:bg-gray-200/60 rounded-xl"
					>
						<FontAwesomeIcon className="w-6 h-6" icon={faEnvelope} />
					</Link>
				</div>
			</section>
			{/* Mobile Navigation */}
			<MobileMenu
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				pages={pages}
				pathname={pathname}
			/>
		</>
	)
}
