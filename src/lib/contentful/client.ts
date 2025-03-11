import { createClient } from 'contentful'
import { ContentfulPage, SimplifiedPage } from './types'

const client = createClient({
	space: process.env.CONTENTFUL_SPACE_ID || '',
	accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
})
export const getPageBySlug = async (slug: string[], contentType: string) => {
	try {
		const response = await client.getEntries({
			content_type: contentType,
			'fields.slug': slug[slug.length - 1],
			select: [
				'fields.title',
				'fields.slug',
				'fields.sections',
				'fields.parentPage',
			],
			include: 3,
		})

		if (!response?.items) {
			throw new Error('Failed to fetch Page')
		}
		const page = response.items[0] as unknown as ContentfulPage
		const slugPath = buildSlugPath(page)
		if (slugPath.length > 0 && slugPath.join('/') !== slug.join('/')) {
			throw new Error('Failed to fetch Page')
		}
		return page
	} catch (error) {
		console.error('Error fetching posts:', error)
	}
}
export async function getAllPages() {
	const entries = await client.getEntries<ContentfulPage>({
		content_type: 'page',
		include: 3,
	})
	return entries.items
}

function buildSlugPath(page: ContentfulPage): string[] {
	const path: string[] = []
	let currentPage: ContentfulPage | undefined = page

	while (currentPage && currentPage.fields) {
		path.unshift(currentPage.fields.slug)
		currentPage = currentPage.fields.parentPage
	}

	// Remove 'home' from path if present at root
	if (path[0] === 'home') path.shift()
	return path
}

export async function getPageHierarchy(): Promise<SimplifiedPage[]> {
	const [pagesResponse, subPagesResponse] = await Promise.all([
		client.getEntries<ContentfulPage>({
			content_type: 'page',
			select: ['fields.title', 'fields.slug', 'fields.parentPage'],
			include: 3,
			order: ['sys.createdAt'],
		}),
		client.getEntries<ContentfulPage>({
			content_type: 'subPage',
			select: ['fields.title', 'fields.slug', 'fields.parentPage'],
			include: 3,
			order: ['sys.createdAt'],
		}),
	])

	const { items: pages } = pagesResponse
	const { items: subPages } = subPagesResponse
	const allPages = [...pages, ...subPages] as unknown[] as ContentfulPage[]
	if (allPages.length === 0) {
		throw new Error('No pages found in the content management system')
	}
	const pageMap = new Map<string, SimplifiedPage>()
	const rootPages: SimplifiedPage[] = []
	// console.log('allPages', allPages)
	// First pass: Create simplified pages
	allPages.forEach((page: ContentfulPage) => {
		const simplified: SimplifiedPage = {
			id: page.sys.id,
			title: page.fields.title,
			slug: page.fields.slug,
			parentId: page.fields.parentPage?.sys?.id,
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
