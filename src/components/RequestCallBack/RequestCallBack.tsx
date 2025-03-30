'use client'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { PrimaryButton } from '../PrimaryButton'

export const RequestCallBack = ({ formId }: { formId: string }) => {
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
			const response = await fetch('/api/request-callback', {
				method: 'POST',
				body: formData,
			})

			if (!response.ok) {
				throw new Error('Failed to request callback')
			}

			toast.success('Request registered successfully!')
			;(e.target as HTMLFormElement).reset()
		} catch (error) {
			console.error('Error registering request:', error)
			toast.error('Failed to register request. Please try again.')
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
					{/* Candidate Type Selection */}
					<div className="w-full">
						<div className="w-full my-5 font-[600]">
							What type of candidates are you looking for?*
							<p className="ms-5">(please tick all that apply)</p>
						</div>
						<div className="space-y-4">
							<div className="flex items-center">
								<div className="w-11 h-11 flex items-center justify-center">
									<input
										id="teaching"
										type="checkbox"
										name="type_of_candidates"
										value="teaching"
										className="w-5 h-5 accent-yellow-500 cursor-pointer"
									/>
								</div>
								<label htmlFor="teaching" className="cursor-pointer font-light">
									Teaching
								</label>
							</div>

							<div className="flex items-center">
								<div className="w-11 h-11 flex items-center justify-center">
									<input
										id="classroomSupport"
										type="checkbox"
										name="type_of_candidates"
										value="classroomSupport"
										className="w-5 h-5 accent-yellow-500 cursor-pointer"
									/>
								</div>
								<label
									htmlFor="classroomSupport"
									className="cursor-pointer font-light"
								>
									Other support
								</label>
							</div>

							<div className="flex items-center">
								<div className="w-11 h-11 flex items-center justify-center">
									<input
										id="leadershipExecutive"
										type="checkbox"
										name="type_of_candidates"
										value="leadershipExecutive"
										className="w-5 h-5 accent-yellow-500 cursor-pointer"
									/>
								</div>
								<label
									htmlFor="leadershipExecutive"
									className="cursor-pointer font-light"
								>
									Leadership/executive
								</label>
							</div>

							<div className="flex flex-wrap items-center">
								<div className="flex items-center me-4">
									<div className="w-11 h-11 flex items-center justify-center">
										<input
											id="otherSecond"
											type="checkbox"
											name="otherSecond"
											className="w-5 h-5 accent-yellow-500 cursor-pointer"
										/>
									</div>
									<label
										htmlFor="otherSecond"
										className="cursor-pointer font-light"
									>
										Other
									</label>
								</div>
								<div className="min-w-[300px]">
									<div className="form-field block">
										<div className="form-field__control bg-gray-100 hover:bg-gray-200 relative">
											<input
												id="otherSpecifySecond"
												type="text"
												name="otherSpecifySecond"
												placeholder="Please Specify"
												className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{/*   Details */}

			{!isEducation && (
				<div className="space-y-6">
					<div>
						<label
							htmlFor="details"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Please provide any details, which may help us support you
						</label>
						<textarea
							id="details"
							name="details"
							required
							rows={4}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 resize-none"
							placeholder="Please provide details about the vacancy..."
						/>
					</div>
				</div>
			)}

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
