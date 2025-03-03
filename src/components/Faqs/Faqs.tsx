'use client'

import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef, useState } from 'react'

interface FaqItem {
	question: string
	answer: string
}

interface FaqsProps {
	heading?: string
	paragraph?: string
	questionItems?: FaqItem[]
	colorVar: string
}

export default function Faqs({
	heading,
	paragraph,
	questionItems,
	colorVar,
}: FaqsProps) {
	const [activeIndex, setActiveIndex] = useState<number | null>(null)
	const contentRefs = useRef<HTMLDivElement[] | null>([])

	const defaultItems: FaqItem[] = [
		{
			question: 'How long will the apprenticeship last?',
			answer:
				'There are 18 days of training across the course, 9 of those will take place at the start of the programme in a recommended 3 days per week for 3 weeks pattern. The remaining 9 sessions will be delivered within school breaks and holidays to keep the learners in the classroom as much as possible.',
		},
		{
			question: 'Do I need to pay NI for apprentices?',
			answer: 'Answer for this question.',
		},
		{
			question: 'What will be the salary costs for the apprentice?',
			answer: 'Answer for this question.',
		},
		{
			question: 'How much time will my learner need each week?',
			answer: 'Answer for this question.',
		},
		{
			question: 'How much time am I expected to give as a manager?',
			answer: 'Answer for this question.',
		},
	]

	const items = questionItems || defaultItems

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
				{items.map((item, index) => (
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
