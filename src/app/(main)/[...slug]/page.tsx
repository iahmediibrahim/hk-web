import { Breadcrumb, SectionResolver } from '@/components'
import { getPageBySlug } from '@/lib/contentful/client'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface PageParams {
	slug: string[]
}

export async function generateMetadata({
	params,
}: {
	params: PageParams
}): Promise<Metadata> {
	const { slug } = params
	const contentType = slug.length === 1 ? 'page' : 'subPage'
	const page = await getPageBySlug(slug, contentType)

	if (!page) {
		return {
			title: 'Not Found',
			description: 'The page you are looking for does not exist.',
		}
	}
	console.log('page', page?.fields?.sections[0]?.fields?.paragraph)
	return {
		title: page.fields.title || 'Holden Knight',
		description:
			(page?.fields?.sections[0]?.fields?.paragraph as string) ||
			'Holden Knight website',
	}
}

export default async function Page({ params }: { params: PageParams }) {
	const { slug } = params
	const contentType = slug.length === 1 ? 'page' : 'subPage'
	const page = await getPageBySlug(slug, contentType)

	if (!page) {
		notFound()
	}

	const colorVar = slug[0] === '' ? 'dark-grey' : slug[0]
	const hasBanner = page.fields.sections?.find(
		(section) => section.sys?.contentType?.sys?.id === 'heroBanner',
	)

	return (
		<main>
			{contentType === 'subPage' && (
				<Breadcrumb
					path={slug}
					backgroundColor={
						hasBanner ? `var(--${colorVar}-heroBanner)` : 'transparent'
					}
					textColor={hasBanner ? 'white' : 'var(--dark-grey)'}
				/>
			)}
			{page.fields.sections?.map((section) => (
				<SectionResolver
					key={section.sys.id}
					section={section}
					colorVar={colorVar}
				/>
			))}
		</main>
	)
}
