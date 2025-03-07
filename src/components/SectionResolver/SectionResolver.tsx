import { Entry } from 'contentful'
import { ReactNode } from 'react'
import { AboutSection, AboutSectionProps } from '../AboutSection'
import { BenefitsProps, BenefitsSection } from '../BenefitsSection'
import {
	DynamicCardSection,
	DynamicCardSectionProps,
} from '../DynamicCardSection'
import { HeroBanner, HeroBannerProps } from '../HeroBanner'
import { HeroSection, HeroSectionProps } from '../HeroSection'
import { OurClientsSection, OurClientsSectionProps } from '../OurClientsSection'
import { Testimonials, TestimonialsProps } from '../Testimonials'
import { WhyUsSection, WhyUsSectionProps } from '../WhyUsSection'

type SectionTypeMap = {
	heroBanner: HeroBannerProps
	aboutSection: AboutSectionProps
	testimonials: TestimonialsProps
	benefitsSection: BenefitsProps
	heroSection: HeroSectionProps
	dynamicCardSection: DynamicCardSectionProps
	whyUsSection: WhyUsSectionProps
	ourClientsSection: OurClientsSectionProps
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
	heroSection: HeroSection,
	dynamicCardSection: DynamicCardSection,
	whyUsSection: WhyUsSection,
	ourClientsSection: OurClientsSection,
	// featureGrid: FeatureGrid,
	// richTextBlock: RichTextBlock,
}

export function SectionResolver({
	section,
	colorVar,
}: {
	section: Entry
	colorVar: string
}) {
	// Get the content type ID from the entry
	const contentType = section?.sys?.contentType?.sys?.id as keyof SectionTypeMap
	console.log('section', section)
	console.log('contentType', contentType)
	const Component = componentMap[contentType] as (
		props: SectionTypeMap[typeof contentType],
	) => ReactNode
	// componentMap[contentType]

	if (!Component) {
		console.warn(`No component registered for ${contentType}`)
		return null
	}
	const props: SectionTypeMap[keyof SectionTypeMap] = {
		...section.fields,
		colorVar,
	}
	// Type-safe props passing
	return <Component {...props} />
}
