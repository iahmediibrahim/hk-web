'use client'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { PrimaryButton } from '../PrimaryButton'

export const ContactForm = ({ formId }: { formId: string }) => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [privacyChecked, setPrivacyChecked] = useState(false)
	return (
		<form
			className="space-y-6"
			onSubmit={async (e) => {
				e.preventDefault()
				setIsSubmitting(true)
				const formData = new FormData(e.target as HTMLFormElement)
				formData.append('contactType', `${formId} contact request`)

				try {
					const response = await fetch('/api/contact', {
						// Updated API endpoint
						method: 'POST',
						body: formData,
					})

					if (!response.ok) {
						throw new Error('Failed to send message')
					}

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
					htmlFor="message"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Message
				</label>
				<textarea
					id="message"
					name="message"
					required
					rows={4}
					className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 resize-none"
					placeholder="How can we help you?"
				/>
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
