import { PrimaryButton } from '@/components'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function NotFound() {
	return (
		<section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100">
			<div className="text-center px-6">
				<h1 className="text-9xl font-extrabold text-gray-800 animate-pulse">
					404
				</h1>
				<div className="space-y-6 mt-8">
					<h2 className="text-3xl font-semibold text-gray-700">
						Oops! Page Not Found
					</h2>
					<p className="text-gray-500 max-w-md mx-auto">
						The page you are looking for seems to have vanished into the digital
						void.
					</p>
					<div className="mt-8 flex justify-center">
						<PrimaryButton href="/">
							<FontAwesomeIcon className="w-6 pr-2" icon={faHome} />
							Return Home
						</PrimaryButton>
					</div>
				</div>
			</div>
		</section>
	)
}
