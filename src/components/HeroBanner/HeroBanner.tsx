'use client'
import CountUp from 'react-countup'
import { PrimaryButton } from '../PrimaryButton'

export interface HeroBannerProps {
	heading?: string
	paragraph?: string
	cta?: {
		fields: {
			ctaTitle: string
			linkTo: string
			large: boolean
		}
	}
	img?: {
		fields: {
			file: {
				url: string
				fileName: string
			}
		}
	}
	counter?: {
		fields: {
			title: string
			number: number
		}
	}
	bg?: string
	slug: string
}

export function HeroBanner({
	heading,
	paragraph,
	cta,
	img,
	counter,
	slug,
}: HeroBannerProps) {
	return (
		<div
			className="pb-16"
			style={{ backgroundColor: `var(--${slug}-heroPanner)` }}
		>
			<div className="container mx-auto px-4">
				<div className="flex flex-wrap justify-between items-center text-white">
					<div className="md:w-8/12 xs:w-full">
						<div className="font-normal w-full">
							{heading && (
								<div
									className={`my-12 md:text-5xl xs:text-4xl font-black md:w-9/12 xs:w-full`}
									style={{ lineHeight: 1.2 }}
									dangerouslySetInnerHTML={{ __html: heading }}
								/>
							)}

							{paragraph && (
								<div className="text-xl md:w-9/12 xs:w-full leading-9">
									{paragraph}
								</div>
							)}

							{cta && (
								<PrimaryButton
									href={cta?.fields?.linkTo}
									large={cta.fields.large}
								>
									{cta?.fields?.ctaTitle}
								</PrimaryButton>
							)}
						</div>
					</div>
					{img && (
						<div
							className={`md:w-4/12 xs:w-full flex md:justify-center xs:justify-center md:mt-0 xs:mt-5 items-start
								}`}
						>
							<img
								className={`w-50`}
								src={img.fields?.file.url}
								alt="Banner visual"
							/>
						</div>
					)}
					{counter && (
						<div className="text-lg md:w-4/12 xs:w-full flex flex-wrap md:justify-center xs:justify-center md:mt-0 xs:mt-5 items-center">
							<div className="text-center mt-8">
								<p className="w-full">{counter?.fields?.title}</p>
								<CountUp
									start={0}
									end={counter?.fields?.number}
									duration={2.5}
									separator=","
									className="text-4xl font-bold"
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
