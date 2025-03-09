'use client'

import { SimplifiedPage } from '@/lib/contentful/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Logo } from '../Logo'
import { MobileNavItem } from './MobileNavItem'

export function Navigation({ pages }: { pages: SimplifiedPage[] }) {
	const [isOpen, setIsOpen] = useState(false)
	const pathname = usePathname()
	const activeMainPage = pages.find((page) => {
		return pathname?.startsWith(`/${page.slugPath.join('/')}`)
	})
	return (
		<>
			<section className="header fixed inset-x-0 top-0 flex flex-row justify-between py-2 px-2 items-center backdrop-blur-lg bg-white/80 shadow-sm z-50">
				<Link
					href={`/`}
					className="flex justify-center items-center w-12 h-12  bg-primary-hover  hover:bg-gray-200/60 rounded-xl"
				>
					<Logo color="black" />
				</Link>

				<div className="hidden lg:flex flex-col w-full">
					{/* Top Navigation */}
					<nav className="flex justify-center items-center space-x-4 py-4 ">
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
				{/* Mobile Toggle */}
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="lg:hidden flex justify-center items-center w-12 h-12  bg-primary-hover  hover:bg-gray-200/60 rounded-xl"
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
			</section>
			{/* Mobile Navigation */}
			<div
				className={`lg:hidden fixed inset-0 bg-black/50 z-50 ${
					isOpen ? 'block' : 'hidden'
				}`}
			>
				<div className="absolute top-0 left-0 w-64 h-full bg-white shadow-lg p-4 overflow-y-auto">
					<div className="flex justify-between items-center mb-4">
						<h3 className="text-lg font-semibold">Menu</h3>
						<button onClick={() => setIsOpen(false)} className="p-2 text-2xl">
							×
						</button>
					</div>
					<div className="space-y-2">
						{pages.map((page) => (
							<MobileNavItem
								key={page.id}
								page={page}
								pathname={pathname}
								onClose={() => setIsOpen(false)}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	)
}
