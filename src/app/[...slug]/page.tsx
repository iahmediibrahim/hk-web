import {
	Breadcrumb,
	HowItWorks,
	InfoSection,
	SectionResolver,
} from '@/components'
import Faqs from '@/components/Faqs/Faqs'
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

	return (
		<main>
			{/* <HeroSection
				colorVar={colorVar}
				paragraph="As part of our mission to ensure no child is left behind, we are excited to launch a new initiative, with social value at its heart. This campaign aim"
				linkToJobs="/jobs"
				cta={{
					fields: {
						title: 'learn more',
						linkTo: '#about',
						large: true,
					},
				}}
			/> */}

			{contentType === 'subPage' && (
				<Breadcrumb
					path={slug}
					backgroundColor={`var(--${colorVar}-heroBanner)`}
					textColor="white"
				/>
			)}

			{page.fields.sections?.map((section) => (
				<SectionResolver
					key={section.sys.id}
					section={section}
					colorVar={colorVar}
				/>
			))}
			<Faqs colorVar={colorVar} heading="FAQS" />
			<HowItWorks
				paragraphs={[
					'As part of our mission to ensure no child is left behind, we are excited to launch a new initiative, with social value at its heart. This campaign aims to help your school provide much-needed school uniforms or food vouchers to the pupils who need them most.',
					'We are committed to making a positive impact on the lives of children in need, and we believe that every child deserves a chance to thrive. By participating in this campaign, you can help us make a difference in the lives of children in need.',
				]}
				cta={{
					title: 'Learn More',
					link: '/',
				}}
				slug={colorVar}
			/>
			<InfoSection
				heading="An initiative centred on social value"
				paragraph="As part of our mission to ensure no child is left behind, we are excited to launch a new incentive, with social value at its heart. This campaign aims to help your school provide much-needed school uniforms or food vouchers to the pupils who need them most."
				cta={{
					title: 'Learn More',
					link: '/',
				}}
				list={[
					{
						text: 'Adult Social Worker jobs',
					},
					{
						text: "Children's Social Worker jobs",
					},
					{
						text: 'Dental Nurse jobs',
					},
					{
						text: 'Registered Manager Jobs (Adults)',
					},
					{
						text: "Registered Manager Jobs (Children's home)",
					},
					{
						text: 'Deputy Manager jobs (Adults)',
					},
					{
						text: "Deputy Manager jobs (Children's home)",
					},
					{
						text: 'Healthcare Assistant jobs',
					},
					{
						text: 'Registered Mental Health Nurse jobs',
					},
					{
						text: 'Registered General Nurse jobs',
					},
					{
						text: 'Unqualified support worker jobs',
					},
					{
						text: 'Qualified support worker jobs',
					},
					{
						text: 'Occupational Therapist jobs',
					},
					{
						text: 'Home Manager jobs',
					},
					{
						text: 'Psychologist/Psychotherapist jobs',
					},
					{
						text: 'Dentist jobs',
					},
					{
						text: 'Dental Hygienist jobs',
					},
					{
						text: 'Clinical Lead jobs',
					},
				]}
				textBg
				colorVar={colorVar}
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
				colorVar={colorVar}
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
			/>
		</main>
	)
}
