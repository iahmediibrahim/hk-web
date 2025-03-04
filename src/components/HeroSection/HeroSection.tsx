import { CTA } from '@/lib/contentful'
import { faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { HKELogo } from '../HKELogo'
import { HKGLogo } from '../HKGLogo'
import { HKHLogo } from '../HKHLogo'
import { HKILogo } from '../HKILogo'
import { HKTLogo } from '../HKTLogo'
import { PrimaryButton } from '../PrimaryButton'

interface HeroSectionProps {
	colorVar?: string
	paragraph?: string
	linkToJobs?: string
	cta?: CTA
}

export function HeroSection({
	colorVar,
	paragraph,
	linkToJobs,
	cta,
}: HeroSectionProps) {
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
					poster={
						'https://holdenknight.blob.core.windows.net/videos/children.jpg'
					}
				>
					<source
						src={
							'https://holdenknight.blob.core.windows.net/videos/children.webm'
						}
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
					) : (
						<HKILogo
							color={
								colorVar === '/'
									? 'var(--dark-grey)'
									: 'var(--international-medical-heroBanner)'
							}
						/>
					)}

					{paragraph && (
						<p className="md:text-2xl xs:text-lg font-normal w-full flex justify-center my-3 opacity-70 -mb-1">
							<span className="md:w-6/12 xs:w-full text-center">
								{paragraph}
							</span>
						</p>
					)}

					<div className={`w-full flex flex-wrap justify-center items-center`}>
						{cta && (
							<PrimaryButton
								href={cta?.fields?.linkTo}
								large={cta?.fields?.large}
							>
								<div className="flex justify-center items-center">
									<span>{cta.fields?.title}</span>
									<FontAwesomeIcon
										className="ml-3 text-lg"
										icon={faChevronDown}
									/>
								</div>
							</PrimaryButton>
						)}
						{linkToJobs && (
							<Link
								href={linkToJobs}
								className="mt-10 p-2 px-8 ease-out duration-300 rounded-full uppercase text-lg mx-1 bg-white"
							>
								<div className="flex justify-center items-center">
									<FontAwesomeIcon className="mr-2 text-lg" icon={faSearch} />
									<span>JOBS</span>
								</div>
							</Link>
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
