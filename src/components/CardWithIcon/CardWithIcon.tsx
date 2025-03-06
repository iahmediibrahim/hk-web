import { faUser, faUserNurse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface CardProps {
	icon: string
	heading: string
	paragraph?: string
}
const iconMap = {
	user: faUser,
	userNurse: faUserNurse,
}

export function CardWithIcon({ icon, heading, paragraph }: CardProps) {
	return (
		<div className={` w-full flex flex-wrap justify-center`}>
			<div className="w-full text-center my-2 flex justify-center">
				<div className="w-24">
					<FontAwesomeIcon
						icon={iconMap[icon as keyof typeof iconMap]}
						className="w-full h-full"
					/>
				</div>
			</div>
			<h2 className="mt-4 mb-3 text-xl w-full text-center">{heading}</h2>
			<p className="text-md text-center">{paragraph}</p>
		</div>
	)
}
