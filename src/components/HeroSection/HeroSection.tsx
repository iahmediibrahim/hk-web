import { CTA, Video } from '@/lib/contentful'
import {
	faChevronDown,
	faChevronRight,
	faSearch,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { HKELogo } from '../HKELogo'
import { HKGLogo } from '../HKGLogo'
import { HKHLogo } from '../HKHLogo'
import { HKILogo } from '../HKILogo'
import { HKTLogo } from '../HKTLogo'
import { PrimaryButton } from '../PrimaryButton'

export interface HeroSectionProps {
	colorVar?: string
	paragraph?: string
	linkToJobs?: string
	cta?: CTA
	video: Video
}

export function HeroSection({
	colorVar,
	paragraph,
	linkToJobs,
	cta,
	video,
}: HeroSectionProps) {
	const HomeLogo = () => <HKILogo color={'var(--dark-grey)'} />
	const MedicalLogo = () => <HKILogo color={'var(--international-medical)'} />

	return (
		<section
			style={{ height: 'calc(100vh - 200px)' }}
			className="hero-section relative overflow-hidden min-h-[530px]"
		>
			<div className="video-container absolute inset-y-0 inset-x-0">
				<video
					autoPlay
					loop
					muted
					className="object-cover w-full h-full"
					poster={video?.fields?.poster?.fields?.file?.url}
				>
					<source
						src={video?.fields?.video?.fields?.file?.url}
						type="video/webm"
					/>
				</video>
			</div>
			<div className="absolute inset-y-0 inset-x-0 bg-white bg-opacity-60 flex justify-center items-center">
				<div className="xs:basis-11/12 flex flex-wrap justify-center">
					{colorVar === 'education' ? (
						<HKELogo />
					) : colorVar === 'academy' ? (
						<HKTLogo />
					) : colorVar === 'healthcare' ? (
						<HKHLogo />
					) : colorVar === 'international-medical' ? (
						<MedicalLogo />
					) : (
						<HomeLogo />
					)}

					{paragraph && (
						<p className="md:text-2xl xs:text-lg font-normal w-full flex justify-center my-3 opacity-70">
							<span className="md:w-6/12 xs:w-full text-center">
								{paragraph}
							</span>
						</p>
					)}

					<div
						className={`w-full flex flex-wrap justify-center items-center mt-6 gap-3`}
					>
						{cta && (
							<PrimaryButton
								href={cta?.fields?.linkTo}
								large={cta?.fields?.large}
							>
								<div className="flex justify-center items-center">
									<span className="text-base">{cta.fields?.title}</span>
									<FontAwesomeIcon
										className="ml-3 text-lg"
										icon={
											cta?.fields?.linkTo.includes('#')
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
									<span className="text-base">JOBS</span>
								</div>
							</PrimaryButton>
						)}
					</div>

					<div className="w-full flex flex-wrap justify-center items-center mt-8">
						<HKGLogo />
					</div>
					<div className="mt-5 animate-bounce">
						<Link href="#about" className="text-2xl">
							<FontAwesomeIcon size="sm" icon={faChevronDown} />
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}
