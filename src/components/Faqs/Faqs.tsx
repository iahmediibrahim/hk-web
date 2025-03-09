'use client'

import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef, useState } from 'react'

interface FaqItem {
	question: string
	answer: string
}

export interface FaqsProps {
	heading?: string
	paragraph?: string
	questions?: FaqItem[]
	colorVar: string
}

export function Faqs({
	heading = 'FAQs',
	paragraph,
	questions,
	colorVar,
}: FaqsProps) {
	const [activeIndex, setActiveIndex] = useState<number | null>(null)
	const contentRefs = useRef<HTMLDivElement[] | null>([])

	const toggle = (index: number) => {
		setActiveIndex(activeIndex === index ? null : index)
	}

	const isActive = (index: number) => activeIndex === index

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
			</div>{' '}
			<div className="accordion space-y-4">
				{questions &&
					questions?.map((item, index) => (
						<div
							key={index}
							className="accordion-item rounded-lg overflow-hidden"
							style={{
								backgroundColor: `var(--${colorVar}-heroBanner)`,
							}}
						>
							<button
								className={`flex justify-between items-center w-full py-4 px-6 text-left text-white focus:outline-none cursor-pointer transition-all duration-300   text-base sm:text-lg md:text-xl
								${isActive(index) ? 'bg-blue-800/30' : ''}`}
								onClick={() => toggle(index)}
								style={{
									backgroundColor: isActive(index)
										? `var(--${colorVar}-heroBanner)`
										: `var(--${colorVar})`,
								}}
							>
								<span className="flex-1 pr-4">{item.question}</span>
								<div
									className={`transition-transform duration-300 flex-shrink-0 
									${isActive(index) ? 'rotate-180' : ''}`}
								>
									<FontAwesomeIcon icon={faAngleDown} className="w-5 h-5" />
								</div>
							</button>
							<div
								ref={(el: HTMLDivElement | null) => {
									if (contentRefs.current && el) contentRefs.current[index] = el
								}}
								className={`transition-all duration-500 ease-in-out 
								${isActive(index) ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
								style={{
									backgroundColor: `rgb(from var(--${colorVar}) r g b / 10%)`,
								}}
							>
								<p className="p-6 text-white text-sm sm:text-base leading-relaxed">
									{item.answer}
								</p>
							</div>
						</div>
					))}
			</div>
		</div>
	)
}
