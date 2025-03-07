import Link from 'next/link'

export function Breadcrumb({
	path,
	backgroundColor = 'transparent',
	textColor = '#000',
}: {
	path: string[]
	backgroundColor?: string
	textColor?: string
}) {
	const breadcrumbs = path.reduce<Array<{ name: string; href: string }>>(
		(acc, slug, index) => {
			const href = '/' + path.slice(0, index + 1).join('/')
			return [...acc, { name: slugToName(slug), href }]
		},
		[{ name: 'Home', href: '/' }],
	)

	return (
		<div
			style={{
				backgroundColor,
				color: textColor,
			}}
			className="w-full"
		>
			<nav
				aria-label="Breadcrumb"
				className="container mx-auto px-4 pt-8 sm:pt-12 md:pt-16"
			>
				<ol className="flex flex-wrap gap-2 text-xs sm:text-sm md:text-base">
					{breadcrumbs.map((crumb, index) => (
						<li key={crumb.href} className="flex items-center">
							{index > 0 && <span className="mx-1 sm:mx-2">/</span>}
							<Link
								href={crumb.href}
								className={`hover:underline transition-colors duration-200 
									${
										index === breadcrumbs.length - 1
											? `${
													backgroundColor === 'transparent'
														? 'bg-primary-hover'
														: 'bg-primary-active'
											  } px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-xl`
											: ''
									}`}
							>
								{crumb.name.toUpperCase()}
							</Link>
						</li>
					))}
				</ol>
			</nav>
		</div>
	)
}

function slugToName(slug: string) {
	return slug
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')
}
