import { ContentfulPage, SimplifiedPage } from './types'

const contentful = require('contentful')

export const client = contentful.createClient({
	space: process.env.CONTENTFUL_SPACE_ID,
	accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})
export const getPageBySlug = async (slug: string, contentType: string) => {
	try {
		const response = await client.getEntries({
			content_type: contentType,
			'fields.slug': slug,
			select: 'fields.title,fields.slug,fields.sections',
			include: 3,
		})

		if (!response?.items) {
			throw new Error('Failed to fetch Page')
		}

		return response.items[0]
	} catch (error) {
		console.error('Error fetching posts:', error)
		return {
			props: {
				posts: [],
			},
		}
	}
}
export async function getAllPages() {
	const entries = await client.getEntries({
		content_type: 'page',
		include: 3,
	})
	return entries.items
}

function buildSlugPath(page: any): string[] {
	const path: string[] = []
	let currentPage = page

	while (currentPage) {
		path.unshift(currentPage.fields.slug)
		currentPage = currentPage.fields.parentPage
	}

	// Remove 'home' from path if present at root
	if (path[0] === 'home') path.shift()
	return path
}

export async function getPageHierarchy(): Promise<SimplifiedPage[]> {
	const [pagesResponse, subPagesResponse] = await Promise.all([
		client.getEntries({
			content_type: 'page',
			select: 'fields.title,fields.slug,fields.parentPage',
			include: 3,
		}),
		client.getEntries({
			content_type: 'subPage',
			select: 'fields.title,fields.slug,fields.parentPage',
			include: 3,
		}),
	])

	const { items: pages } = pagesResponse
	const { items: subPages } = subPagesResponse
	const allPages = [...pages, ...subPages]
	console.log(allPages)

	const pageMap = new Map<string, SimplifiedPage>()
	const rootPages: SimplifiedPage[] = []

	// First pass: Create simplified pages
	allPages.forEach((page: ContentfulPage) => {
		const simplified: SimplifiedPage = {
			id: page.sys.id,
			title: page.fields.title,
			slug: page.fields.slug,
			parentId: page.fields.parentPage?.sys.id || null,
			slugPath: buildSlugPath(page),
			children: [],
		}
		pageMap.set(page.sys.id, simplified)
	})

	// Second pass: Build hierarchy
	pageMap.forEach((page) => {
		if (page.parentId) {
			const parent = pageMap.get(page.parentId)
			if (parent) {
				parent.children.push(page)
			}
		} else if (page.slug !== 'home') {
			// Add non-home pages without parents to root
			rootPages.push(page)
		}
	})

	// Find home page and return its children as root navigation
	const homePage = Array.from(pageMap.values()).find(
		(page) => page.slug === 'home',
	)
	return homePage ? homePage.children : rootPages
}
