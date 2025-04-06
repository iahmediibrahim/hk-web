import { GoogleMapComp, JobForm, NotFound } from '@/components'
import { RichText } from '@/components/RichText'
import { client, Job } from '@/lib/contentful'

async function getJob({ slug }: { slug: string }) {
	try {
		const response = await client.getEntries({
			content_type: 'job',
			'fields.slug': slug,
		})

		if (!response?.items?.length) {
			return null
		}

		return response.items[0] as unknown as Job
	} catch (error) {
		console.error('Error fetching post:', error)
		return null
	}
}

export default async function Post({
	params,
}: {
	params: Promise<{ id: string; slug: string }>
}) {
	const { id, slug } = await params
	const job = await getJob({ slug })
	if (!job || job?.fields?.id !== id) {
		return <NotFound id={id} title="Job" />
	}

	const {
		fields: {
			title,
			description,
			requirements,
			rewards,
			location,
			salary,
			category,
			permanent,
		},
	} = job
	console.log(permanent)
	return (
		<article className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
				<header className="mb-8 sm:mb-16 bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
						<h1
							className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-0"
							style={{
								color: `var(--${id})`,
							}}
						>
							{title}
						</h1>
						<div className="flex items-center flex-wrap gap-2 sm:gap-3">
							<span
								className="px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full text-white shadow-sm"
								style={{
									background: `var(--${id})`,
								}}
							>
								{category.name}
							</span>
							<span
								className={`px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full text-white shadow-sm ${
									permanent ? 'bg-emerald-600' : 'bg-amber-500'
								}`}
							>
								{permanent ? 'Permanent' : 'Temporary'}
							</span>
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
						<div className="flex items-center gap-2 sm:gap-3 bg-slate-50 p-3 sm:p-4 rounded-xl">
							<svg
								className="w-5 h-5 sm:w-6 sm:h-6"
								style={{
									color: `var(--${id})`,
								}}
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
							<span className="text-sm sm:text-base text-slate-700">
								{location.formattedAddress}
							</span>
						</div>
						<div className="flex items-center gap-2 sm:gap-3 bg-slate-50 p-3 sm:p-4 rounded-xl">
							<svg
								className="w-5 h-5 sm:w-6 sm:h-6"
								style={{
									color: `var(--${id})`,
								}}
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
							<span className="text-sm sm:text-base text-slate-700">
								{salary.code}
								{salary.unitFrom}-{salary.unit} {salary.type}
							</span>
						</div>
					</div>
				</header>

				<div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm mb-8 sm:mb-12">
					<h2
						className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6"
						style={{
							color: `var(--${id})`,
						}}
					>
						Description
					</h2>
					<RichText content={description} />
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
					{requirements && (
						<div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
							<h2
								className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6"
								style={{
									color: `var(--${id})`,
								}}
							>
								Requirements
							</h2>
							<ul className="space-y-3 sm:space-y-4">
								{requirements?.map((req, index) => (
									<li
										key={index}
										className="flex items-start gap-2 sm:gap-3 bg-slate-50 p-3 sm:p-4 rounded-xl"
									>
										<svg
											className="w-5 h-5 sm:w-6 sm:h-6 mt-1 flex-shrink-0"
											style={{
												color: `var(--${id})`,
											}}
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M5 13l4 4L19 7"
											/>
										</svg>
										<span className="text-sm sm:text-base text-slate-700">
											{req.description}
										</span>
									</li>
								))}
							</ul>
						</div>
					)}
					{rewards && (
						<div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
							<h2
								className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6"
								style={{
									color: `var(--${id})`,
								}}
							>
								Benefits
							</h2>
							<ul className="space-y-3 sm:space-y-4">
								{rewards?.map((reward, index) => (
									<li
										key={index}
										className="flex items-start gap-2 sm:gap-3 bg-slate-50 p-3 sm:p-4 rounded-xl"
									>
										<svg
											className="w-5 h-5 sm:w-6 sm:h-6 mt-1 flex-shrink-0"
											style={{
												color: `var(--${id})`,
											}}
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
										<span className="text-sm sm:text-base text-slate-700">
											{reward.description}
										</span>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>

				<GoogleMapComp location={location} />

				<div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
					<h2
						className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6"
						style={{ color: `var(--${id})` }}
					>
						Apply Now
					</h2>
					<JobForm id={id} job={job} />
				</div>
			</div>
		</article>
	)
}
