import Link from 'next/link'

export function Breadcrumb({
	path,
	bg = 'transparent',
	textColor = '#000',
}: {
	path: string[]
	bg?: string
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
				backgroundColor: bg,
				color: textColor,
			}}
		>
			<nav aria-label="Breadcrumb" className="container pt-16 mx-auto px-4 ">
				<ol className="flex gap-2 ">
					{breadcrumbs.map((crumb, index) => (
						<li key={crumb.href} className="flex items-center">
							{index > 0 && <span className="mx-2">/</span>}
							<Link
								href={crumb.href}
								className={`text-sm hover:underline ${
									index === breadcrumbs.length - 1
										? `${
												bg === 'transparent'
													? 'bg-primary-hover'
													: 'bg-primary-active'
										  }  px-2 py-1 rounded`
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
