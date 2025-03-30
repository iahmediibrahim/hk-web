import sgMail from '@sendgrid/mail'
import { NextResponse } from 'next/server'

type ContactInfo = {
    firstName: FormDataEntryValue | null
    lastName: FormDataEntryValue | null
    email: FormDataEntryValue | null
    phone: FormDataEntryValue | null
}

type AdditionalData = {
    schoolName?: FormDataEntryValue | null
    jobTitle?: FormDataEntryValue | null
    requirements?: FormDataEntryValue | null
    preferredLocations?: FormDataEntryValue | null
    localAuthority?: FormDataEntryValue | null
    schoolTrust?: FormDataEntryValue | null
    additionalInfo?: FormDataEntryValue | null
    location?: FormDataEntryValue | null
    expertise?: FormDataEntryValue | null
    friendInfo?: {
        firstName: FormDataEntryValue | null
        lastName: FormDataEntryValue | null
        email: FormDataEntryValue | null
        phone: FormDataEntryValue | null
        jobTitle: FormDataEntryValue | null
    }
}

sgMail.setApiKey(process.env.SENDGRID_API!)

export async function POST(request: Request) {
    try {
        const formData = await request.formData()
        const contactType = formData.get('contactType') as string
        const formId = contactType.split(' ')[0]

        const contactInfo: ContactInfo = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
        }

        // Form specific data
        let additionalData: AdditionalData = {}

        // Handle CV file for tuition-tutors
        const attachments = []
        if (formId === 'tuition-tutors' && formData.get('cv')) {
            const cv = formData.get('cv') as File
            const cvBuffer = await cv.arrayBuffer()
            const base64CV = Buffer.from(cvBuffer).toString('base64')
            attachments.push({
                content: base64CV,
                filename: cv.name,
                type: cv.type,
                disposition: 'attachment',
            })

            additionalData = {
                location: formData.get('location'),
                expertise: formData.get('expertise'),
                additionalInfo: formData.get('additionalInfo'),
            }
        } else {
            switch (formId) {
                case 'free-uniform':
                    additionalData = {
                        schoolName: formData.get('schoolName'),
                    }
                    break
                case 'school-apprenticeships':
                    additionalData = {
                        jobTitle: formData.get('jobTitle'),
                        schoolName: formData.get('schoolName'),
                        requirements: formData.get('requirements'),
                    }
                    break
                case 'educators-apprenticeships':
                    additionalData = {
                        preferredLocations: formData.get('preferredLocations'),
                    }
                    break
                case 'tuition-intervention':
                    additionalData = {
                        jobTitle: formData.get('jobTitle'),
                        localAuthority: formData.get('localAuthority'),
                        additionalInfo: formData.get('additionalInfo'),
                    }
                    break
                case 'tuition-schools':
                    additionalData = {
                        jobTitle: formData.get('jobTitle'),
                        schoolTrust: formData.get('schoolTrust'),
                        additionalInfo: formData.get('additionalInfo'),
                    }
                    break
                case 'refer-a-friend':
                    additionalData = {
                        friendInfo: {
                            firstName: formData.get('friendFirstName'),
                            lastName: formData.get('friendLastName'),
                            email: formData.get('friendEmail'),
                            phone: formData.get('friendPhone'),
                            jobTitle: formData.get('friendJobTitle'),
                        },
                    }
                    break
            }
        }

        const msg = {
            to: 'm@saqaya.com',
            from: 'info@holdenknight.com',
            templateId: 'd-588993cafbf14ef6956ffadabaa0fa42',
            dynamic_template_data: {
                contactInfo,
                ...additionalData,
                formType: formId,
                formTitle: getFormTitle(formId),
                contactType,
            },
            attachments,
        }

        await sgMail.send(msg)
        return NextResponse.json({ message: 'Form submitted successfully' })
    } catch (error) {
        console.error('Error processing form submission:', error)
        return NextResponse.json(
            { error: 'Failed to process form submission' },
            { status: 500 },
        )
    }
}

function getFormTitle(formId: string): string {
    if (formId === 'free-uniform') {
        return 'Free Uniform'
    }
    if (formId === 'school-apprenticeships') {
        return 'School Apprenticeships'
    }
    if (formId === 'educators-apprenticeships') {
        return 'Educators Apprenticeships'
    }
    if (formId === 'tuition-intervention') {
        return 'Tuition Intervention'
    }
    if (formId === 'tuition-schools') {
        return 'Tuition Schools'
    }
    if (formId === 'refer-a-friend') {
        return 'Refer a Friend'
    }
    if (formId === 'tuition-tutors') {
        return 'Tutor Application'
    }
    return 'Contact Form Submission'
}
