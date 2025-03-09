import React, { useState, useEffect } from 'react'
import Header from './components/header/Header'
import './App.css'
import Calculator from './Calculator/Calculator'
import YandexMap from './components/YandexMap'

const App: React.FC = () => {
	const [result, setResult] = useState<number>(0)
	const [resultHistory, setResultHistory] = useState<number[]>([])
	const [distance, setDistance] = useState<string | null>(null)
	const [start, setStart] = useState('')
	const [end, setEnd] = useState('')
	
	useEffect(() => {
		const savedHistory = localStorage.getItem('resultHistory')
		if (savedHistory) {
			setResultHistory(JSON.parse(savedHistory))
		}
	}, [])

	const updateResult = (newResult: number) => {
		setResult(newResult)
		const updatedHistory = [...resultHistory, newResult] 
		setResultHistory(updatedHistory)
		localStorage.setItem('resultHistory', JSON.stringify(updatedHistory)) 
	}

	return (
		<>
			<Header resultHistory={resultHistory} />
			<YandexMap
				start={start}
				end={end}
				setStart={setStart}
				setEnd={setEnd}
				distance={distance}
				setDistance={setDistance}
			/>
			<Calculator
				start={start}
				end={end}
				distance={distance}
				result={result}
				setResult={updateResult}
			/>
		</>
	)
}

export default App
