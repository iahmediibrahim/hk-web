'use client'
import { ContentfulImage, CTA } from '@/lib/contentful/types'
import { faPoundSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import CountUp from 'react-countup'
import { PrimaryButton } from '../PrimaryButton'

export interface HeroBannerProps {
	heading?: string
	paragraph?: string
	cta?: CTA
	img?: ContentfulImage
	counter?: {
		fields: {
			title: string
			number: number
		}
	}
	bg?: string
	colorVar: string
}

export function HeroBanner({
	heading,
	paragraph,
	cta,
	img,
	counter,
	colorVar,
}: HeroBannerProps) {
	return (
		<div
			className="pb-16"
			style={{ backgroundColor: `var(--${colorVar}-heroBanner)` }}
		>
			<div className="container mx-auto px-4">
				<div className="flex flex-wrap justify-between items-center text-white">
					<div className="md:w-8/12 xs:w-full">
						<div className="font-normal w-full">
							{heading && (
								<h1
									className={`my-12 text-3xl md:text-5xl sm:text-4xl font-black md:w-9/12 xs:w-full`}
								>
									{' '}
									{heading}{' '}
								</h1>
							)}

							{paragraph && (
								<div className="text-xl md:w-9/12 xs:w-full leading-9 mb-6">
									{paragraph}
								</div>
							)}

							{cta && (
								<PrimaryButton
									href={cta?.fields?.linkTo}
									large={cta.fields.large}
									outlined={cta.fields.outlined}
								>
									{cta?.fields?.title}
								</PrimaryButton>
							)}
						</div>
					</div>
					{img && (
						<div
							className={`md:w-4/12 xs:w-full flex md:justify-center xs:justify-center md:mt-0 xs:mt-5 items-start
								}`}
						>
							<Image
								className={`w-50`}
								src={'https:' + img.fields?.file.url}
								alt="Banner visual"
								width={img.fields.file.details.image.width}
								height={img.fields.file.details.image.height}
							/>
						</div>
					)}
					{counter && (
						<div className="text-lg md:w-4/12 xs:w-full flex flex-wrap md:justify-center xs:justify-center md:mt-0 xs:mt-5 items-center">
							<div className="text-center mt-8">
								<p className="w-full mb-4">{counter?.fields?.title}</p>
								<div className="text-6xl">
									<FontAwesomeIcon icon={faPoundSign} />
									<CountUp
										start={0}
										end={counter?.fields?.number}
										duration={2.5}
										separator=","
										className="text-6xl font-bold"
									/>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
