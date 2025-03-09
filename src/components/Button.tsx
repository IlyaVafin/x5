import React from 'react'
import styled from 'styled-components'

const ButtonStyle = styled.button<{ width?: string; height?: string }>`
	width: ${props => props.width || 'auto'};
	height: ${props => props.height || 'auto'};
	border-radius: 0.375rem;
	border: none;
	font-family: DM Sans;
	font-weight: 400;
	font-size: 1.0625rem;
	line-height: 1.6875rem;
	letter-spacing: 0%;
	color: #fff;
	background: #118da8;
	cursor: pointer;
	transition: all 0.5s ease;
	font-family: 'DM Sans', sans-serif;


	&:active {
		transform: scale(0.95);
	}

	@media (max-width: 600px) {
		width: 150px;
		margin-right: 10px;
	}
`

type Props = {
	children: React.ReactNode
	width?: string
	height?: string
	onClick?: () => void
}

const Button: React.FC<Props> = ({ children, width, height, onClick }) => {
	return (
		<ButtonStyle
			onClick={onClick}
			height={height}
			width={width}
			className='button-component'
		>
			{children}
		</ButtonStyle>
	)
}

export default Button
