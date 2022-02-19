import React from "react"

export default function Answer(props) {
	const styles = {
		border: props.isSelected ? "none"  : "0.794239px solid #4D5B9E",
		backgroundColor: props.isSelected ? "#d6dbf5" : "transparent"
	}

	const resultStyles = {
		border: props.isSelected || props.isCorrect ? "none"  : "0.794239px solid #4D5B9E",
		backgroundColor: props.isCorrect ? "#94D7A2" : props.isSelected && !props.isCorrect ? "#F8BCBC" : "transparent",
		opacity: props.isCorrect ? 1 : 0.5
	}

	// if (props.gameState === 'Play') {
	// 	const styles = {
	// 		border: props.isSelected ? "none"  : "0.794239px solid #4D5B9E",
	// 		backgroundColor: props.isSelected ? "#d6dbf5" : "transparent"
	// 	}
	// } else if (props.gameState === 'Results') {
	// 	const styles = {
	// 		backgroundColor: props.isCorrect ? "#94D7A2" : props.isSelected && !props.isCorrect ? "#F8BCBC" : "transparent"
	// 	}
	// }

	function changeBackground(e) {
		if (!props.isSelected && props.gameState === 'Play') {
			e.target.style.background = "#d6dbf5";
		}
	}

	function resetBackground(e) {
		if (!props.isSelected && props.gameState === 'Play') {
			e.target.style.background = "transparent";
		}
	}

	return (
		<button 
			className="answer-choice" 
			style={props.gameState === 'Play' ? styles : resultStyles} 
			onMouseEnter={changeBackground} 
			onMouseLeave={resetBackground}
			onClick={props.selectAnswer}
		>
			{props.value}
		</button>
	)
}