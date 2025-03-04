'use client'

import Image from 'next/image'

interface OurClientsSectionProps {
	heading: string
	paragraph: string
	slug: string
	images: {
		src: string
		alt?: string
	}[]
}

export function OurClientsSection({
	heading,
	paragraph,
	slug,
	images,
}: OurClientsSectionProps) {
	return (
		<div className="container mx-auto px-4 py-12">
			<div className="text-left mb-12">
				<h2
					className="text-4xl font-bold mb-4"
					style={{
						color: `var(--${slug})`,
					}}
				>
					{heading}
				</h2>
				<p className="text-gray-600 max-w-2xl">{paragraph}</p>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
				{images.map((image, index) => (
					<div key={index} className="flex items-center justify-center p-4">
						<div className="w-32 h-32 flex items-center justify-center">
							<Image
								className="w-full h-full object-contain"
								src={image.src}
								alt={image.alt || 'Client logo'}
								width={128}
								height={128}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
