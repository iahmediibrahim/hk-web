import { SimplifiedPage } from '@/lib/contentful/types'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MobileNavItem } from '../MobileNavItem'

export function MobileMenu({
	pages,
	pathname,
	onClose,
	isOpen,
}: {
	pages: SimplifiedPage[]
	pathname: string
	onClose: () => void
	isOpen: boolean
}) {
	return (
		<div
			className={`lg:hidden fixed inset-0 bg-black/50 z-50 ${
				isOpen ? 'block' : 'hidden'
			}`}
		>
			<div className="absolute top-0 left-0 w-64 h-full bg-white shadow-lg p-4 overflow-y-auto">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-lg font-semibold">Menu</h3>
					<button onClick={onClose} className="p-2 text-2xl">
						<FontAwesomeIcon icon={faXmark} />
					</button>
				</div>
				<div className="space-y-2">
					{pages.map((page) => (
						<MobileNavItem
							key={page.id}
							page={page}
							pathname={pathname}
							onClose={onClose}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
