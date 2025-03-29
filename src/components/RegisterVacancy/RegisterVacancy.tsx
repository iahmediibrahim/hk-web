'use client'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { PrimaryButton } from '../PrimaryButton'

export const RegisterVacancy = ({ formId }: { formId: string }) => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [privacyChecked, setPrivacyChecked] = useState(false)
	const [isAgreementChecked, setIsAgreementChecked] = useState(false)
	const isEducation = formId.includes('education')

	// Update the handleSubmit function
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsSubmitting(true)
		const formData = new FormData(e.target as HTMLFormElement)
		formData.append(
			'contactType',
			`${formId.split('-').join(' ')} registration`,
		)
		if (!isEducation) {
			;[
				'schoolName',
				'schoolAddress',
				'schoolEmail',
				'schoolPhone',
				'postalCode',
			].forEach((field) => {
				formData.delete(field)
			})
		}

		try {
			const response = await fetch('/api/register-vacancy', {
				method: 'POST',
				body: formData,
			})

			if (!response.ok) {
				throw new Error('Failed to register vacancy')
			}

			toast.success('Vacancy registered successfully!')
			;(e.target as HTMLFormElement).reset()
		} catch (error) {
			console.error('Error registering vacancy:', error)
			toast.error('Failed to register vacancy. Please try again.')
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form className="space-y-8" onSubmit={handleSubmit}>
			{/* Contact Person Details */}
			<div>
				<h3 className="text-lg font-semibold text-gray-900 mb-4">
					Contact Person Details
				</h3>
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

				<div className="space-y-6 mt-6">
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
				</div>
			</div>

			{/* School Details */}
			{isEducation && (
				<div>
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						School Details
					</h3>
					<div className="space-y-6">
						<div>
							<label
								htmlFor="schoolName"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								School Name
							</label>
							<input
								type="text"
								id="schoolName"
								name="schoolName"
								required
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50"
							/>
						</div>
						<div>
							<label
								htmlFor="schoolAddress"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								School Address
							</label>
							<input
								type="text"
								id="schoolAddress"
								name="schoolAddress"
								required
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50"
							/>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label
									htmlFor="schoolEmail"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									School Email
								</label>
								<input
									type="email"
									id="schoolEmail"
									name="schoolEmail"
									required
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50"
								/>
							</div>
							<div>
								<label
									htmlFor="schoolPhone"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									School Phone
								</label>
								<input
									type="tel"
									id="schoolPhone"
									name="schoolPhone"
									required
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50"
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="postalCode"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Postal Code
							</label>
							<input
								type="text"
								id="postalCode"
								name="postalCode"
								required
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50"
							/>
						</div>
					</div>
				</div>
			)}

			{/* Vacancy Details */}
			<div>
				<h3 className="text-lg font-semibold text-gray-900 mb-4">
					Vacancy Details
				</h3>
				<div className="space-y-6">
					<div>
						<label
							htmlFor="vacancyDetails"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Vacancy Description
						</label>
						<textarea
							id="vacancyDetails"
							name="vacancyDetails"
							required
							rows={4}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 resize-none"
							placeholder="Please provide details about the vacancy..."
						/>
					</div>
					<div>
						<label
							htmlFor="jobSpec"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Upload Job Specification
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
										htmlFor="jobSpec-upload"
										className="relative cursor-pointer rounded-md font-medium"
										style={{ color: `var(--${formId})` }}
									>
										<span>Upload a file</span>
										<input
											id="jobSpec-upload"
											name="jobSpec"
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
				</div>
			</div>

			<div className="flex items-start">
				<div className="flex items-center h-5">
					<input
						id="privacy"
						name="privacy"
						type="checkbox"
						required
						onChange={(e) => setPrivacyChecked(e.target.checked)}
						className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
					/>
				</div>
				<div className="ml-3">
					<label htmlFor="privacy" className="text-sm text-gray-600">
						I agree to the{' '}
						<a
							href="/privacy-policy"
							className="font-medium underline"
							style={{ color: `var(--${formId})` }}
							target="_blank"
						>
							Privacy Policy
						</a>{' '}
						and{' '}
						<a
							href="/terms-of-use"
							className="font-medium underline"
							style={{ color: `var(--${formId})` }}
							target="_blank"
						>
							Terms of Use
						</a>
					</label>
				</div>
			</div>
			<div className="flex items-start">
				<div className="flex items-center h-5">
					<input
						id="agreement"
						name="agreement"
						type="checkbox"
						required
						onChange={(e) => setIsAgreementChecked(e.target.checked)}
						className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
					/>
				</div>
				<div className="ml-3">
					<label htmlFor="agreement" className="text-sm text-gray-600">
						I am happy for Holden Knight{' '}
						{isEducation ? 'Education' : 'Healthcare'} to represent me for
						suitable work opportunities.
					</label>
				</div>
			</div>
			<div className="flex justify-end">
				<PrimaryButton
					type="submit"
					disabled={isSubmitting || !privacyChecked || !isAgreementChecked}
				>
					{isSubmitting ? 'Registering...' : 'Register'}
				</PrimaryButton>
			</div>
		</form>
	)
}
