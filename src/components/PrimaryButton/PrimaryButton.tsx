'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

interface PrimaryButtonProps {
	children: React.ReactNode
	className?: string
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
	href?: string
	type?: 'button' | 'submit' | 'reset'
	disabled?: boolean
	props?: unknown
	large?: boolean
	outlined?: boolean
}

export const PrimaryButton = ({
	children,
	className,
	onClick,
	href,
	type,
	disabled,
	large = true,
	outlined = false,
	...props
}: PrimaryButtonProps) => {
	const router = useRouter()
	const pathname = usePathname()
	let mainPage = pathname.split('/')[1]
	mainPage = mainPage === '' ? 'dark-grey' : mainPage
	const [isHovered, setIsHovered] = useState(false)

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (disabled) return
		if (onClick) onClick(e)
		if (href) router.push(href)
	}

	return (
		<div className="mt-auto">
			<button
				onClick={handleClick}
				className={`${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      	  ${large ? 'px-8 py-3' : 'px-6 py-2'} 
				ease-out duration-300 uppercase text-sm font-medium border rounded-full
				${outlined ? 'bg-transparent' : ''} 
				${className}`}
				onMouseEnter={() => {
					setIsHovered(true)
				}}
				onMouseLeave={() => {
					setIsHovered(false)
				}}
				style={{
					backgroundColor: outlined ? 'transparent' : `var(--${mainPage})`,
					borderColor: outlined
						? isHovered
							? 'rgba(79, 79, 79, 0.2)'
							: `var(--${mainPage})`
						: isHovered
						? `var(--${mainPage})`
						: '#fff',
					color: outlined ? `var(--${mainPage})` : '#fff',
					boxShadow: isHovered ? `0 0 0 3px rgba(255, 255, 255, 0.2)` : 'none',
				}}
				type={type}
				{...props}
			>
				{children}
			</button>
		</div>
	)
}
