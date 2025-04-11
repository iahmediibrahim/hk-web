import { ContentfulImage, CTA } from '@/lib/contentful'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import { AbardoLogo } from '../AbardoLogo'
import { Logo } from '../Logo'
import { PatrecLogo } from '../PatrecLogo'
import { PrimaryButton } from '../PrimaryButton'

export interface HomeCardFields {
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
	type?: string
}

export function HomeCard({
	img,
	title,
	subTitle,
	paragraph,
	primaryButton,
	id,
	link,
	date,
	isArticle = false,
}: HomeCardFields) {
	const CardContent = () => (
		<div className="flex flex-col items-center h-full group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
			<div className="relative aspect-video overflow-hidden rounded-t-3xl group w-full">
				<Image
					src={'https:' + img?.fields.file.url}
					alt={title}
					className="object-cover transition-all duration-700 will-change-transform group-hover:scale-105 group-hover:filter group-hover:brightness-90"
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					priority
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
				<div className="absolute bottom-0 left-0 z-10 w-full transform transition-transform duration-500 translate-y-0">
					{id && !isArticle ? (
						<div className="flex items-center justify-center gap-4 backdrop-blur-md bg-white/2 p-5 border-t border-gray-100/20">
							<div className="rounded-2xl bg-white p-4 shadow-md hover:shadow-lg transition-shadow">
								{id === 'patrec' ? (
									<PatrecLogo />
								) : id === 'abardo' ? (
									<AbardoLogo />
								) : (
									<Logo size={36} color={`var(--${id})`} />
								)}
							</div>
							<div className="flex flex-col">
								<h3 className="text-2xl font-bold leading-tight text-white mb-1">
									{title}
								</h3>
								{subTitle && (
									<span className="text-normal font-medium text-gray-100">
										{subTitle}
									</span>
								)}
							</div>
						</div>
					) : (
						<div className="backdrop-blur-md bg-white/2 p-5 border-t border-gray-100/20 text-center">
							<h3 className="text-2xl font-bold leading-tight text-white mb-1">
								{title}
							</h3>
							{subTitle && (
								<span className="text-normal font-medium text-gray-100">
									{subTitle}
								</span>
							)}
						</div>
					)}
				</div>
			</div>

			<div className="relative flex flex-1 flex-col items-center p-5 w-full">
				{primaryButton && (
					<PrimaryButton
						href={primaryButton.fields.linkTo}
						large={primaryButton.fields.large}
						outlined={primaryButton.fields.outlined}
					>
						<FontAwesomeIcon
							icon={faArrowRight}
							color="white"
							className="text-3xl text-gray-50 transform transition-transform group-hover:translate-x-2 shadow-2xl"
						/>
					</PrimaryButton>
				)}
				<p
					className={`text-gray-600 mt-4 leading-relaxed text-lg text-center ${
						isArticle ? 'line-clamp-3' : ''
					}`}
				>
					{paragraph}
				</p>
				{/* <div className="mt-auto space-y-3 sm:space-y-0 sm:flex sm:gap-4">
					{primaryButton && (
						<PrimaryButton
							href={primaryButton.fields.linkTo}
							large={primaryButton.fields.large}
							outlined={primaryButton.fields.outlined}
						>
							{primaryButton.fields.title}
						</PrimaryButton>
					)}
					{secondaryButton && (
						<PrimaryButton
							href={secondaryButton.fields.linkTo}
							large={secondaryButton.fields.large}
							outlined={secondaryButton.fields.outlined}
						>
							{secondaryButton.fields.title}
						</PrimaryButton>
					)}
				</div> */}
				{date && (
					<div className="text-sm mt-4 text-gray-500 font-medium text-center">
						Article •{' '}
						{new Date(date).toLocaleDateString('en-US', {
							month: 'long',
							day: 'numeric',
							year: 'numeric',
						})}
					</div>
				)}
			</div>
		</div>
	)

	return link ? (
		<Link href={link}>
			<CardContent />
		</Link>
	) : (
		<CardContent />
	)
}
