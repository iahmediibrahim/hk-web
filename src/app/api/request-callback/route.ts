import sgMail from '@sendgrid/mail'
import { NextResponse } from 'next/server'

sgMail.setApiKey(process.env.SENDGRID_API!)

export async function POST(request: Request) {
	try {
		const formData = await request.formData()
		const contactType = formData.get('contactType') as string
		const isEducation = contactType.includes('education')

		// Extract form fields
		const contactPerson = {
			firstName: formData.get('firstName'),
			lastName: formData.get('lastName'),
			email: formData.get('email'),
			phone: formData.get('phone'),
		}

		// School details only if education
		const school = isEducation
			? {
					name: formData.get('schoolName'),
					address: formData.get('schoolAddress'),
					email: formData.get('schoolEmail'),
					phone: formData.get('schoolPhone'),
					postalCode: formData.get('postalCode'),
			  }
			: null

		// Get candidate types for education forms
		const candidateTypes = isEducation
			? {
					types: formData.getAll('type_of_candidates'),
					other:
						formData.get('otherSecond') === 'on'
							? formData.get('otherSpecifySecond')
							: null,
			  }
			: null

		// Get details for non-education forms
		const details = !isEducation ? formData.get('details') : null

		// Prepare email content
		const msg = {
			to: 'm@saqaya.com',
			from: 'info@holdenknight.com',
			templateId: 'd-c5c61dfda4aa4e3992f38c69c5f00be3',
			dynamic_template_data: {
				contactType,
				contactPerson,
				school,
				candidateTypes,
				details,
				isEducation,
			},
		}

		await sgMail.send(msg)
		return NextResponse.json({
			message: 'Callback request submitted successfully',
		})
	} catch (error) {
		console.error('Error processing callback request:', error)
		return NextResponse.json(
			{ error: 'Failed to process callback request' },
			{ status: 500 },
		)
	}
}
