export interface ContentfulPage {
	sys: {
		id: string
	}
	fields: {
		title: string
		slug: string
		parentPage?: ContentfulPage
		sections: any[]
		seoTitle?: string
		seoDescription?: string
	}
}

export interface SimplifiedPage {
	id: string
	title: string
	slug: string
	parentId: string | null
	children: SimplifiedPage[]
	slugPath: string[]
}
