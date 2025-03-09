import { SimplifiedPage } from '@/lib/contentful/types'
import Link from 'next/link'
import { useState } from 'react'

export function MobileNavItem({
	page,
	pathname,
	onClose,
}: {
	page: SimplifiedPage
	pathname: string
	onClose: () => void
}) {
	const [isOpen, setIsOpen] = useState(false)
	const isActive = pathname.includes(page.slug)

	return (
		<div className="space-y-1">
			<div className="flex items-center justify-between">
				<Link
					href={`/${page.slugPath.join('/')}`}
					onClick={onClose}
					className="block px-3 py-2 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-100"
					style={
						isActive
							? {
									backgroundColor: `rgb(from var(--${page.slugPath[0]}) r g b / 10%)`,
									color: `var(--${page.slugPath[0]})`,
							  }
							: undefined
					}
				>
					{page.title}
				</Link>
				{page.children.length > 0 && (
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="p-2 text-gray-500 hover:text-gray-700"
					>
						{isOpen ? '−' : '+'}
					</button>
				)}
			</div>
			{isOpen && (
				<div className="ml-4">
					{page.children.map((child: SimplifiedPage) => (
						<MobileNavItem
							key={child.id}
							page={child}
							pathname={pathname}
							onClose={onClose}
						/>
					))}
				</div>
			)}
		</div>
	)
}
