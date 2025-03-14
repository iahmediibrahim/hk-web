import { ContentfulImage, CTA } from '@/lib/contentful'
import Image from 'next/image'
import Link from 'next/link'
import { AbardoLogo } from '../AbardoLogo'
import { Logo } from '../Logo'
import { PatrecLogo } from '../PatrecLogo'
import { PrimaryButton } from '../PrimaryButton'

export interface CardFields {
	img: ContentfulImage
	title: string
	subTitle?: string
	paragraph: string
	primaryButton?: CTA
	secondaryButton?: CTA
	id: string
	link?: string
	date?: string
	isArticle?: boolean
}

export interface CardProps {
	fields: CardFields
}

export function HomeCard({
	img,
	title,
	subTitle,
	paragraph,
	primaryButton,
	secondaryButton,
	id,
	link,
	date,
	isArticle = false,
}: CardFields) {
	const CardContent = () => (
		<>
			<div className="relative h-72 sm:h-[400px] w-full overflow-hidden">
				<Image
					src={'https:' + img.fields.file.url}
					alt={title}
					className="object-cover transform group-hover:scale-105 transition-transform duration-500"
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					priority
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
			</div>

			<div className="flex flex-col flex-grow p-8 space-y-6">
				{id ? (
					<div className="flex items-start gap-6">
						<div className="p-3 bg-gray-50/80 backdrop-blur-sm rounded-xl shadow-sm">
							{id === 'patrec' ? (
								<PatrecLogo />
							) : id === 'abardo' ? (
								<AbardoLogo />
							) : (
								<Logo size={48} color={`var(--${id})`} />
							)}
						</div>
						<div className="flex flex-col">
							<h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-gray-900 via-gray-700 to-gray-800">
								{title}
							</h3>
							{subTitle && (
								<span className="text-sm text-gray-600 mt-2 font-medium tracking-wide">
									{subTitle}
								</span>
							)}
						</div>
					</div>
				) : (
					<div className="flex flex-col">
						<h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-gray-900 via-gray-700 to-gray-800">
							{title}
						</h3>
						{subTitle && (
							<span className="text-sm text-gray-600 mt-2 font-medium tracking-wide">
								{subTitle}
							</span>
						)}
					</div>
				)}

				<p
					className={`text-gray-600 leading-relaxed ${
						isArticle ? 'line-clamp-3' : ''
					}`}
				>
					{paragraph}
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-start items-end mt-auto flex-grow">
					{primaryButton && (
						<PrimaryButton
							href={primaryButton.fields.linkTo}
							large={primaryButton.fields.large}
							outlined={primaryButton.fields.outlined}
							className="w-full sm:w-auto transition-transform active:scale-95"
						>
							{primaryButton.fields.title}
						</PrimaryButton>
					)}
					{secondaryButton && (
						<PrimaryButton
							href={secondaryButton.fields.linkTo}
							large={secondaryButton.fields.large}
							outlined={secondaryButton.fields.outlined}
							className="w-full sm:w-auto transition-transform active:scale-95"
						>
							{secondaryButton.fields.title}
						</PrimaryButton>
					)}
				</div>
				{date && (
					<div className="text-sm text-gray-500 font-medium">
						Article •{' '}
						{new Date(date).toLocaleDateString('en-US', {
							month: 'long',
							day: 'numeric',
							year: 'numeric',
						})}
					</div>
				)}
			</div>
		</>
	)

	const baseClassName =
		'group flex flex-col h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2 backdrop-blur-sm border border-gray-100'

	return link ? (
		<Link href={link} className={baseClassName}>
			<CardContent />
		</Link>
	) : (
		<div className={baseClassName}>
			<CardContent />
		</div>
	)
}
