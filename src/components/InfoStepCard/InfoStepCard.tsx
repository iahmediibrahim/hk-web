'use client'

import { cardListProps } from '../InfoSection'

interface InfoStepCardProps {
	cardList: cardListProps[]
	colorVar?: string
}

export function InfoStepCard({ cardList, colorVar }: InfoStepCardProps) {
	return (
		<ul className="list-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 py-8">
			{cardList.map((item, index) => {
				const { stepNumber, title, paragraph } = item?.fields
				return (
					<li
						key={index}
						className="rounded-lg p-8 border-2 border-gray-300 shadow-md"
						style={{
							backgroundColor: colorVar
								? `var(--${colorVar}-heroBanner)`
								: 'transparent',
						}}
					>
						<div className="flex items-center gap-4 mb-4">
							<div className="text-[24px] font-bold">{stepNumber}</div>
							<h3
								className="text-2xl font-bold"
								style={{
									color: colorVar ? `var(--${colorVar})` : 'inherit',
								}}
							>
								{title}
							</h3>
						</div>
						<p className="text-white text-left font-bold">{paragraph}</p>
					</li>
				)
			})}
		</ul>
	)
}
