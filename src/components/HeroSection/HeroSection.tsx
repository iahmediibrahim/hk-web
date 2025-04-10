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
}
// hk-group-inverted-icon.svg
// src="/Artboard.svg"

export function HeroSection({
	paragraph = 'A platform of funding and expertise to help entrepreneurs achieve their dreams.',
	cta,
	linkToJobs,
	img,
}: HeroSectionProps) {
	return (
		<section
			style={{ height: 'calc(100vh - 180px)' }}
			className="hero-section bg-white relative overflow-hidden min-h-[530px]"
		>
			{img && (
				<div className="absolute inset-0">
					{/* Modern gradient overlay with smooth transitions */}
					<div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/50 to-transparent z-10 backdrop-blur-md" />

					<div className="absolute right-0 top-0 w-1/2 h-full">
						<div className="relative h-full transform transition-all duration-1000 ease-out overflow-hidden rounded-l-[80px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
							{/* Subtle teal overlay for brand consistency */}
							<div className="absolute inset-0 bg-teal-50/30 backdrop-blur-[3px] mix-blend-overlay" />

							{/* Decorative pattern overlay */}
							<Image
								src="/Artboard.svg"
								alt="Overlay Pattern"
								className="absolute w-full h-full object-cover z-10 mix-blend-overlay opacity-40"
								fill
								priority
							/>
							{/* Main hero image */}
							<Image
								src={`https:${img.fields.file.url}`}
								alt={paragraph}
								className="object-cover h-full w-full transform scale-105 hover:scale-110 transition-all duration-1000 ease-out motion-safe:animate-subtle-zoom"
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								priority
							/>
						</div>
					</div>
				</div>
			)}

			<div className="relative z-20 h-full container mx-auto px-4 py-20">
				<div className="max-w-2xl h-full flex items-center">
					<div>
						<h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
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
											className="ml-3 text-lg"
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
					className="text-gray-500 hover:text-gray-700 transition-colors"
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
