import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export function ListComponent({
	list,
	colorVar,
}: {
	list: {
		text: string
		linkTo?: string
	}[]
	colorVar?: string
}) {
	return (
		<ul className="list-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 my-12">
			{list.map((item, index) => {
				const checkIcon = (
					<FontAwesomeIcon
						icon={faCheck}
						className="w-4 h-4 md:w-5 md:h-5 mr-2"
						style={{
							color: `var(--${colorVar})`,
						}}
					/>
				)
				const ListItem = (
					<>
						{checkIcon}
						{item.text}
					</>
				)

				return item.linkTo ? (
					<Link
						href={item.linkTo}
						key={`list-item-${index}`}
						className="flex items-center text-sm md:text-base"
					>
						{ListItem}
					</Link>
				) : (
					<li
						key={`list-item-${index}`}
						className="flex items-center text-sm md:text-base"
					>
						{ListItem}
					</li>
				)
			})}
		</ul>
	)
}
