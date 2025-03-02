import { PrimaryButton } from '../PrimaryButton'

export interface InfoSectionProps {
	heading: string
	paragraph: string
	cta?: {
		title: string
		link: string
	}
	image: {
		src: string
		alt: string
	}
	imagePosition?: 'left' | 'right'
	textBg?: boolean
	slug?: string
}

export function InfoSection({
	heading,
	paragraph,
	cta,
	image,
	imagePosition = 'left',
	textBg = false,
	slug,
}: InfoSectionProps) {
	const ImageSection = () => (
		<div className="md:w-6/12 w-full h-full">
			<img
				className="w-full h-full object-cover"
				src={image.src}
				alt={image.alt}
			/>
		</div>
	)

	const ContentSection = () => (
		<div
			className="md:w-6/12 w-full p-12 h-full flex flex-col justify-center"
			style={{
				backgroundColor: textBg ? `var(--${slug}-heroBanner)` : 'white',
			}}
		>
			<div className="text-lg" style={{ color: textBg ? 'white' : 'black' }}>
				<h2 className="md:text-5xl text-4xl font-black mb-7">{heading}</h2>
				<p>{paragraph}</p>
			</div>
			{cta && <PrimaryButton href={cta.link}>{cta.title}</PrimaryButton>}
		</div>
	)

	return (
		<div className="container mx-auto">
			<div className="flex flex-wrap">
				{/* Desktop layout */}
				<div className="hidden md:flex w-full h-[600px]">
					{imagePosition === 'left' ? (
						<>
							<ImageSection />
							<ContentSection />
						</>
					) : (
						<>
							<ContentSection />
							<ImageSection />
						</>
					)}
				</div>

				{/* Mobile layout */}
				<div className="flex flex-col md:hidden w-full">
					<ContentSection />
					<ImageSection />
				</div>
			</div>
		</div>
	)
}
