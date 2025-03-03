import { Navigation, SecondNav } from '@/components'
import { getPageHierarchy } from '@/lib/contentful/client'
import '@/lib/fontawesome'
import './globals.css'

export default async function Renderer({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const pages = await getPageHierarchy()

	return (
		<>
			<header className="bg-white shadow-sm">
				<Navigation pages={pages} />
			</header>
			<main>
				<div>
					<div className="mb-16 md:mb-[84px]"></div>
					<SecondNav pages={pages} />
				</div>
				{children}
			</main>
		</>
	)
}
