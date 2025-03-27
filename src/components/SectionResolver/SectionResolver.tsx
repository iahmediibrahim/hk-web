import { Entry } from 'contentful'
import { ReactNode } from 'react'
import { AboutSection, AboutSectionProps } from '../AboutSection'
import { ArticlesSection, ArticlesSectionProps } from '../ArticlesSection'
import {
	DynamicCardSection,
	DynamicCardSectionProps,
} from '../DynamicCardSection'
import { Faqs, FaqsProps } from '../Faqs'
import { HeroBanner, HeroBannerProps } from '../HeroBanner'
import { HeroSection, HeroSectionProps } from '../HeroSection'
import { HowItWorksSection, HowItWorksSectionProps } from '../HowItWorksSection'
import { InfoSection, InfoSectionProps } from '../InfoSection'
import { Testimonials, TestimonialsProps } from '../Testimonials'

type SectionTypeMap = {
	heroBanner: HeroBannerProps
	aboutSection: AboutSectionProps
	testimonials: TestimonialsProps
	// benefitsSection: BenefitsProps
	heroSection: HeroSectionProps
	dynamicCardSection: DynamicCardSectionProps
	// whyUsSection: WhyUsSectionProps
	// ourClientsSection: OurClientsSectionProps
	infoSection: InfoSectionProps
	howItWorksSection: HowItWorksSectionProps
	faqs: FaqsProps
	articlesSection: ArticlesSectionProps
}

// Component map with TypeScript enforcement
const componentMap: {
	[K in keyof SectionTypeMap]: (props: SectionTypeMap[K]) => ReactNode
} = {
	heroBanner: HeroBanner,
	aboutSection: AboutSection,
	testimonials: Testimonials,
	// benefitsSection: BenefitsSection,
	heroSection: HeroSection,
	dynamicCardSection: DynamicCardSection,
	// whyUsSection: WhyUsSection,
	// ourClientsSection: OurClientsSection,
	infoSection: InfoSection,
	howItWorksSection: HowItWorksSection,
	faqs: Faqs,
	articlesSection: ArticlesSection,
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
	// console.log('section', section)
	// console.log('contentType', contentType)
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
