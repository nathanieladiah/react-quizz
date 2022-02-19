import React from "react"	

import Answer from "./Answer"

export default function Question(props) {
	const answerElements = props.answers.map(answer => (
		<Answer
			key={answer.answerId}
			value={answer.value}
			isCorrect={answer.isCorrect}
			isSelected={answer.isSelected}
			selectAnswer={() => props.selectAnswer(props.questionId, answer.answerId)}
			gameState={props.gameState}
		/>
	))

	return (
		<div className="question-wrapper">
			<h2 className="question">{props.question}</h2>
			<div className="answers">
				{answerElements}
			</div>
		</div>
	)
}