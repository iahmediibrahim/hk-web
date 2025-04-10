import { Document } from '@contentful/rich-text-types'
import { EntryFields, EntrySkeletonType } from 'contentful'

export type ContentfulPage = {
	fields: {
		title: EntryFields.Text
		slug: EntryFields.Text
		parentPage: ContentfulPage | undefined
		sections: EntryFields.EntryLink<EntrySkeletonType>[]
		seoTitle?: EntryFields.Text
		seoDescription?: EntryFields.Text
	}
	sys: {
		id: string
	}
	contentTypeId: string
}
export type ContentfulImage = {
	fields: {
		file: {
			contentType: string
			url: string
			fileName: string
			details: {
				image: {
					width: number
					height: number
				}
			}
		}
	}
}
export type Video = {
	fields: {
		poster: ContentfulImage
		video: ContentfulImage
	}
}
export type CTA = {
	fields: {
		title: string
		linkTo: string
		large: boolean
		outlined: boolean
	}
}
export interface SimplifiedPage {
	id: EntryFields.Text
	title: EntryFields.Text
	slug: EntryFields.Text
	parentId?: EntryFields.Text
	children: SimplifiedPage[]
	slugPath: EntryFields.Text[]
}

export interface Article {
	fields: {
		id: EntryFields.Text
		title: EntryFields.Text
		slug: EntryFields.Text
		excerpt: EntryFields.Text
		img: ContentfulImage
		date: EntryFields.Text
		content: Document
		type?: string
		linkTo?: string
	}
	sys: {
		contentType: {
			sys: {
				id: string
			}
		}
	}
}

export interface Job {
	fields: {
		title: string
		slug: string
		id: string
		description: Document
		rewards: Array<{
			description: string
		}>
		requirements: Array<{
			description: string
		}>
		location: {
			id: string
			lat: number
			lng: number
			formattedAddress: string
		}
		salary: {
			code: string
			type: string
			unit: number
			unitFrom: number
		}
		category: {
			id: string
			name: string
			code: string
		}
		permanent: boolean
	}
}

export interface Location {
	id?: string
	formattedAddress: string
	lng: number
	lat: number
}
