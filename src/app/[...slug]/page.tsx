import { Breadcrumb, SectionResolver } from '@/components'
import { getPageBySlug } from '@/lib/contentful/client'
import { notFound } from 'next/navigation'

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string[] }>
}) {
	const { slug } = await params
	const contentType = slug.length === 1 ? 'page' : 'subPage'
	const page = await getPageBySlug(slug[slug.length - 1], contentType)
	if (!page) {
		notFound()
	}

	const colorVar = slug[0] === '' ? 'dark-grey' : slug[0]
	const hasBanner = page?.fields?.sections?.find(
		(s) => s.sys?.contentType?.sys?.id === 'heroBanner',
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
			{page?.fields?.sections?.map((section) => (
				<SectionResolver
					key={section.sys.id}
					section={section}
					colorVar={colorVar}
				/>
			))}
		</main>
	)
}
