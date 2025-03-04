'use client'
import { CTA } from '@/lib/contentful'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback } from 'react'
import { PrimaryButton } from '../PrimaryButton'

export interface TestimonialsProps {
	heading: string
	paragraph: string
	testimonials: {
		fields: {
			name: string
			role: string
			paragraph: string
		}
	}[]
	colorVar: string
	cta: CTA
}

export function Testimonials({
	heading,
	paragraph,
	testimonials,
	colorVar,
	cta,
}: TestimonialsProps) {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev()
	}, [emblaApi])

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext()
	}, [emblaApi])

	return (
		<div className="container mx-auto px-4 py-12">
			<div className="text-left mb-12">
				<h2
					className="text-4xl font-bold mb-4"
					style={{
						color: `var(--${colorVar})`,
					}}
				>
					{heading}
				</h2>
				<p className="text-gray-600 max-w-2xl">{paragraph}</p>
			</div>

			<div className="relative">
				<div className="overflow-hidden" ref={emblaRef}>
					<div className="flex">
						{testimonials.map((testimonial, index) => (
							<div
								key={index}
								className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4"
							>
								<div className="bg-primary-hover p-6 rounded-lg transform transition-all duration-500 hover:bg-primary-hover/95 backdrop-blur-sm mr-4">
									<blockquote className="text-gray-700 text-base md:text-lg mb-6 italic transition-all duration-300 hover:text-gray-900 relative">
										&ldquo;{testimonial?.fields.paragraph}&rdquo;
									</blockquote>
									<div className="flex items-center gap-4">
										<div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary-hover to-gray-200 flex items-center justify-center shadow-inner">
											<span className="text-base md:text-lg font-medium text-gray-700">
												{testimonial?.fields.name.charAt(0)}
											</span>
										</div>
										<div className="transform transition-all duration-300 hover:translate-x-2">
											<h3 className="font-semibold text-gray-800 text-sm md:text-base">
												{testimonial?.fields.name}
											</h3>
											<p className="text-gray-500 text-xs md:text-sm">
												{testimonial?.fields.role}
											</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<button
					onClick={scrollPrev}
					className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg transition-transform z-10"
					style={{ color: `var(--${colorVar})` }}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 19.5L8.25 12l7.5-7.5"
						/>
					</svg>
				</button>
				<button
					onClick={scrollNext}
					className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg transition-transform z-10"
					style={{
						color: `var(--${colorVar})`,
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M8.25 4.5l7.5 7.5-7.5 7.5"
						/>
					</svg>
				</button>
			</div>
			{cta && (
				<PrimaryButton href={cta?.fields?.linkTo} large={cta?.fields?.large}>
					{cta?.fields?.title}
				</PrimaryButton>
			)}
		</div>
	)
}
