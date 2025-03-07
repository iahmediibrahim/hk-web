import {
	faBusinessTime,
	faClipboardCheck,
	faClipboardList,
	faClipboardUser,
	faRankingStar,
	faSterlingSign,
	faUserNurse,
	faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface CardProps {
	iconId: string
	heading: string
	paragraph?: string
	colorVar: string
}

const iconMap = {
	team: faUsers,
	time: faBusinessTime,
	recruitment: faUserNurse,
	compliance: faClipboardList,
	profiling: faClipboardUser,
	training: faClipboardCheck,
	quality: faRankingStar,
	referral: faSterlingSign,
}

export function CardWithIcon({
	iconId,
	heading,
	paragraph,
	colorVar,
}: CardProps) {
	return (
		<div className="group w-full p-6 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-gray-100">
			<div className="flex flex-col items-center">
				<div
					className="w-20 h-20 mb-6 rounded-2xl flex items-center justify-center  transform rotate-3 group-hover:rotate-0   transition-transform duration-300"
					style={{
						background: `linear-gradient(to bottom right, var(--${colorVar}), #000000)`,
					}}
				>
					<FontAwesomeIcon
						icon={iconMap[iconId as keyof typeof iconMap]}
						className="w-10 h-10 text-white"
					/>
				</div>
				<h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
					{heading}
				</h2>
				{paragraph && (
					<div className="w-full">
						<div
							className="text-gray-600 text-base sm:text-lg leading-relaxed text-center prose prose-blue max-w-none"
							dangerouslySetInnerHTML={{ __html: paragraph }}
						/>
					</div>
				)}
			</div>
		</div>
	)
}
