'use client'
import { useState } from 'react'
import { Tabs } from '../Tabs'
import { HomeCard, HomeCardFields } from './HomeCard'

type ContentfulEntry<T> = {
	fields: T
}

interface RenderListTabsProps {
	tabs: string[]
	items: Array<ContentfulEntry<HomeCardFields>>
}

const RenderListTabs = ({ tabs, items }: RenderListTabsProps) => {
	const [activeTab, setActiveTab] = useState(tabs?.[0] ?? '')
	const filteredItems = items?.filter((item) => item.fields?.type === activeTab)
	return (
		<div className="w-full">
			<Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
			<div
				className={`mt-20 grid grid-cols-1 gap-8 mx-4 lg:grid-cols-${
					filteredItems?.length < 3 ? filteredItems?.length : '3'
				} place-items-center`}
			>
				{filteredItems?.map((item, index) => (
					<HomeCard key={`home-card-${index}`} {...item.fields} />
				))}
			</div>
		</div>
	)
}

export default RenderListTabs
