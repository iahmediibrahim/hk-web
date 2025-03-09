'use client'
import Image, { ImageLoader, ImageProps } from 'next/image'

const contentfulLoader: ImageLoader = ({
	src,
	width,
	quality,
}: {
	src: string
	width: number
	quality?: number
}): string => {
	return `${src}?w=${width}&q=${quality || 75}`
}

export const ContentfulImage = (props: ImageProps) => {
	return (
		<Image
			loader={contentfulLoader}
			sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
			priority={props.priority}
			{...props}
		/>
	)
}
