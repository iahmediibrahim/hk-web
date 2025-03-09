import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export function ListComponent({
	list,
	listTextLink,
}: {
	list: string[]
	listTextLink?: string
}) {
	return (
		<ul className="list-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 my-12">
			{list.map((item, index) => {
				const checkIcon = (
					<FontAwesomeIcon
						icon={faCheck}
						className="w-4 h-4 md:w-5 md:h-5 mr-2"
						style={{
							color: 'white',
						}}
					/>
				)
				const ListItem = (
					<>
						{checkIcon}
						{item}
					</>
				)

				return listTextLink ? (
					<Link
						href={listTextLink}
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
