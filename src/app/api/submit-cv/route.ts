import sgMail from '@sendgrid/mail'
import { NextResponse } from 'next/server'

sgMail.setApiKey(process.env.SENDGRID_API!)

export async function POST(request: Request) {
	try {
		const formData = await request.formData()
		const contactType = formData.get('contactType') as string
		const isEducation = contactType.includes('education')

		// Extract basic info
		const contactInfo = {
			firstName: formData.get('firstName'),
			lastName: formData.get('lastName'),
			email: formData.get('email'),
			phone: formData.get('phone'),
		}

		// Get CV file
		const cv = formData.get('cv') as File
		const cvBuffer = await cv.arrayBuffer()
		const base64CV = Buffer.from(cvBuffer).toString('base64')

		// Get roles
		const roles = formData.getAll('role')

		// Get education specific fields if applicable
		const educationDetails = isEducation
			? {
					settings: formData.getAll('settings'),
					candidateTypes: formData.getAll('type_of_candidates'),
					otherSettings:
						formData.get('otherFirst') === 'on'
							? formData.get('otherSpecifyFirst')
							: null,
					otherCandidateType:
						formData.get('otherSecond') === 'on'
							? formData.get('otherSpecifySecond')
							: null,
			  }
			: null

		// Get additional details
		const additionalDetails = {
			jobTitle: formData.get('jobTitle'),
			qualifications: formData.get('qualifications'),
			experience: formData.get('experience'),
		}

		// Prepare email content
		const msg = {
			to: 'm@saqaya.com',
			from: 'info@holdenknight.com',
			templateId: 'd-162369dcbc4b44e39d6f19c4031652c3',
			dynamic_template_data: {
				isEducation,
				contactInfo,
				roles,
				educationDetails,
				additionalDetails,
				contactType,
			},
			attachments: [
				{
					content: base64CV,
					filename: cv.name,
					type: cv.type,
					disposition: 'attachment',
				},
			],
		}

		await sgMail.send(msg)
		return NextResponse.json({ message: 'CV submitted successfully' })
	} catch (error) {
		console.error('Error processing CV submission:', error)
		return NextResponse.json(
			{ error: 'Failed to process CV submission' },
			{ status: 500 },
		)
	}
}
