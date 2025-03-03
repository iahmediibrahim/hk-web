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

export interface SimplifiedPage {
	id: EntryFields.Text
	title: EntryFields.Text
	slug: EntryFields.Text
	parentId?: EntryFields.Text
	children: SimplifiedPage[]
	slugPath: EntryFields.Text[]
}
