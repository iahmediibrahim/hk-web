'use client'
import { Job } from '@/lib/contentful'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { PrimaryButton } from '../PrimaryButton'

export const JobForm = ({ id, job }: { id: string; job: Job }) => {
	const [isSubmitting, setIsSubmitting] = useState(false)

	return (
		<form
			className="space-y-6"
			onSubmit={async (e) => {
				e.preventDefault()
				setIsSubmitting(true)
				const formData = new FormData(e.target as HTMLFormElement)

				// Add job details to form data
				formData.append('jobTitle', job.fields?.title)
				formData.append('jobId', job.fields?.slug)
				formData.append('jobLocation', job?.fields?.location?.formattedAddress)
				formData.append('jobType', `${id} job application`)

				try {
					const response = await fetch('/api/submit-application', {
						method: 'POST',
						body: formData,
					})

					if (!response.ok) {
						throw new Error('Failed to submit application')
					}

					toast.success('Application submitted successfully!')
					;(e.target as HTMLFormElement).reset()
				} catch (error) {
					console.error('Error submitting application:', error)
					toast.error('Failed to submit application. Please try again.')
				} finally {
					setIsSubmitting(false)
				}
			}}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label
						htmlFor="firstName"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						First Name
					</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						required
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50"
					/>
				</div>
				<div>
					<label
						htmlFor="lastName"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Last Name
					</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						required
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50"
					/>
				</div>
			</div>

			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Email Address
				</label>
				<input
					type="email"
					id="email"
					name="email"
					required
					className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50"
				/>
			</div>

			<div>
				<label
					htmlFor="phone"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Phone Number
				</label>
				<input
					type="tel"
					id="phone"
					name="phone"
					required
					className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50"
				/>
			</div>

			<div>
				<label
					htmlFor="cv"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Upload CV
				</label>
				<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
					<div className="space-y-1 text-center">
						<svg
							className="mx-auto h-12 w-12 text-gray-400"
							stroke="currentColor"
							fill="none"
							viewBox="0 0 48 48"
						>
							<path
								d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						<div className="flex text-sm text-gray-600">
							<label
								htmlFor="cv-upload"
								className="relative cursor-pointer rounded-md font-medium"
								style={{ color: `var(--${id})` }}
							>
								<span>Upload a file</span>
								<input
									id="cv-upload"
									name="cv"
									type="file"
									accept=".pdf,.doc,.docx"
									className="sr-only"
									required
								/>
							</label>
							<p className="pl-1">or drag and drop</p>
						</div>
						<p className="text-xs text-gray-500">PDF, DOC up to 10MB</p>
					</div>
				</div>
			</div>

			<div className="flex justify-end">
				<PrimaryButton
					type="submit"
					disabled={isSubmitting}
					style={{
						background: `var(--${id})`,
					}}
				>
					{isSubmitting ? 'Submitting...' : 'Submit Application'}
				</PrimaryButton>
			</div>
		</form>
	)
}
