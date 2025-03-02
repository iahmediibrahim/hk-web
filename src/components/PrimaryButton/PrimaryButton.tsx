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
	props?: any
	large?: boolean
}
export const PrimaryButton = ({
	children,
	className,
	onClick,
	href,
	type,
	disabled,
	large = true,
	...props
}: PrimaryButtonProps) => {
	const router = useRouter()
	const pathname = usePathname()
	const mainPage = pathname.split('/')[1]
	const [isHovered, setIsHovered] = useState(false)
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (disabled) return
		if (onClick) onClick(e)
		if (href) router.push(href)
	}

	return (
		<div className="mt-10">
			<button
				onClick={handleClick}
				className={`${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      	  ${
						large ? 'px-8 py-3' : 'px-6 py-2'
					} ease-out duration-300 uppercase text-sm font-medium border text-white rounded-full  ${className}`}
				onMouseEnter={() => {
					setIsHovered(true)
				}}
				onMouseLeave={() => {
					setIsHovered(false)
				}}
				style={{
					backgroundColor: `var(--${mainPage})`,
					borderColor: isHovered ? `var(--${mainPage})` : `#fff`,
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
