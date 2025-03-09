import React, { useState } from 'react'
import Button from '../components/Button'

type CalculatorProps = {
	setResult: (newResult: number) => void
	result: number
	distance: string | null
	start: string
	end: string
}

const Calculator: React.FC<CalculatorProps> = ({
	setResult,
	result,
	distance,
	start,
	end,
}) => {
	const [weight, setWeight] = useState<string>('')
	const [error, setError] = useState<string>('')

	const calcFunc = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const weightNumber = Number(weight)

		// Проверка на корректность ввода веса
		if (isNaN(weightNumber) || weightNumber <= 0) {
			setError('Введите корректное число')
			return // Если вес некорректен, выходим
		}

		if (start.trim() === '' || end.trim() === '') {
			setError('Введите адреса')
			return
		}

		if (distance == '0' || distance == null) {
			setError('Постройте маршрут!')
			return
		}

		if (weight.includes(',')) {
			setError('Введите десятичное число через точку')
			return
		}

		setError('')
		if (distance !== null) {
			const newResult = Math.round(
				157 + weightNumber * 2 + Number(distance) * 5
			)
			setResult(newResult)
		}
	}

	return (
		<>
			<h2 className='calc-title'>Расчет</h2>
			<form onSubmit={calcFunc}>
				<label className='weight' htmlFor='weight'>
					<p style={{ marginBottom: '10px' }}>Килограммы</p>
					<input
					className='input'
						onChange={e => setWeight(e.target.value)}
						value={weight}
						name='weight'
						id='weight'
						type='text'
						maxLength={3}
						placeholder='Введите вес'
					/>
					<span className='error'>{error}</span>
				</label>
				<p className='result'>Стоимость заказа: {result} руб.</p>
				<Button width='300px' height='50px'>
					Рассчитать
				</Button>
			</form>
		</>
	)
}

export default Calculator
