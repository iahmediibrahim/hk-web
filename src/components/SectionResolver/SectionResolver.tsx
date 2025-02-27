import { Entry } from 'contentful'
import { ReactNode } from 'react'
import { HeroBanner, HeroBannerProps } from '../HeroBanner'

type SectionTypeMap = {
	heroBanner: HeroBannerProps
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
	// heroSection: HeroSection,
	// featureGrid: FeatureGrid,
	// richTextBlock: RichTextBlock,
}

export function SectionResolver({ section }: { section: Entry<any> }) {
	// Get the content type ID from the entry
	const contentType = section.sys.contentType.sys.id as keyof SectionTypeMap
	console.log('section', section)
	console.log('contentType', contentType)
	const Component = componentMap[contentType]

	if (!Component) {
		console.warn(`No component registered for ${contentType}`)
		return null
	}

	// Type-safe props passing
	return <Component {...section.fields} />
}
