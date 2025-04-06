import { Course } from '@/types/course'
import Image from 'next/image'
import { PrimaryButton } from '../PrimaryButton'
import { RichText } from '../RichText'

export function CourseCard({ course }: { course: Course }) {
	const {
		fields: {
			img,
			title,
			description,
			numberOfDays,
			maxAttendees,
			beneficiaries,
			price,
			groupPrice,
			slug,
		},
	} = course
	return (
		<div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-xl hover:shadow-2xl transition-all duration-300">
			{img && (
				<div className="relative w-full h-64 overflow-hidden">
					<Image
						src={'https:' + img.fields.file.url}
						alt={title}
						fill
						priority
						className="object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
					<div className="absolute bottom-0 left-0 right-0 p-4 flex flex-wrap gap-2 z-10">
						<div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium shadow-sm">
							<svg
								className="w-4 h-4 text-gray-700"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<span>
								{numberOfDays} {numberOfDays === 1 ? 'Day' : 'Days'}
							</span>
						</div>
						<div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium shadow-sm">
							<svg
								className="w-4 h-4 text-gray-700"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
							<span>Max {maxAttendees}</span>
						</div>
						<div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium shadow-sm">
							<svg
								className="w-4 h-4 text-gray-700"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								/>
							</svg>
							<span>{beneficiaries}</span>
						</div>
					</div>
				</div>
			)}
			<div className="p-6 space-y-3">
				<h3 className="text-3xl font-bold text-gray-900 line-clamp-2 tracking-tight">
					{title}
				</h3>

				<div className="prose prose-gray line-clamp-3">
					<RichText content={description} />
				</div>
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t border-gray-200">
					<div className="space-y-2">
						<span className="inline-block text-3xl font-bold text-gray-800">
							£{price}
						</span>
						<p className="text-base font-medium text-gray-700">
							Group Rate: £{groupPrice}
						</p>
					</div>
					<PrimaryButton
						href={`/academy/courses/${slug}`}
						className="w-full sm:w-auto"
					>
						View Details
					</PrimaryButton>
				</div>
			</div>
		</div>
	)
}
