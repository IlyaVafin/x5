import React, { useRef, useState } from 'react'
import './Header.css'
import logo from './../../assets/logo.png'
import Button from '../Button'

type HeaderProps = {
	resultHistory: number[] // Принимаем массив истории
}

const Header: React.FC<HeaderProps> = ({ resultHistory }) => {
	const [isAside, setAside] = useState<boolean>(false)
	const asideRef = useRef(null)
	let mounth = new Date().getMonth() + 1
	let year = new Date().getFullYear()
	let day = new Date().getDate()

	const showAside = () => {
		setAside(prev => {
			const newState = !prev;
	
			if (newState) {
				document.body.style.overflow = 'hidden'; 
			} else {
				document.body.style.overflow = 'auto'; 
			}
	
			return newState;
		});
	};

	return (
		<>
			<header className='header'>
				<div className='container'>
					<nav className='header__nav'>
						<ul className='header__list'>
							<li className='header__list-item'>
								<a href='' className='header__link'>
									<img width={200} height={75} src={logo} alt='' />
								</a>
							</li>
							<li className='header__list-item header-title'>
								Калькулятор заказов
							</li>
							<li className='header__list-item'>
								<Button onClick={showAside} width='178px' height='51px'>
									История
								</Button>
							</li>
						</ul>
					</nav>
				</div>
			</header>
			<section className='history__wrapper'>
				<div
					onClick={showAside}
					className={`history-overlay ${isAside ? 'show' : ''}`}
				></div>
				<aside ref = {asideRef} className={`history-aside ${isAside ? 'show' : ''}`}>
					<h3 className='history-title'>История расчетов</h3>
					<ul>
						{resultHistory.length > 0 ? (
							resultHistory.map((res, index) => (
								<li className='list-item' key={index}>
									{' '}
									{day}-0{mounth}-{year} Стоимость: {res}
								</li>
							))
						) : (
							<p>История пуста</p>
						)}
					</ul>
				</aside>
			</section>
		</>
	)
}

export default Header
