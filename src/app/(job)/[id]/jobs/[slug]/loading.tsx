import { Skeleton } from '@/components'

export default function Loading() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
			<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
				<article className="max-w-4xl mx-auto">
					<Skeleton />
				</article>
			</div>
		</div>
	)
}
