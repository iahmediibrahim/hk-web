'use client'
import { CTA } from '@/lib/contentful'
import { usePathname } from 'next/navigation'
import { Carousel } from '../Carousel'
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
	const pathname = usePathname()

	return (
		<div className="container mx-auto px-6 py-24">
			<div className="text-center mb-16">
				<h2
					className="font-black text-3xl sm:text-4xl md:text-5xl leading-tight md:leading-[3.5rem]"
					style={{
						color: `var(--${colorVar})`,
					}}
				>
					{heading}
				</h2>
				<p className="text-gray-600   text-lg leading-relaxed">{paragraph}</p>
			</div>
			<Carousel colorVar={colorVar}>
				{testimonials &&
					testimonials?.map((testimonial, index) => (
						<div
							key={index}
							className={`flex-[0_0_100%] min-w-0 ${
								testimonials.length === 1
									? 'mx-auto md:flex-[0_0_50%]'
									: 'md:flex-[0_0_50%]'
							} px-4 pb-20 pt-4 `}
						>
							<div className="bg-slate-50 p-4 md:p-8 rounded-2xl shadow-lg transform transition-all duration-500 hover:shadow-2xl hover:scale-105 backdrop-blur-lg h-full grid grid-rows-[auto_1fr_auto]">
								<div className="flex justify-center">
									<svg
										className="w-12 h-12 text-gray-400"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
									</svg>
								</div>
								<div className="flex flex-col justify-center">
									<blockquote className="text-gray-700 text-lg md:text-xl mb-8 text-center">
										{testimonial?.fields?.paragraph}
									</blockquote>
								</div>
								<div className="flex items-center justify-center">
									<div className="transform transition-all duration-300 text-center">
										<h3 className="font-semibold text-gray-900 text-base md:text-lg mb-1">
											{testimonial?.fields?.name}
										</h3>
										<p className="text-gray-500 text-sm md:text-base">
											{testimonial?.fields?.role}
										</p>
									</div>
								</div>
							</div>
						</div>
					))}
			</Carousel>
			{cta && !pathname.includes('testimonials') && (
				<div className="mt-16 flex justify-center text-center">
					<PrimaryButton
						href={cta?.fields?.linkTo}
						large={cta?.fields?.large}
						outlined={cta?.fields?.outlined}
						className="shadow-lg hover:shadow-xl transition-shadow duration-300"
					>
						{cta?.fields?.title}
					</PrimaryButton>
				</div>
			)}
		</div>
	)
}
