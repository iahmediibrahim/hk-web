import { CardWithIcon } from '../CardWithIcon'

export interface WhyUsSectionProps {
	title: string
	paragraph: string
	whyUs?: Array<{
		fields: {
			heading: string
			paragraph: string
			iconId: string
		}
	}>
	colorVar: string
}

export function WhyUsSection({
	title,
	paragraph,
	colorVar,
	whyUs,
}: WhyUsSectionProps) {
	return (
		<div id="why-us" className="container mx-auto px-4  py-12">
			<div className="flex flex-col md:flex-row justify-between items-center gap-8 text-black">
				<div className="w-full md:w-[45%] space-y-6">
					<div className="w-full my-6 md:my-10">
						<p
							style={{ color: `var(--${colorVar})` }}
							className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight md:leading-[3.5rem]"
						>
							{title}
						</p>
					</div>
					<div>
						<p className="text-base sm:text-lg md:text-2xl mb-6 md:mb-8">
							{paragraph}
						</p>
					</div>
				</div>
			</div>

			{whyUs && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 my-8 md:my-10 mx-2 sm:mx-4 md:mx-6 lg:mx-8">
					{whyUs.map((item, index) => (
						<div key={index} className="flex justify-center">
							<CardWithIcon {...item.fields} colorVar={colorVar} />
						</div>
					))}
				</div>
			)}
		</div>
	)
}
