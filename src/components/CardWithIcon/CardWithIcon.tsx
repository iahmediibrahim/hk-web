'use client'

import Image from 'next/image'
import { useState } from 'react'

interface CardProps {
	card: {
		icon: string
		heading: string
		paragraph?: string
	}
}

export function CardWithIcon({ card }: CardProps) {
	const [showContent, setShowContent] = useState(false)

	const handleCardClick = () => {
		setShowContent(!showContent)
	}

	return (
		<div
			className={` w-full flex flex-wrap justify-center`}
			onClick={handleCardClick}
		>
			<div className="w-full text-center my-2 flex justify-center">
				<div className="w-24">
					<Image
						className="w-full"
						src={card.icon}
						alt=""
						width={96}
						height={96}
					/>
				</div>
			</div>
			<h2 className="mt-4 mb-3 text-xl w-full text-center">{card.heading}</h2>
			<p className="text-md text-center">{card.paragraph}</p>
		</div>
	)
}
