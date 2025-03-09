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
			<div className="text-left mb-16">
				<h2
					className="font-black text-3xl sm:text-4xl md:text-5xl leading-tight md:leading-[3.5rem]"
					style={{
						color: `var(--${colorVar})`,
					}}
				>
					{heading}
				</h2>
				<p className="text-gray-600 max-w-3xl text-lg leading-relaxed">
					{paragraph}
				</p>
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
							} px-4 pb-20 pt-4`}
						>
							<div className="bg-white/80 p-4 md:p-8 rounded-2xl shadow-lg transform transition-all duration-500 hover:shadow-2xl hover:scale-105 backdrop-blur-lg h-full flex flex-col">
								<blockquote className="text-gray-700 text-lg md:text-xl mb-8">
									{testimonial?.fields?.paragraph}
								</blockquote>
								<div className="flex items-center gap-5 mt-auto">
									{/* <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center shadow-lg">
									<span className="text-lg md:text-xl font-medium text-black">
										{testimonial?.fields.name.charAt(0)}
									</span>
								</div> */}
									<div className="transform transition-all duration-300">
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
				<div className="mt-16 flex md:block justify-center text-center">
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
