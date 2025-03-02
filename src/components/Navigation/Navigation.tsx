'use client'

import { SimplifiedPage } from '@/lib/contentful/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
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
					className="flex justify-center items-center w-12 h-12  bg-primary-hover  hover:bg-gray-200/60 rounded-full"
				>
					<svg width="25" height="25" viewBox="0 0 39 40" data-v-beca8f2f="">
						<g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
							<g transform="translate(-224.000000, -30.000000)" fill="black">
								<g transform="translate(165.000000, 14.000000)">
									<g transform="translate(59.478261, 16.869565)">
										<path d="M17.6668627,20.7166587 L29.9857183,34.9143661 C26.8597953,37.0967409 23.0495553,38.3871453 18.9286979,38.3742049 C18.5047627,38.3725731 18.0850457,38.3522487 17.6668627,38.3232961 L17.6668627,38.3232961 L17.6668627,20.7166587 Z M11.3877704,21.8617632 L11.3877704,36.7921058 C5.42871,34.2051614 0.959462609,28.6667767 0.0128465217,21.8617632 L0.0128465217,21.8617632 L11.3877704,21.8617632 Z M34.5661169,7.9625361 C36.8794495,11.1431048 38.2291012,15.0369431 38.1602669,19.1921217 C38.2137621,23.4596596 36.803329,27.4457244 34.3864573,30.6671335 L34.3864573,30.6671335 L23.9263208,19.0753526 Z M19.4277948,0.00290792332 C23.637044,0.0792200972 27.544304,1.55906271 30.6897844,3.97938575 L30.6897844,3.97938575 L17.6668627,17.7395444 L17.6668627,0.0537187929 C18.2470653,0.0124948798 18.8334035,-0.00802120712 19.4277948,0.00290792332 Z M11.3877704,1.58473658 L11.3877704,16.5944592 L-1.22568622e-13,16.5944592 C0.90405,9.87822092 5.30657217,4.21769831 11.3877704,1.58473658 L11.3877704,1.58473658 Z"></path>
									</g>
								</g>
							</g>
						</g>
					</svg>
				</Link>

				<div className="hidden lg:flex flex-col w-full">
					{/* Top Navigation */}
					<nav className="flex justify-center items-center space-x-8 py-4 ">
						{pages.map((page) => (
							<Link
								key={page.id}
								href={`/${page.slugPath.join('/')}`}
								className="px-4 py-2 text-sm font-medium rounded-full hover:bg-primary-hover"
								style={
									pathname === `/${page.slugPath.join('/')}`
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
					className="lg:hidden flex justify-center items-center w-12 h-12  bg-primary-hover  hover:bg-gray-200/60 rounded-full"
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
