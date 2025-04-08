import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'

import { Loader } from '@/components'
import '@/lib/fontawesome'
import './globals.css'
import Renderer from './Renderer'

export const metadata: Metadata = {
	title: 'Holden Knight Group, Synergy in numbers.',
	description:
		'Holden Knight Group, A platform of funding and expertise to help entrepreneurs achieve their dreams.',
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body>
				<Suspense fallback={<Loader />}>
					<Renderer>{children}</Renderer>
				</Suspense>
				<Toaster position="top-right" />
			</body>
		</html>
	)
}

// // Artificial delay component to test Suspense
// async function SlowComponent({ children }: { children: React.ReactNode }) {
// 	await new Promise((resolve) => setTimeout(resolve, 3000)) // 3 second delay
// 	return <>{children}</>
// }
