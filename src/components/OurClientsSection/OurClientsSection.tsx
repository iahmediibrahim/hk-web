import { ContentfulImage } from '@/lib/contentful'
import Image from 'next/image'

export interface OurClientsSectionProps {
	title: string
	paragraph: string
	colorVar: string
	clients: ContentfulImage[]
}

export function OurClientsSection({
	title,
	paragraph,
	colorVar,
	clients,
}: OurClientsSectionProps) {
	return (
		<div id="our-clients" className="container mx-auto px-4  py-12">
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

			<div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-8">
				{clients.map((image, index) => (
					<div key={index} className="flex items-center justify-center p-4">
						<div className="w-80 h-44 flex items-center justify-center transition-transform duration-300 hover:scale-110">
							<Image
								className="w-full h-full object-contain"
								src={'https:' + image.fields.file.url}
								alt={image.fields.file.fileName}
								sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
								width={320}
								height={176}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
