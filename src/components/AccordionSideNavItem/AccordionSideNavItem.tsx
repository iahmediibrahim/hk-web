// components/AccordionSideNavItem.tsx
'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function AccordionSideNavItem({
	title,
	links,
	toggleSideNav,
}: {
	title: string
	links: Array<{ name: string; path: string; withTarget?: boolean }>
	toggleSideNav: () => void
}) {
	const [isOpen, setIsOpen] = useState(false)
	const [height, setHeight] = useState(0)
	const contentRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (contentRef.current) {
			setHeight(contentRef.current.scrollHeight)
		}
	}, [])

	return (
		<div>
			<div
				className="hover:bg-gray-100 p-3 px-5 w-full"
				onClick={() => setIsOpen(!isOpen)}
			>
				<div className="flex items-center justify-between">
					<button className="block w-full text-start">{title}</button>
					<span
						className={`transition-transform duration-300 ${
							isOpen ? 'rotate-180' : ''
						}`}
					>
						▼
					</span>
				</div>
			</div>

			<div
				ref={contentRef}
				className="overflow-hidden transition-all duration-300"
				style={{ maxHeight: isOpen ? `${height}px` : 0 }}
			>
				{links.map((link) => (
					<Link
						href={link.path}
						target={link.withTarget ? '_blank' : '_self'}
						rel={link.withTarget ? 'noopener noreferrer' : ''}
						className="block w-full p-3 px-7 hover:bg-gray-100"
						onClick={toggleSideNav}
					>
						{link.name}
					</Link>
				))}
			</div>
		</div>
	)
}
