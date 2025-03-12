import { ContentfulImage, CTA } from '@/lib/contentful'
import { Document } from '@contentful/rich-text-types'
import Image from 'next/image'
import { InfoStepCard } from '../InfoStepCard'
import { ListComponent } from '../ListComponent'
import { PrimaryButton } from '../PrimaryButton'
import { RichText } from '../RichText/RichText'
export interface cardListProps {
	fields: {
		stepNumber: number
		title?: string
		paragraph: string
		type?: string
		linkTo?: string
	}
}

export interface InfoSectionProps {
	heading: string
	paragraph: Document
	paragraph2: string
	cta?: CTA
	img?: ContentfulImage
	imagePosition?: 'left' | 'right'
	textBg?: boolean
	colorVar?: string
	listText?: string[]
	cardList?: cardListProps[]
	imageFit: boolean
	listTextLink?: string
	tabs?: string[]
}

export function InfoSection({
	heading,
	paragraph,
	paragraph2,
	listText,
	cardList,
	cta,
	img,
	imagePosition = 'left',
	textBg = false,
	imageFit,
	colorVar,
	listTextLink,
	tabs,
}: InfoSectionProps) {
	const ImageSection = () => (
		<div
			className={`md:w-1/2 w-full overflow-hidden shadow-xl  ${
				imagePosition === 'left' ? 'rounded-l-lg' : 'rounded-r-lg'
			}`}
		>
			{img && (
				<Image
					className={`w-full h-full ${
						imageFit ? 'object-contain ' : 'object-cover '
					} transition-transform duration-500 hover:scale-102`}
					src={'https:' + img.fields.file.url}
					alt={img.fields.file.fileName}
					width={1920}
					height={1080}
					priority
				/>
			)}
		</div>
	)

	const ContentSection = () => (
		<div
			className={`${
				img ? 'md:w-1/2' : 'w-full'
			} px-6 py-10 md:px-10 h-full flex flex-col ${
				img ? 'justify-center' : 'items-center'
			} backdrop-blur-md ${
				img
					? imagePosition === 'left'
						? 'rounded-r-lg'
						: 'rounded-l-lg'
					: 'rounded-lg'
			}`}
			style={{
				backgroundColor: textBg
					? `var(--${colorVar}-heroBanner)`
					: 'rgba(255, 255, 255, 0.95)',
				boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
			}}
		>
			<div
				className={`text-lg ${!img && 'text-center'} space-y-8`}
				style={{ color: textBg ? 'white' : 'black' }}
			>
				<h2
					className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight ${
						!img && 'max-w-4xl mx-auto'
					}`}
				>
					{heading}
				</h2>
				{paragraph && <RichText content={paragraph} />}
				{listText && (
					<ListComponent list={listText} listTextLink={listTextLink} />
				)}
				{cardList && (
					<InfoStepCard
						cardList={cardList}
						tabs={tabs}
						textBg={textBg}
						colorVar={colorVar}
					/>
				)}
				{paragraph2 && (
					<div
						className="text-lg opacity-90 leading-relaxed"
						dangerouslySetInnerHTML={{ __html: paragraph2 }}
					/>
				)}
			</div>
			{cta && (
				<div className="mt-8 flex md:block justify-center text-center">
					<PrimaryButton
						href={cta?.fields?.linkTo}
						large={cta?.fields?.large}
						outlined={cta?.fields?.outlined}
						className={`${
							!img ? 'mx-auto' : ''
						} mt-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg`}
					>
						{cta.fields?.title}
					</PrimaryButton>
				</div>
			)}
		</div>
	)

	return (
		<div className="container mx-auto px-4">
			<div className="flex flex-wrap">
				{/* Desktop layout */}
				<div className="hidden md:flex w-full">
					{img ? (
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
				<div className="flex flex-col md:hidden w-full gap-6">
					<ContentSection />
					{img && <ImageSection />}
				</div>
			</div>
		</div>
	)
}
