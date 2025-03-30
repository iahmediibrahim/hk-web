'use client'
import { Job } from '@/lib/contentful'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { PrimaryButton } from '../PrimaryButton'

export const JobForm = ({ id, job }: { id: string; job: Job }) => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const commonClasses =
		'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50'
	const labelClasses = 'block text-sm font-medium text-gray-700 mb-1'
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
					<label htmlFor="firstName" className={labelClasses}>
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
					<label htmlFor="lastName" className={labelClasses}>
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
				<label htmlFor="email" className={labelClasses}>
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
				<label htmlFor="phone" className={labelClasses}>
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

			<div className="w-full">
				<div>
					<label htmlFor="cv" className={labelClasses}>
						Upload your CV
					</label>
					<input
						type="file"
						id="cv"
						name="cv"
						required
						accept=".pdf,.doc,.docx"
						className={`${commonClasses} file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100`}
					/>
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
