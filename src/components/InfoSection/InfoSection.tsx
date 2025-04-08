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
		<div className={`md:w-1/2 w-full overflow-hidden group  rounded-2xl`}>
			{img && (
				<Image
					className={`w-full h-full ${
						imageFit ? 'object-contain' : 'object-cover'
					} transition-all duration-700 group-hover:scale-105 group-hover:rotate-1`}
					src={'https:' + img.fields.file.url}
					alt={img.fields.file.fileName}
					width={1920}
					height={1080}
					priority
					quality={90}
				/>
			)}
		</div>
	)

	const ContentSection = () => (
		<div
			className={`${
				img ? 'md:w-1/2' : 'w-full'
			} px-8 py-12 md:px-12 h-full flex flex-col ${
				img ? 'justify-center' : 'items-center'
			} backdrop-blur-lg rounded-2xl`}
			style={{
				backgroundColor: textBg
					? `var(--${colorVar}-heroBanner)`
					: 'rgba(255, 255, 255, 0.98)',
			}}
		>
			<div
				className={`text-lg ${!img && 'text-center'} space-y-10`}
				style={{ color: textBg ? 'white' : 'black' }}
			>
				<h2
					className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight ${
						!img && 'max-w-5xl mx-auto'
					} animate-fade-in`}
				>
					{heading}
				</h2>
				{paragraph && (
					<div className="prose prose-lg max-w-none">
						<RichText content={paragraph} />
					</div>
				)}
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
						className="text-xl opacity-90 leading-relaxed"
						dangerouslySetInnerHTML={{ __html: paragraph2 }}
					/>
				)}
			</div>
			{cta && (
				<div className="mt-10 flex md:block justify-center">
					<PrimaryButton
						href={cta?.fields?.linkTo}
						large={cta?.fields?.large}
						outlined={cta?.fields?.outlined}
						className={`${
							!img ? 'mx-auto' : ''
						} transform transition-all duration-500 hover:scale-105 hover:shadow-lg`}
					>
						{cta.fields?.title}
					</PrimaryButton>
				</div>
			)}
		</div>
	)

	return (
		<div className="container mx-auto px-6 py-24">
			<div className="flex flex-wrap max-w-7xl mx-auto">
				{/* Desktop layout */}
				<div className="hidden md:flex w-full gap-8">
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
				<div className="flex flex-col md:hidden w-full gap-8">
					<ContentSection />
					{img && <ImageSection />}
				</div>
			</div>
		</div>
	)
}
