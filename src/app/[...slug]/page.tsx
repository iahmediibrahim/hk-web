import { Breadcrumb, SectionResolver } from '@/components'
import { getPageBySlug } from '@/lib/contentful/client'
import { ContentfulPage } from '@/lib/contentful/types'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: { slug: string[] } }) {
	const { slug } = await params
	const contentType = slug.length === 1 ? 'page' : 'subPage'
	const page: ContentfulPage = await getPageBySlug(
		slug[slug.length - 1],
		contentType,
	)
	console.log('page:::', page)
	if (!page) {
		notFound()
	}
	console.log(slug[0])

	return (
		<main>
			{contentType === 'subPage' && (
				<Breadcrumb
					path={slug}
					bg={`var(--${slug[0]}-heroPanner)`}
					textColor="white"
				/>
			)}

			{contentType === 'page' && <Breadcrumb path={slug} />}
			{page.fields.sections?.map((section) => (
				<SectionResolver key={section.sys.id} section={section} />
			))}
		</main>
	)
}
