'use client'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { PrimaryButton } from '../PrimaryButton'

export const SubmitCvForm = ({ formId }: { formId: string }) => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [privacyChecked, setPrivacyChecked] = useState(false)
	const [isAgreementChecked, setIsAgreementChecked] = useState(false)
	const isEducation = formId.includes('education')
	const commonClasses =
		'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50'
	const labelClasses = 'block text-sm font-medium text-gray-700 mb-1'
	return (
		<form
			className="w-full px-4 sm:px-6 lg:px-8 space-y-6"
			onSubmit={async (e) => {
				e.preventDefault()
				setIsSubmitting(true)
				const formData = new FormData(e.target as HTMLFormElement)
				formData.append('contactType', `${formId.split('-').join(' ')}`)

				try {
					const response = await fetch('/api/submit-cv', {
						method: 'POST',
						body: formData,
					})

					if (!response.ok) {
						throw new Error('Failed to submit CV')
					}

					toast.success('CV submitted successfully!')
					;(e.target as HTMLFormElement).reset()
					setPrivacyChecked(false)
					setIsAgreementChecked(false)
				} catch (error) {
					console.error('Error submitting CV:', error)
					toast.error('Failed to submit CV. Please try again.')
				} finally {
					setIsSubmitting(false)
				}
			}}
		>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
				<div className="w-full">
					<label htmlFor="firstName" className={labelClasses}>
						First Name
					</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						required
						className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 text-sm sm:text-base"
					/>
				</div>
				<div className="w-full">
					<label htmlFor="lastName" className={labelClasses}>
						Last Name
					</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						required
						className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 text-sm sm:text-base"
					/>
				</div>
			</div>

			<div className="w-full">
				<label htmlFor="email" className={labelClasses}>
					Email Address
				</label>
				<input
					type="email"
					id="email"
					name="email"
					required
					className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 text-sm sm:text-base"
				/>
			</div>

			<div className="w-full">
				<label htmlFor="phone" className={labelClasses}>
					Phone Number
				</label>
				<input
					type="tel"
					id="phone"
					name="phone"
					required
					className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 text-sm sm:text-base"
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

			{/* Rest of the form components with similar responsive adjustments */}
			{/* Role type section */}
			<div className="w-full">
				<div className="w-full my-4 sm:my-5 mt-8 sm:mt-10 font-[600]">
					What type of role are you looking for?*
					<p className="ms-4 sm:ms-5 text-sm">(please tick all that apply)</p>
				</div>
				{/* Role checkboxes */}
				<div className="space-y-3">
					{['Day to day supply/short-term', 'Long-term', 'Permanent'].map(
						(role) => (
							<div key={role} className="flex items-center">
								<div className="relative flex items-start ease-in duration-300">
									<div className="w-8 sm:w-11 h-8 sm:h-11 flex items-center justify-center">
										<input
											id={role}
											type="checkbox"
											name="role"
											value={role}
											className="w-4 h-4 sm:w-5 sm:h-5 accent-yellow-500/60 cursor-pointer"
										/>
									</div>
								</div>
								<label
									htmlFor={role}
									className="cursor-pointer font-light text-sm sm:text-base"
								>
									{role}
								</label>
							</div>
						),
					)}
				</div>
			</div>

			{/* Education specific sections */}
			{isEducation && (
				<>
					{/* Settings section */}
					<div className="w-full">
						<div className="w-full my-4 sm:my-5 mt-8 sm:mt-10 font-[600]">
							What settings do you work in?*
							<p className="ms-4 sm:ms-5 text-sm">
								(please tick all that apply)
							</p>
						</div>
						<div className="space-y-3">
							{['Primary schools', 'Secondary schools', 'FE'].map((setting) => (
								<div key={setting} className="flex items-center">
									<div className="w-8 sm:w-11 h-8 sm:h-11 flex items-center justify-center">
										<input
											id={setting}
											type="checkbox"
											name="settings"
											value={setting}
											className="w-4 h-4 sm:w-5 sm:h-5 accent-yellow-500 cursor-pointer"
										/>
									</div>
									<label
										htmlFor={setting}
										className="cursor-pointer font-light text-sm sm:text-base"
									>
										{setting}
									</label>
								</div>
							))}
							{/* Other option */}
							<div className="flex flex-wrap items-center gap-2">
								<div className="flex items-center">
									<div className="w-8 sm:w-11 h-8 sm:h-11 flex items-center justify-center">
										<input
											id="otherFirst"
											type="checkbox"
											name="otherFirst"
											className="w-4 h-4 sm:w-5 sm:h-5 accent-yellow-500 cursor-pointer"
										/>
									</div>
									<label
										htmlFor="otherFirst"
										className="cursor-pointer font-light text-sm sm:text-base"
									>
										Other
									</label>
								</div>
								<div className="flex-1 min-w-[200px] sm:min-w-[300px]">
									<input
										id="otherSpecifyFirst"
										type="text"
										name="otherSpecifyFirst"
										placeholder="Please Specify"
										className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 text-sm sm:text-base"
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Type of candidates section */}
					<div className="w-full">
						<div className="w-full my-4 sm:my-5 font-[600]">
							What type of work are you looking for?*
							<p className="ms-4 sm:ms-5 text-sm">
								(please tick all that apply)
							</p>
						</div>
						<div className="space-y-3">
							{[
								{ id: 'teaching', label: 'Teaching' },
								{ id: 'classroomSupport', label: 'Other support' },
								{ id: 'leadershipExecutive', label: 'Leadership/executive' },
							].map((item) => (
								<div key={item.id} className="flex items-center">
									<div className="w-8 sm:w-11 h-8 sm:h-11 flex items-center justify-center">
										<input
											id={item.id}
											type="checkbox"
											name="type_of_candidates"
											value={item.id}
											className="w-4 h-4 sm:w-5 sm:h-5 accent-yellow-500 cursor-pointer"
										/>
									</div>
									<label
										htmlFor={item.id}
										className="cursor-pointer font-light text-sm sm:text-base"
									>
										{item.label}
									</label>
								</div>
							))}
							{/* Other option with text input */}
							<div className="flex flex-wrap items-center gap-2">
								<div className="flex items-center">
									<div className="w-8 sm:w-11 h-8 sm:h-11 flex items-center justify-center">
										<input
											id="otherSecond"
											type="checkbox"
											name="otherSecond"
											className="w-4 h-4 sm:w-5 sm:h-5 accent-yellow-500 cursor-pointer"
										/>
									</div>
									<label
										htmlFor="otherSecond"
										className="cursor-pointer font-light text-sm sm:text-base"
									>
										Other
									</label>
								</div>
								<div className="flex-1 min-w-[200px] sm:min-w-[300px]">
									<input
										id="otherSpecifySecond"
										type="text"
										name="otherSpecifySecond"
										placeholder="Please Specify"
										className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 text-sm sm:text-base"
									/>
								</div>
							</div>
						</div>
					</div>
				</>
			)}

			{/* Job Title */}
			<div className="w-full">
				<label htmlFor="jobTitle" className={labelClasses}>
					Job Title
				</label>
				<input
					type="text"
					id="jobTitle"
					name="jobTitle"
					required
					className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 text-sm sm:text-base"
					placeholder="Enter the job title you're applying for"
				/>
			</div>

			{/* Qualifications */}
			<div className="w-full">
				<label htmlFor="qualifications" className={labelClasses}>
					Tell us about any relevant qualifications you have
				</label>
				<textarea
					id="qualifications"
					name="qualifications"
					required
					rows={4}
					className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 text-sm sm:text-base"
				/>
			</div>

			{/* Experience */}
			<div className="w-full">
				<label htmlFor="experience" className={labelClasses}>
					Tell us about any relevant experience you have
				</label>
				<textarea
					id="experience"
					name="experience"
					required
					rows={4}
					className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 text-sm sm:text-base"
				/>
			</div>

			{/* Privacy Policy */}
			<div className="flex items-start space-x-2 sm:space-x-3">
				<div className="flex items-center h-5">
					<input
						id="privacy"
						name="privacy"
						type="checkbox"
						required
						onChange={(e) => setPrivacyChecked(e.target.checked)}
						className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
					/>
				</div>
				<div>
					<label htmlFor="privacy" className="text-sm text-gray-600">
						I agree to the{' '}
						<a
							href="/privacy-policy"
							className="font-medium underline"
							target="_blank"
						>
							Privacy Policy
						</a>{' '}
						and{' '}
						<a
							href="/terms-of-use"
							className="font-medium underline"
							target="_blank"
						>
							Terms of Use
						</a>
					</label>
				</div>
			</div>

			{/* Agreement */}
			<div className="flex items-start space-x-2 sm:space-x-3">
				<div className="flex items-center h-5">
					<input
						id="agreement"
						name="agreement"
						type="checkbox"
						required
						onChange={(e) => setIsAgreementChecked(e.target.checked)}
						className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
					/>
				</div>
				<div>
					<label htmlFor="agreement" className="text-sm text-gray-600">
						I am happy for Holden Knight{' '}
						{isEducation ? 'Education' : 'Healthcare'} to represent me for
						suitable work opportunities.
					</label>
				</div>
			</div>

			{/* Submit Button */}
			<div className="flex justify-end">
				<PrimaryButton
					type="submit"
					disabled={isSubmitting || !privacyChecked || !isAgreementChecked}
					className="w-full sm:w-auto"
				>
					{isSubmitting ? 'Registering...' : 'Register'}
				</PrimaryButton>
			</div>
		</form>
	)
}
