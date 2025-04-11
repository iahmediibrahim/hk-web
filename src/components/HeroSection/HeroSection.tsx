import { ContentfulImage, CTA } from '@/lib/contentful'
import {
	faChevronDown,
	faChevronRight,
	faSearch,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import { PrimaryButton } from '../PrimaryButton'

export interface HeroSectionProps {
	colorVar?: string
	paragraph?: string
	cta?: CTA
	linkToJobs?: string
	img?: ContentfulImage
	fitImage?: boolean
	pic?: ContentfulImage
}
// hk-group-inverted-icon.svg
// src="/Artboard.svg"

export function HeroSection({
	paragraph = 'A platform of funding and expertise to help entrepreneurs achieve their dreams.',
	cta,
	linkToJobs,
	img,
	fitImage,
	pic,
}: HeroSectionProps) {
	return (
		<section
			style={{ height: 'calc(100vh - 180px)' }}
			className="hero-section bg-white relative overflow-hidden min-h-[530px]"
		>
			{img && (
				<div className="absolute inset-0">
					{/* Modern gradient overlay with smooth transitions */}
					<div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/60 to-transparent z-10 backdrop-blur-sm" />

					<div className="absolute inset-0 h-full group">
						<div className="relative h-full">
							{/* Subtle teal overlay for brand consistency */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500" />
							<div className="absolute inset-0 bg-gradient-radial from-white/30 via-transparent to-transparent mix-blend-overlay opacity-0 group-hover:opacity-100 transition-all duration-500" />
							{/* Decorative pattern overlay */}
							<Image
								src="/Artboard.svg"
								alt="Overlay Pattern"
								className="absolute w-full h-full object-cover z-10 mix-blend-overlay opacity-30"
								fill
								priority
							/>
							{/* Main hero image */}
							<Image
								src={`https:${img.fields.file.url}`}
								alt={paragraph}
								className={`${
									fitImage
										? 'object-fit object-center scale-90'
										: 'object-cover'
								} h-full w-full transform  motion-safe:animate-subtle-zoom [filter:brightness(1.05)_contrast(1.05)]`}
								fill
								sizes="100vw"
								priority
							/>
						</div>
					</div>
				</div>
			)}

			<div className="relative z-20 h-full container mx-auto px-4 py-20">
				<div className="max-w-2xl h-full flex items-center">
					<div>
						{pic && (
							<div className="mb-12 relative">
								<Image
									src={`https:${pic.fields.file.url}`}
									alt="Additional hero image"
									width={200}
									height={200}
									priority
								/>
								<div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent mix-blend-overlay rounded-lg" />
							</div>
						)}
						<h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
							{paragraph}
						</h1>
						<div className="w-full flex flex-wrap mt-16 gap-3">
							{cta && (
								<PrimaryButton
									href={cta.fields.linkTo}
									large={cta.fields.large}
								>
									<div className="flex justify-center items-center">
										<span className="text-base">{cta.fields.title}</span>
										<FontAwesomeIcon
											className="ml-3 text-lg transition-transform duration-300 group-hover:translate-x-1"
											icon={
												cta.fields.linkTo.includes('#')
													? faChevronDown
													: faChevronRight
											}
										/>
									</div>
								</PrimaryButton>
							)}
							{linkToJobs && (
								<PrimaryButton href={linkToJobs} large bgWhite>
									<div className="flex justify-center items-center">
										<FontAwesomeIcon className="mr-2 text-lg" icon={faSearch} />
										<span className="text-base">Jobs</span>
									</div>
								</PrimaryButton>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
				<Link
					href="#about"
					className="text-gray-100 hover:text-gray-700 transition-colors"
				>
					<FontAwesomeIcon
						icon={faChevronDown}
						className="animate-bounce"
						size="lg"
					/>
				</Link>
			</div>
		</section>
	)
}
