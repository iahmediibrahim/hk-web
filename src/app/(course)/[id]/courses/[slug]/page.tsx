import { NotFound } from '@/components'
import { CourseContent } from '@/components/CoursesList/CourseContent'
import { RichText } from '@/components/RichText'
import { client } from '@/lib/contentful'
import { Course } from '@/types/course'
import { Text } from '@contentful/rich-text-types'
import { Metadata } from 'next'
import Image from 'next/image'

async function getCourse({ slug }: { slug: string }) {
	try {
		const response = await client.getEntries({
			content_type: 'course',
			'fields.slug': slug,
		})

		if (!response?.items?.length) {
			return null
		}

		return response.items[0] as unknown as Course
	} catch (error) {
		console.error('Error fetching post:', error)
		return null
	}
}

export async function generateMetadata({
	params,
}: {
	params: { slug: string }
}): Promise<Metadata> {
	const course = await getCourse({ slug: params.slug })

	if (!course) {
		return {
			title: 'Course Not Found',
		}
	}

	return {
		title: course.fields.title,
		description:
			course?.fields.description.content[0].content[0]?.nodeType === 'text'
				? (course?.fields.description.content[0].content[0] as Text).value
				: '',
	}
}

export default async function Post({
	params,
}: {
	params: Promise<{ id: string; slug: string }>
}) {
	const { id, slug } = await params
	const course = await getCourse({ slug })

	if (!course) {
		return <NotFound id={id} title="Course" />
	}

	const {
		fields: {
			title,
			description,
			numberOfDays,
			maxAttendees,
			beneficiaries,
			price,
			groupPrice,
			content,
			img,
		},
	} = course

	return (
		<main className="container mx-auto px-4 py-8 sm:py-16 max-w-7xl">
			<div className="flex flex-col items-center space-y-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 w-full">
					<div className="relative w-full h-[400px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
						<h1 className="absolute bottom-8 left-8 text-4xl sm:text-5xl lg:text-6xl font-bold text-white z-20 max-w-[80%] leading-tight">
							{title}
						</h1>
						<Image
							src={'https:' + img.fields.file.url}
							alt={title}
							fill
							priority
							className="object-cover transition-transform duration-500"
						/>
					</div>

					{/* About section */}
					<div className="prose prose-lg max-w-none lg:pt-8">
						<h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-gray-800">
							About this Course
						</h2>
						<div className="text-gray-600">
							<RichText content={description} />
						</div>
					</div>
				</div>

				<div className="bg-white/95 backdrop-blur-sm rounded-3xl p-4 sm:p-8 shadow-2xl border border-gray-100/30 w-full hover:shadow-3xl transition-shadow duration-300">
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
						<div className="flex items-center gap-3 group p-3 rounded-2xl hover:bg-gray-50 transition-colors">
							<div className="p-3 rounded-full bg-primary/15 group-hover:bg-primary/25 transition-colors">
								<svg
									className="w-6 h-6 sm:w-7 sm:h-7 text-primary"
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
							</div>
							<div className="flex flex-col">
								<span className="text-sm text-gray-500">Duration</span>
								<span className="text-base sm:text-lg font-semibold">
									{numberOfDays} {numberOfDays === 1 ? 'Day' : 'Days'}
								</span>
							</div>
						</div>
						<div className="flex items-center gap-3 group p-3 rounded-2xl hover:bg-gray-50 transition-colors">
							<div className="p-3 rounded-full bg-primary/15 group-hover:bg-primary/25 transition-colors">
								<svg
									className="w-6 h-6 sm:w-7 sm:h-7 text-primary"
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
							</div>
							<div className="flex flex-col">
								<span className="text-sm text-gray-500">Class Size</span>
								<span className="text-base sm:text-lg font-semibold">
									Max {maxAttendees} attendees
								</span>
							</div>
						</div>
						<div className="flex items-center gap-3 group p-3 rounded-2xl hover:bg-gray-50 transition-colors">
							<div className="p-3 rounded-full bg-primary/15 group-hover:bg-primary/25 transition-colors">
								<svg
									className="w-6 h-6 sm:w-7 sm:h-7 text-primary"
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
							</div>
							<div className="flex flex-col">
								<span className="text-sm text-gray-500">For</span>
								<span className="text-base sm:text-lg font-semibold">
									{beneficiaries}
								</span>
							</div>
						</div>
						<div className="flex items-center gap-3 group p-3 rounded-2xl hover:bg-gray-50 transition-colors">
							<div className="p-3 rounded-full bg-primary/15 group-hover:bg-primary/25 transition-colors">
								<svg
									className="w-6 h-6 sm:w-7 sm:h-7 text-primary"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<div className="flex flex-col">
								<span className="text-sm text-gray-500">Price</span>
								<span className="text-base sm:text-lg font-semibold">
									Individual: £{price} / Group: £{groupPrice} up to 12 persons
									+mileage to external venue
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Course content section */}
				<div className="w-full rounded-3xl p-0 sm:p-6">
					<CourseContent content={content} />
				</div>
				<div className="w-full text-center text-gray-600 italic">
					Ps. The course need to fill at least 6 seats start.
				</div>
				<div className="w-full text-center">
					<p className="text-lg text-gray-700 font-medium">
						Interested in this course? Please{' '}
						<a
							href="/academy/academy-contact"
							className="text-primary hover:text-primary/80 underline"
						>
							contact us
						</a>{' '}
						to discuss your requirements and make a purchase.
					</p>
				</div>

				{/* <div className="w-full">
					<CartProvider>
						<BookingForm
							courseId={slug}
							prices={{
								personal: price,
								group: groupPrice,
							}}
							maxAttendees={maxAttendees}
						/>
					</CartProvider>
				</div> */}
			</div>
		</main>
	)
}
