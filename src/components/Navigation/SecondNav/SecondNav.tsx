'use client'

import { SimplifiedPage } from '@/lib/contentful/types'
import { joinSlugs } from '@/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function SecondNav({ pages }: { pages: SimplifiedPage[] }) {
	const pathname = usePathname()
	// Find the active main page to show its children in secondary nav
	const activeMainPage = pages.find((page) => {
		return pathname?.startsWith(`/${joinSlugs(page.slugPath)}`)
	})
	return (
		<>
			{/* Secondary Navigation - shows children of active main page */}
			{activeMainPage && activeMainPage.children.length > 0 && (
				<nav
					className="h-16 relative flex  justify-center items-center text-white z-40"
					style={{ backgroundColor: `var(--${activeMainPage?.slug})` }}
				>
					{activeMainPage.children.map((child: SimplifiedPage) => (
						<div key={child.id} className="relative group">
							<Link
								href={`/${joinSlugs(child.slugPath)}`}
								className={`px-4 py-2 text-sm font-medium
									    transition-all duration-200 ease-in
 inline-flex items-center ${
		pathname === `/${joinSlugs(child.slugPath)}`
			? 'bg-primary-active rounded-full'
			: `hover:bg-primary-active hover:rounded-full`
 }`}
							>
								{child.title.toUpperCase()}
								{child.children?.length > 0 && (
									<svg
										className="w-4 h-4 ml-1"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								)}
							</Link>

							{child.children?.length > 0 && (
								<div className="absolute left-0 hidden group-hover:block pt-2 z-40">
									<div className="bg-white rounded-md shadow-lg py-2 min-w-[200px]">
										{child.children.map((subChild: SimplifiedPage) => (
											<Link
												key={subChild.id}
												href={`/${joinSlugs(subChild.slugPath)}`}
												className="block px-4 py-2 text-sm transition-all duration-200 ease-in text-gray-700 hover:bg-primary-hover hover:text-gray-900"
												style={
													pathname === `/${subChild.slugPath.join('/')}`
														? {
																backgroundColor: `var(--${activeMainPage?.slug})`,
																color: 'white',
														  }
														: undefined
												}
											>
												{subChild.title}
											</Link>
										))}
									</div>
								</div>
							)}
						</div>
					))}
				</nav>
			)}
		</>
	)
}
