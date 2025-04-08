import { PrimaryButton } from '../PrimaryButton'

interface TabsProps {
	tabs: string[]
	activeTab: string
	onTabChange: (tab: string) => void
}

export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
	return (
		<div className="flex justify-center gap-4 mb-8">
			{tabs.map((tab, index) => (
				<PrimaryButton
					key={index}
					outlined={activeTab === tab ? false : true}
					onClick={() => onTabChange(tab)}
				>
					{tab}
				</PrimaryButton>
			))}
		</div>
	)
}
