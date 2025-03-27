'use client'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

const containerStyle = {
	width: '100%',
	height: '400px',
}

export function GoogleMapComp({
	location,
}: {
	location: { lat: number; lng: number }
}) {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
	})

	if (!isLoaded) return <div>Loading...</div>

	return (
		<div className="mb-12">
			<h2 className="text-2xl font-bold mb-4">Location</h2>
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
		</div>
	)
}
