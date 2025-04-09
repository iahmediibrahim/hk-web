'use client'
import { Article } from '@/lib/contentful'
import { useState } from 'react'
import { Tabs } from '../Tabs'
import { HomeCard, HomeCardFields } from './HomeCard'

type ContentfulEntry<T> = {
	fields: T
	sys: {
		contentType: {
			sys: {
				id: string
			}
		}
	}
}

interface RenderListTabsProps {
	tabs: string[]
	items: Array<ContentfulEntry<HomeCardFields>> | Article[]
}

const RenderListTabs = ({ tabs, items }: RenderListTabsProps) => {
	const [activeTab, setActiveTab] = useState(tabs?.[0] ?? '')

	const isArticleList = items[0]?.sys?.contentType?.sys?.id === 'article'
	console.log('isArticleList', items)
	// Filtrar los elementos según el tipo de contenido y el tipo de tab activ
	const filteredItems = items?.filter((item) => {
		if (isArticleList) {
			return (item as Article).fields.type === activeTab
		}
		return (item as ContentfulEntry<HomeCardFields>).fields.type === activeTab
	})

	return (
		<div className="w-full">
			<Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
			<div
				className={`mt-20 grid grid-cols-1 gap-8 mx-4 ${
					filteredItems?.length === 1
						? 'lg:max-w-[600px] mx-auto  '
						: `lg:grid-cols-${
								filteredItems?.length < 3 ? filteredItems?.length : '3'
						  }`
				}`}
			>
				{filteredItems?.map((item, index) => {
					if (isArticleList) {
						const article = item as Article
						return (
							<HomeCard
								key={`home-card-${index}`}
								isArticle
								paragraph={article.fields.excerpt}
								title={article.fields.title}
								img={article.fields.img}
								id=""
								link={`/${article.fields.id}/blog/${article.fields.slug}`}
								date={article.fields.date}
							/>
						)
					}

					const contentfulEntry = item as ContentfulEntry<HomeCardFields>
					return (
						<HomeCard key={`home-card-${index}`} {...contentfulEntry.fields} />
					)
				})}
			</div>
		</div>
	)
}

export default RenderListTabs
