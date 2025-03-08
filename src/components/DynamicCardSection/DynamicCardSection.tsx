'use client'
import { Carousel } from '../Carousel'
import { CardProps, HomeCard } from '../HomeCard'

export interface DynamicCardSectionProps {
	title: string
	items?: CardProps[]
	colorVar: string
}

export function DynamicCardSection({
	title,
	colorVar,
	items,
}: DynamicCardSectionProps) {
	const shouldUseCarousel = items && items.length > 3
	return (
		<div id="about" className="container mx-auto px-4 py-12">
			<div className="w-full md:w-[45%] space-y-6">
				<div className="w-full my-6 md:my-10">
					<h2
						style={{ color: `var(--${colorVar})` }}
						className="font-black text-3xl sm:text-4xl md:text-5xl leading-tight md:leading-[3.5rem]"
					>
						{title}
					</h2>
				</div>
			</div>
			{shouldUseCarousel ? (
				<Carousel colorVar={colorVar}>
					{items?.map((item, index) => {
						const { fields } = item
						return (
							<div
								className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%]  px-4 pb-20 pt-4"
								key={index}
							>
								<HomeCard {...fields} />
							</div>
						)
					})}
				</Carousel>
			) : (
				<div
					className={`grid grid-cols-1 gap-8 mx-4 ${
						items && items.length > 2 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
					}`}
				>
					{items?.map((item, index) => {
						const { fields } = item
						return <HomeCard key={index} {...fields} />
					})}
				</div>
			)}
		</div>
	)
}
