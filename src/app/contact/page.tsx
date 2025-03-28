import { SectionResolver } from '@/components'
import { getPageBySlug } from '@/lib/contentful'
import { notFound } from 'next/navigation'

export default async function Contact() {
	const page = await getPageBySlug(['contact'], 'page')
	if (!page) {
		notFound()
	}
	return (
		<div className="container mx-auto px-4 py-12 max-w-7xl">
			{/* Sections */}
			{page?.fields.sections?.map((section) => (
				<SectionResolver
					key={section.sys.id}
					section={section}
					colorVar={'dark-grey'}
				/>
			))}
		</div>
	)
}
