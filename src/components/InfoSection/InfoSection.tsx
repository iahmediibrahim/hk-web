import { InfoStepCard } from '../InfoStepCard'
import { ListComponent } from '../ListComponent'
import { PrimaryButton } from '../PrimaryButton'

export interface InfoSectionProps {
	heading: string
	paragraph: string
	cta?: {
		title: string
		link: string
	}
	image?: {
		src: string
		alt: string
	}
	imagePosition?: 'left' | 'right'
	textBg?: boolean
	colorVar?: string
	list?: {
		text: string
		linkTo?: string
	}[]
	cardList?: {
		text: string
		stepNumber?: number
		paragraph?: string
	}[]
}

export function InfoSection({
	heading,
	paragraph,
	list,
	cardList,
	cta,
	image,
	imagePosition = 'left',
	textBg = false,
	colorVar,
}: InfoSectionProps) {
	console.log(image)
	const ImageSection = () => (
		<div className="md:w-6/12 w-full h-full">
			{/* {image && (
				<Image
					className="w-full h-full object-cover"
					src={image?.src}
					alt={image?.alt}
					width={1920}
					height={1080}
				/>
			)} */}
		</div>
	)

	const ContentSection = () => (
		<div
			className={`${image ? 'md:w-6/12' : 'w-full'} p-12 h-full flex flex-col ${
				image ? 'justify-center' : 'items-center'
			}`}
			style={{
				backgroundColor: textBg ? `var(--${colorVar}-heroBanner)` : 'white',
			}}
		>
			<div
				className={`text-lg ${!image && 'text-center'}`}
				style={{ color: textBg ? 'white' : 'black' }}
			>
				<h2 className="md:text-5xl text-4xl font-black mb-7">{heading}</h2>
				{list && <ListComponent list={list} colorVar={colorVar} />}
				{cardList && (
					<InfoStepCard
						cardList={[
							{
								text: 'dasdasd',
								stepNumber: 1,
								paragraph:
									'The average salary for an Adult Social Worker is $45,000 to $55,000 per year. The average age for an Adult Social Worker is 25 to 34 years old.',
							},
							{
								stepNumber: 1,
								paragraph:
									'The average salary for an Adult Social Worker is $45,000 to $55,000 per year. The average age for an Adult Social Worker is 25 to 34 years old.',
							},
							{
								stepNumber: 1,
								paragraph:
									'The average salary for an Adult Social Worker is $45,000 to $55,000 per year. The average age for an Adult Social Worker is 25 to 34 years old.',
							},
							{
								stepNumber: 1,
								paragraph:
									'The average salary for an Adult Social Worker is $45,000 to $55,000 per year. The average age for an Adult Social Worker is 25 to 34 years old.',
							},
						]}
						colorVar={colorVar}
					/>
				)}
				<p>{paragraph}</p>
			</div>
			{cta && (
				<PrimaryButton href={cta.link} className={!image ? 'mx-auto mt-6' : ''}>
					{cta.title}
				</PrimaryButton>
			)}
		</div>
	)

	return (
		<div className="container mx-auto">
			<div className="flex flex-wrap">
				{/* Desktop layout */}
				<div
					className={`hidden md:flex w-full ${image ? 'h-[600px]' : 'h-auto'}`}
				>
					{image ? (
						imagePosition === 'left' ? (
							<>
								<ImageSection />
								<ContentSection />
							</>
						) : (
							<>
								<ContentSection />
								<ImageSection />
							</>
						)
					) : (
						<ContentSection />
					)}
				</div>

				{/* Mobile layout */}
				<div className="flex flex-col md:hidden w-full">
					<ContentSection />
					{image && <ImageSection />}
				</div>
			</div>
		</div>
	)
}
