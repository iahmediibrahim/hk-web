'use client'

import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { cardListProps } from '../InfoSection'
import { PrimaryButton } from '../PrimaryButton'

interface InfoStepCardProps {
	cardList: cardListProps[]
	tabs?: string[]
	colorVar?: string
	textBg?: boolean
}

export function InfoStepCard({
	cardList,
	tabs,
	colorVar,
	textBg,
}: InfoStepCardProps) {
	const [activeTab, setActiveTab] = useState(tabs?.[0] || '')
	const filteredCards = tabs
		? cardList.filter((item) => item.fields.type === activeTab)
		: cardList
	const cardStyle = {
		backgroundColor: textBg ? `var(--${colorVar})` : 'rgba(255, 255, 255, 0.8)',
		backdropFilter: 'blur(12px)',
		borderWidth: '1px',
		borderStyle: 'solid',
		borderColor: textBg
			? 'rgba(255, 255, 255, 0.2)'
			: colorVar
			? `var(--${colorVar})`
			: 'rgba(209, 213, 219, 0.3)',
		boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
		transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
	}

	return (
		<div className="container mx-auto px-4">
			{tabs && (
				<div className="flex justify-center gap-4 mb-8">
					{tabs.map((tab, index) => (
						<PrimaryButton
							key={index}
							outlined={activeTab === tab ? false : true}
							onClick={() => setActiveTab(tab)}
						>
							{tab}
						</PrimaryButton>
					))}
				</div>
			)}
			<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
				{filteredCards.map((item, index) => {
					const { stepNumber, title, paragraph, linkTo } = item?.fields
					return (
						<li
							key={index}
							className="rounded-xl p-6 cursor-pointer transform transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-lg"
							style={cardStyle}
							onClick={() => {
								if (!linkTo) return
								window.location.href = linkTo
							}}
						>
							<div className="flex items-center gap-4 mb-4">
								<div
									className="text-3xl font-bold bg-opacity-10 rounded-full w-12 h-12 flex items-center justify-center"
									style={{
										backgroundColor: textBg
											? 'rgba(255, 255, 255, 0.1)'
											: `rgb(from var(--${colorVar}) r g b / 10%)`,

										color: textBg
											? 'white'
											: colorVar
											? `var(--${colorVar})`
											: 'inherit',
									}}
								>
									{stepNumber}
								</div>
								<h3
									className="text-xl font-bold tracking-tight"
									style={{
										color: textBg
											? 'white'
											: colorVar
											? `var(--${colorVar})`
											: 'inherit',
									}}
								>
									{title}
								</h3>
							</div>
							<p
								className={`text-left text-base leading-relaxed ${
									textBg ? 'text-white text-opacity-90' : 'text-gray-600'
								}`}
							>
								{paragraph}
							</p>
							{linkTo && (
								<div
									className="mt-6 flex justify-end group"
									style={{
										color: textBg ? 'white' : `var(--${colorVar})`,
									}}
								>
									<FontAwesomeIcon
										icon={faChevronRight}
										className="transform transition-transform duration-300 group-hover:translate-x-1"
									/>
								</div>
							)}
						</li>
					)
				})}
			</ul>
		</div>
	)
}
