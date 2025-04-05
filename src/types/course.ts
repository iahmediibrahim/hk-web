import { ContentfulImage } from '@/lib/contentful'
import { Document } from '@contentful/rich-text-types'
interface ContentNode {
	data: Record<string, unknown>
	content: Array<{
		data: Record<string, unknown>
		content: Array<{
			data: Record<string, unknown>
			marks: string[]
			value: string
			nodeType: string
		}>
		nodeType: string
	}>
	nodeType: string
}

interface SessionContent {
	name: string
}

export interface DayContent {
	[key: string]: SessionContent
}

export interface Course {
	sys: {
		id: string
		createdAt: string
		updatedAt: string
		contentType: {
			sys: {
				id: string
			}
		}
	}
	fields: {
		title: string
		slug: string
		img: ContentfulImage
		description: Document
		duration: string
		numberOfDays: number
		maxAttendees: number
		beneficiaries: string
		price: number
		groupPrice: number
		content: {
			[key: string]: DayContent
		}
	}
}

export interface CourseCardProps {
	title: string
	slug: string
	description: ContentNode
	duration: string
	numberOfDays: number
	maxAttendees: number
	beneficiaries: string
	price: number
	groupPrice: number
}
