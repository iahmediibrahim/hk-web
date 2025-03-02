import { BenefitsSection, Breadcrumb, SectionResolver } from '@/components'
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
					backgroundColor={`var(--${slug[0]}-heroPanner)`}
					textColor="white"
				/>
			)}

			{contentType === 'page' && <Breadcrumb path={slug} />}
			{page.fields.sections?.map((section) => (
				<SectionResolver
					key={section.sys.id}
					section={section}
					slug={slug[0]}
				/>
			))}

			<BenefitsSection
				heading="dasdasd"
				listOfCards={[
					{
						text: 'Hire top talent contributing to growth',
					},

					{
						text: '1 day a year – Give back to our clients',
					},
					{
						text: 'dasdasd',
					},
					{
						text: 'dasdasd',
					},
					{
						text: 'dasdasd',
					},
				]}
				slug={slug[0]}
			/>
			{/* <HowItWorks
				paragraphs={[
					'As part of our mission to ensure no child is left behind, we are excited to launch a new initiative, with social value at its heart. This campaign aims to help your school provide much-needed school uniforms or food vouchers to the pupils who need them most.',
					'We are committed to making a positive impact on the lives of children in need, and we believe that every child deserves a chance to thrive. By participating in this campaign, you can help us make a difference in the lives of children in need.',
				]}
				cta={{
					title: 'Learn More',
					link: '/',
				}}
				slug={slug[0]}
			/>
			<InfoSection
				image={{
					src: 'https://holdenknight.com/_nuxt/school-boy-web.1aa4b28c.jpg',
					alt: 'dasdasd',
				}}
				heading="An initiative centred on social value"
				paragraph="As part of our mission to ensure no child is left behind, we are excited to launch a new incentive, with social value at its heart. This campaign aims to help your school provide much-needed school uniforms or food vouchers to the pupils who need them most."
				cta={{
					title: 'Learn More',
					link: '/',
				}}
				textBg
				slug={slug[0]}
			/>
			<InfoSection
				image={{
					src: 'https://holdenknight.com/_nuxt/school-boy-web.1aa4b28c.jpg',
					alt: 'dasdasd',
				}}
				heading="An initiative centred on social value"
				paragraph="As part of our mission to ensure no child is left behind, we are excited to launch a new incentive, with social value at its heart. This campaign aims to help your school provide much-needed school uniforms or food vouchers to the pupils who need them most."
				cta={{
					title: 'Learn More',
					link: '/',
				}}
				imagePosition="right"
			/> */}
		</main>
	)
}
