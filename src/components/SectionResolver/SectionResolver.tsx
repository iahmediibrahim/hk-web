import { Entry } from 'contentful'
import { ReactNode } from 'react'
import { AboutSection, AboutSectionProps } from '../AboutSection'
import { BenefitsProps, BenefitsSection } from '../BenefitsSection'
import { HeroBanner, HeroBannerProps } from '../HeroBanner'
import { Testimonials, TestimonialsProps } from '../Testimonials'

type SectionTypeMap = {
	heroBanner: HeroBannerProps
	aboutSection: AboutSectionProps
	testimonials: TestimonialsProps
	benefitsSection: BenefitsProps
	// heroSection: HeroSectionProps
	// featureGrid: FeatureGridProps
	// richTextBlock: RichTextProps
	// Add more section types as needed
}

// Component map with TypeScript enforcement
const componentMap: {
	[K in keyof SectionTypeMap]: (props: SectionTypeMap[K]) => ReactNode
} = {
	heroBanner: HeroBanner,
	aboutSection: AboutSection,
	testimonials: Testimonials,
	benefitsSection: BenefitsSection,

	// heroSection: HeroSection,
	// featureGrid: FeatureGrid,
	// richTextBlock: RichTextBlock,
}

export function SectionResolver({
	section,
	colorVar,
}: {
	section: Entry<any>
	colorVar: string
}) {
	// Get the content type ID from the entry
	const contentType = section.sys.contentType.sys.id as keyof SectionTypeMap
	console.log('section', section)
	console.log('contentType', contentType)
	const Component = componentMap[contentType]

	if (!Component) {
		console.warn(`No component registered for ${contentType}`)
		return null
	}
	const fields = {
		...section.fields,
		colorVar,
	} as SectionTypeMap[typeof contentType]
	// Type-safe props passing
	return <Component {...(fields as any)} />
}
