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
	bgWhite?: boolean
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
	bgWhite = false,
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
		<button
			onClick={handleClick}
			className={`
          ${
						disabled
							? 'opacity-50 cursor-not-allowed'
							: 'hover:transform hover:scale-105'
					} 
          ${large ? 'px-8 py-3 text-base' : 'px-5 py-2 text-sm'} 
          relative overflow-hidden  font-normal transform-gpu shadow-lg
          ease-out duration-300 
          uppercase  
          border-2 rounded-xl
          flex items-center justify-center gap-2
          ${outlined ? 'bg-transparent' : ''} 
          ${className}
        `}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{
				backgroundColor: outlined
					? 'transparent'
					: bgWhite
					? '#fff'
					: `var(--${mainPage})`,
				borderColor: outlined
					? isHovered
						? 'rgba(79, 79, 79, 0.2)'
						: `var(--${mainPage})`
					: isHovered
					? `var(--${mainPage})`
					: '#fff',
				color: outlined ? `var(--${mainPage})` : bgWhite ? '#000' : '#fff',
				boxShadow: isHovered
					? `0 0 20px rgba(var(--${mainPage}-rgb), 0.3), 
               0 6px 12px rgba(0, 0, 0, 0.2)`
					: `0 4px 6px rgba(0, 0, 0, 0.1)`,
				transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
			}}
			type={type}
			{...props}
		>
			<span className="relative z-10">{children}</span>
			<span
				className="absolute inset-0 bg-black/5 transform origin-left transition-transform duration-300 ease-out"
				style={{
					transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
				}}
			/>
		</button>
	)
}
