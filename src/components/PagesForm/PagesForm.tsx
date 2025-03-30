'use client'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { PrimaryButton } from '../PrimaryButton'

type FormId =
	| 'free-uniform'
	| 'school-apprenticeships'
	| 'educators-apprenticeships'
	| 'tuition-intervention'
	| 'tuition-schools'
	| 'refer-a-friend'
	| 'tuition-tutors'

const FormFields = {
	'free-uniform': ['firstName', 'lastName', 'email', 'schoolName'],
	'school-apprenticeships': [
		'firstName',
		'lastName',
		'jobTitle',
		'email',
		'phone',
		'schoolName',
		'requirements',
	],
	'educators-apprenticeships': [
		'firstName',
		'lastName',
		'email',
		'phone',
		'preferredLocations',
	],
	'tuition-intervention': [
		'firstName',
		'lastName',
		'email',
		'jobTitle',
		'localAuthority',
		'additionalInfo',
	],
	'tuition-schools': [
		'firstName',
		'lastName',
		'email',
		'phone',
		'jobTitle',
		'schoolTrust',
		'additionalInfo',
	],
	'refer-a-friend': [
		'firstName',
		'lastName',
		'email',
		'phone',
		'friendFirstName',
		'friendLastName',
		'friendEmail',
		'friendPhone',
		'friendJobTitle',
	],
	'tuition-tutors': [
		'firstName',
		'lastName',
		'email',
		'phone',
		'location',
		'expertise',
		'additionalInfo',
		'cv',
	],
}

export const PagesForm = ({ formId }: { formId: string }) => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [privacyChecked, setPrivacyChecked] = useState(false)

	const renderField = (fieldName: string) => {
		const commonClasses =
			'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50'
		const labelClasses = 'block text-sm font-medium text-gray-700 mb-1'

		switch (fieldName) {
			case 'firstName':
			case 'friendFirstName':
				return (
					<div>
						<label htmlFor={fieldName} className={labelClasses}>
							{fieldName === 'friendFirstName'
								? "Friend's First Name"
								: 'First Name'}
						</label>
						<input
							type="text"
							id={fieldName}
							name={fieldName}
							required
							className={commonClasses}
						/>
					</div>
				)
			case 'lastName':
			case 'friendLastName':
				return (
					<div>
						<label htmlFor={fieldName} className={labelClasses}>
							{fieldName === 'friendLastName'
								? "Friend's Last Name"
								: 'Last Name'}
						</label>
						<input
							type="text"
							id={fieldName}
							name={fieldName}
							required
							className={commonClasses}
						/>
					</div>
				)
			case 'email':
			case 'friendEmail':
				return (
					<div>
						<label htmlFor={fieldName} className={labelClasses}>
							{fieldName === 'friendEmail'
								? "Friend's Email Address"
								: 'Email Address'}
						</label>
						<input
							type="email"
							id={fieldName}
							name={fieldName}
							required
							className={commonClasses}
						/>
					</div>
				)
			case 'phone':
			case 'friendPhone':
				return (
					<div>
						<label htmlFor={fieldName} className={labelClasses}>
							{fieldName === 'friendPhone'
								? "Friend's Phone Number"
								: 'Phone Number'}
						</label>
						<input
							type="tel"
							id={fieldName}
							name={fieldName}
							required
							className={commonClasses}
						/>
					</div>
				)
			case 'schoolName':
				return (
					<div>
						<label htmlFor="schoolName" className={labelClasses}>
							School Name
						</label>
						<input
							type="text"
							id="schoolName"
							name="schoolName"
							required
							className={commonClasses}
						/>
					</div>
				)
			case 'jobTitle':
			case 'friendJobTitle':
				return (
					<div>
						<label htmlFor={fieldName} className={labelClasses}>
							{fieldName === 'friendJobTitle'
								? "Friend's Job Title"
								: 'Job Title'}
						</label>
						<input
							type="text"
							id={fieldName}
							name={fieldName}
							required
							className={commonClasses}
						/>
					</div>
				)
			case 'requirements':
			case 'additionalInfo':
				return (
					<div>
						<label htmlFor={fieldName} className={labelClasses}>
							{fieldName === 'requirements'
								? 'Requirements'
								: 'Additional Information'}
						</label>
						<textarea
							id={fieldName}
							name={fieldName}
							required
							rows={4}
							className={`${commonClasses} resize-none`}
						/>
					</div>
				)
			case 'preferredLocations':
				return (
					<div>
						<label htmlFor="preferredLocations" className={labelClasses}>
							Preferred location(s) of work
						</label>
						<input
							type="text"
							id="preferredLocations"
							name="preferredLocations"
							required
							className={commonClasses}
						/>
					</div>
				)
			case 'localAuthority':
				return (
					<div>
						<label htmlFor="localAuthority" className={labelClasses}>
							Local Authority
						</label>
						<input
							type="text"
							id="localAuthority"
							name="localAuthority"
							required
							className={commonClasses}
						/>
					</div>
				)
			case 'schoolTrust':
				return (
					<div>
						<label htmlFor="schoolTrust" className={labelClasses}>
							School/Trust
						</label>
						<input
							type="text"
							id="schoolTrust"
							name="schoolTrust"
							required
							className={commonClasses}
						/>
					</div>
				)
			case 'location':
				return (
					<div>
						<label htmlFor="location" className={labelClasses}>
							Location
						</label>
						<input
							type="text"
							id="location"
							name="location"
							required
							className={commonClasses}
						/>
					</div>
				)

			case 'expertise':
				return (
					<div>
						<label htmlFor="expertise" className={labelClasses}>
							Area of Expertise
						</label>
						<input
							type="text"
							id="expertise"
							name="expertise"
							required
							className={commonClasses}
						/>
					</div>
				)

			case 'cv':
				return (
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
				)
			default:
				return null
		}
	}

	return (
		<form
			id="form"
			className="space-y-6"
			onSubmit={async (e) => {
				e.preventDefault()
				setIsSubmitting(true)
				const formData = new FormData(e.target as HTMLFormElement)
				formData.append('contactType', `${formId} contact request`)

				try {
					const response = await fetch('/api/contact-pages', {
						method: 'POST',
						body: formData,
					})

					if (!response.ok) throw new Error('Failed to send message')

					toast.success('Message sent successfully!')
					;(e.target as HTMLFormElement).reset()
				} catch (error) {
					console.error('Error sending message:', error)
					toast.error('Failed to send message. Please try again.')
				} finally {
					setIsSubmitting(false)
				}
			}}
		>
			{formId === 'refer-a-friend' && (
				<h3 className="text-lg font-semibold mb-4">Your Details</h3>
			)}

			<div className="space-y-6">
				{FormFields[formId as FormId].map((field, index) => {
					if (formId === 'refer-a-friend' && field === 'friendFirstName') {
						return (
							<div key={`${field}-${index}`}>
								<h3 className="text-lg font-semibold mb-4">
									Friend&apos;s Details
								</h3>{' '}
								{renderField(field)}
							</div>
						)
					}
					return <div key={`${field}-${index}`}>{renderField(field)}</div>
				})}
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

			<div className="flex justify-end">
				<PrimaryButton type="submit" disabled={isSubmitting || !privacyChecked}>
					{isSubmitting ? 'Sending...' : 'Send'}
				</PrimaryButton>
			</div>
		</form>
	)
}
