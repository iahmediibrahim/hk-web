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

		// Vacancy details
		const vacancyDetails = formData.get('vacancyDetails')
		const jobSpec = formData.get('jobSpec') as File

		// Prepare email content
		const msg: sgMail.MailDataRequired = {
			to: 'm@saqaya.com',
			from: 'info@holdenknight.com',
			templateId: 'd-5c6fff3c944e476aaa9249dbc279e12d',
			dynamicTemplateData: {
				contactType,
				contactPerson,
				school,
				vacancy: {
					details: vacancyDetails,
					hasAttachment: jobSpec && jobSpec.size > 0,
				},
			},
		}

		// Add attachment if file exists
		if (jobSpec && jobSpec.size > 0) {
			const bytes = await jobSpec.arrayBuffer()
			const buffer = Buffer.from(bytes)

			msg.attachments = [
				{
					content: buffer.toString('base64'),
					filename: jobSpec.name,
					type: jobSpec.type,
					disposition: 'attachment',
				},
			]
		}
		await sgMail.send(msg)
		return NextResponse.json({
			message: 'Vacancy registration submitted successfully',
		})
	} catch (error) {
		console.error('Error processing vacancy registration:', error)
		return NextResponse.json(
			{ error: 'Failed to process vacancy registration' },
			{ status: 500 },
		)
	}
}
