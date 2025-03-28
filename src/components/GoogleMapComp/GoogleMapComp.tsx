'use client'
import { Location } from '@/lib/contentful'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

const containerStyle = {
	width: '100%',
	height: '400px',
}

export function GoogleMapComp({ location }: { location: Location }) {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API || '',
	})

	if (!isLoaded) return <div>Loading...</div>

	return (
		<div className="bg-white rounded-2xl shadow-sm mb-8 sm:mb-12">
			<div className="h-[400px] rounded-lg overflow-hidden">
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={{
						lat: location.lat,
						lng: location.lng,
					}}
					zoom={15}
				>
					<Marker
						position={{
							lat: location.lat,
							lng: location.lng,
						}}
					/>
				</GoogleMap>
			</div>
			<p className="location-address text-gray-600 p-4">
				<FontAwesomeIcon icon={faLocationDot} className="mr-2" />
				{location.formattedAddress}
			</p>
		</div>
	)
}
