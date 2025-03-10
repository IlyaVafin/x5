import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'

type YandexMapProps = {
	distance: string | null
	setDistance: (newDistance: number) => void
	start: string
	end: string
	setStart: React.Dispatch<React.SetStateAction<string>>
	setEnd: React.Dispatch<React.SetStateAction<string>>
}

const YandexMap: React.FC<YandexMapProps> = ({
	distance,
	setDistance,
	start,
	end,
	setStart,
	setEnd,
}) => {
	const [routeType, setRouteType] = useState<'auto' | 'pedestrian' | 'bicycle'>('auto')
	const mapRef = useRef<HTMLDivElement>(null)
	const mapInstance = useRef<any>(null)


	useEffect(() => {
		if (!window.ymaps) return

		if (!mapInstance.current) {
			window.ymaps.ready(() => {
				mapInstance.current = new window.ymaps.Map(
					mapRef.current as HTMLElement,
					{
						center: [55.796127, 49.106414], 
						zoom: 10,
					}
				)
			})
		}
	}, [])

	const buildRoute = () => {
		if (!start || !end || !mapInstance.current) return

		const startAddress = `${start}, Казань`
		const endAddress = `${end}, Казань`

		const geocoder = window.ymaps.geocode

		geocoder(startAddress).then(resultStart => {
			const startCoordinates = resultStart.geoObjects
				.get(0)
				?.geometry.getCoordinates()

			geocoder(endAddress).then(resultEnd => {
				const endCoordinates = resultEnd.geoObjects
					.get(0)
					?.geometry.getCoordinates()

				if (startCoordinates && endCoordinates) {
					mapInstance.current.geoObjects.removeAll()

					const route = new window.ymaps.multiRouter.MultiRoute(
						{
							referencePoints: [startCoordinates, endCoordinates],
							params: { routingMode: routeType },
						},
						{ boundsAutoApply: true }
					)

					route.model.events.add('requestsuccess', () => {
						const activeRoute = route.getActiveRoute()
						if (activeRoute) {
							const rawDistance = activeRoute.properties.get('distance').text
							const numericDistance = rawDistance.replace(/[^0-9,]/g, '') 
							const normalizedDistance = numericDistance.replace(',', '.') 

							const distanceValue = parseFloat(normalizedDistance)

							if (!isNaN(distanceValue)) {
								setDistance(distanceValue)
							}
						}
					})
					mapInstance.current.geoObjects.add(route)
				}
			})
		})
	}

	return (
		<div className='route'>
			<h2>Построение маршрута</h2>
			<input
			className='input'
				type='text'
				placeholder='Начальный адрес'
				value={start}
				onChange={e => setStart(e.target.value)}
			/>
			<input
			className='input'
				type='text'
				placeholder='Конечный адрес'
				value={end}
				onChange={e => setEnd(e.target.value)}
			/>
			<div>
				<h4 className='type-route' style={{textAlign: 'center', marginBottom: '10px'}}>Выберите тип маршрута</h4>
				<label>
					<input 
						type='radio' 
						name='routeType' 
						value='auto' 
						checked={routeType === 'auto'}
						onChange={() => setRouteType('auto')} 
					/>
					На автомобиле
				</label>
				<label>
					<input 
						type='radio' 
						name='routeType' 
						value='pedestrian' 
						checked={routeType === 'pedestrian'}
						onChange={() => setRouteType('pedestrian')} 
					/>
					Пешком
				</label>
				<label>
					<input 
						type='radio' 
						name='routeType' 
						value='bicycle' 
						checked={routeType === 'bicycle'}
						onChange={() => setRouteType('bicycle')} 
					/>
					Велосипед
				</label>
			</div>
			<Button width='200px' height='50px' onClick={buildRoute}>
				Построить маршрут
			</Button>
			{distance !== null && <p className='length-route'>Длина маршрута: {distance} км</p>}
			<div style={{ width: '100%', height: '400px', background: '#f0f0f0', marginBottom: '40px' }} ref={mapRef} />
		</div>
	)
}

export default YandexMap
