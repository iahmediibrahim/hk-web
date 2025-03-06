'use client'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'

export const Carousel = ({
	children,
	colorVar,
}: {
	children: React.ReactNode
	colorVar: string
}) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: true,
		dragFree: true,
		containScroll: 'trimSnaps',
	})

	const [prevDisabled, setPrevDisabled] = useState(true)
	const [nextDisabled, setNextDisabled] = useState(true)

	useEffect(() => {
		if (!emblaApi) return

		const onSelect = () => {
			setPrevDisabled(!emblaApi.canScrollPrev())
			setNextDisabled(!emblaApi.canScrollNext())
		}

		emblaApi.on('select', onSelect)
		emblaApi.on('reInit', onSelect)

		// Initial check
		onSelect()

		return () => {
			emblaApi.off('select', onSelect)
			emblaApi.off('reInit', onSelect)
		}
	}, [emblaApi])

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev()
	}, [emblaApi])

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext()
	}, [emblaApi])

	return (
		<div className="relative">
			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex">{children}</div>
			</div>

			<button
				onClick={scrollPrev}
				className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg transition-transform z-10"
				style={{
					color: `var(--${colorVar})`,
					opacity: prevDisabled ? 0.5 : 1,
					cursor: prevDisabled ? 'not-allowed' : 'pointer',
				}}
				disabled={prevDisabled}
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
					opacity: nextDisabled ? 0.5 : 1,
					cursor: nextDisabled ? 'not-allowed' : 'pointer',
				}}
				disabled={nextDisabled}
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
	)
}
