'use client'

import secondEducator from '@/assets/images/education/secondEducator.png'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface CardProps {
	style?: React.CSSProperties
	classNames?: string
	card?: {
		withNotClick?: boolean
		img?: string
		card?: string
		title?: string
		withHtml?: boolean
		role?: string
		location?: string
		btnColor?: string
		content?: string
		hideContentLength?: number
		sub_title?: string
		forLatest?: boolean
		body?: boolean
		linkpath?: string
		forNextStep?: boolean
		linkText?: string
		withTarget?: boolean
		secondLinkpath?: string
		id?: string
		secondLinkText?: string
	}
	withNotClick?: boolean
	btnColor?: string
	btnLink?: string
}

const HomeCard: React.FC<CardProps> = ({
	style,
	classNames,
	card,
	btnColor,
	btnLink,
}) => {
	const [showContent, setShowContent] = useState(false)

	if (!card) return null

	return (
		<div
			style={style}
			className={`${classNames} ease-out duration-300 flex flex-wrap h-full items-between`}
			onClick={() => setShowContent(!showContent)}
		>
			<div className={`w-full ${card?.withNotClick ? 'md:h-[45%]' : ''}`}>
				<Image
					src={card?.img || card?.card || secondEducator}
					alt=""
					className="h-full w-full object-cover object-center"
					width={500}
					height={300}
				/>
			</div>
			<div
				className={`w-full px-4 py-4 flex flex-wrap ${
					card?.withNotClick ? 'md:h-[55%] items-start' : 'items-end'
				}`}
			>
				{card?.withHtml ? (
					<div className="text-[1.45rem] w-full">
						<p dangerouslySetInnerHTML={{ __html: card?.title || '' }} />
					</div>
				) : (
					<div className="text-[1.45rem] w-full">{card?.title}</div>
				)}

				{(card?.role || card?.location) && (
					<div className="w-full" style={{ color: card?.btnColor }}>
						<div className="text-sm font-bold my-3">{card?.role}</div>
						<div className="text-sm font-thin">
							<span className="me-2 text-xs">
								<i className="fa-solid fa-location-dot"></i>
							</span>
							{card.location}
						</div>
					</div>
				)}

				{card?.content && card.hideContentLength && (
					<p className="mt-4 text-md w-full">
						{card?.content?.substring(
							0,
							showContent ? card.content.length : card.hideContentLength,
						)}
						<span>{showContent ? '' : '...'}</span>
					</p>
				)}

				{card?.content && card?.withNotClick && (
					<p className="mt-4 text-md w-full">{card.content}</p>
				)}

				{card?.sub_title && (
					<div className="flex mt-4 text-md w-full">
						<p
							dangerouslySetInnerHTML={{
								__html: card?.sub_title?.substring(
									0,
									showContent ? card.sub_title.length : 70,
								),
							}}
						/>
						<span>{showContent ? '' : '...'}</span>
					</div>
				)}

				<div
					className={`w-full flex self-end ${
						card?.forLatest || card?.body ? 'justify-end' : 'justify-between'
					}`}
				>
					{card?.linkpath && !card?.forLatest && (
						<div className="flex items-center mt-7 rounded">
							<Link
								href={card?.linkpath}
								target={card?.withTarget ? '_blank' : undefined}
								className="text-sm tracking-widest uppercase ease-out duration-300 block p-2"
								style={{ color: card?.btnColor }}
							>
								{card?.forNextStep ? (
									<span className="me-2">
										<i className="fas fa-angle-left"></i>
									</span>
								) : (
									<span className="me-2">
										<i className="fas fa-search"></i>
									</span>
								)}
								{card?.linkText}
							</Link>
						</div>
					)}

					<div className="flex items-center mt-7 rounded">
						<Link
							href={
								btnLink ||
								card?.secondLinkpath ||
								`/education/blog/show-blog/${card?.id}`
							}
							className="text-sm tracking-widest uppercase ease-out duration-300 block p-2"
							style={{
								color: btnColor || card?.btnColor || '#FFB713',
							}}
						>
							{card?.secondLinkText || 'read more'}
							<span className="ms-2">
								<i className="fas fa-angle-right"></i>
							</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HomeCard
