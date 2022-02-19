import React from "react";
import { nanoid } from "nanoid";

import Question from "./Question";

var he = require('he');

// import response from "../data"
// import response from "../questions"


export default function Quiz(props) {

	// const [quizData, setQuizData] = React.useState(getQuizData())
	const [quizData, setQuizData] = React.useState([])

	React.useEffect(() => {
		// fetch("https://opentdb.com/api.php?amount=5&type=multiple")
		fetch("https://opentdb.com/api.php?amount=5&category=10&type=multiple")
		.then(response => response.json())
		.then(response => setQuizData(getQuizData(response)))
	}, [])

	// Call this parse data and use get quiz data to make the api call
	function getQuizData(response) {
		const data = response['results'].map(questionData => ({
			questionId: nanoid(),
			question: questionData['question'],
			// answers: [...questionData['incorrect_answers'], questionData['correct_answer']]
			answers: shuffle([...questionData['incorrect_answers'], questionData['correct_answer']]).map(answer => ({
				value: convertString(answer),
				isCorrect: answer === questionData['correct_answer'] ? true : false,
				isSelected: false,
				answerId: nanoid()
			}))
		}))
		return data
	}

	function shuffle(array) {
		let currentIndex = array.length, randomIndex;
		// While there remain elements to shuffle...
		while (currentIndex !== 0) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex], array[currentIndex]];
		}
		return array;
	}

	// Pass in the specific question and answer ids
	// function selectAnswer(question, answer) {
	// 	setQuizData(oldData => {
	// 		newData = []
	// 		for (let i = 0; i < oldData.length; i++) {
	// 			// need to copy all the data until the answers:
	// 			let newQuestionData = {
	// 				...oldData[i],
	// 				answers: []
	// 			}
	// 			// Check if the question is the one an answer is being selected for
	// 			if (oldData[i].questionId === question) {
	// 				// then update the answers
	// 			} else {
	// 				// copy the answers wholly

	// 			}
	// 		}
	// 	})
	// }

	function selectAnswer(question, answer) {
		setQuizData(oldData => {
			const newData = deepCopy(oldData)
			// Change the answers if the question matches
			for (let i = 0; i < oldData.length; i++) {
				if (oldData[i].questionId === question) {
					for (let j = 0; j < oldData[i]['answers'].length; j++) {
						oldData[i]['answers'][j]['answerId'] === answer ? newData[i]['answers'][j]['isSelected'] = true : newData[i]['answers'][j]['isSelected'] = false
					}
				}
			}
			return newData
		})
	}

	const deepCopy = (inObject) => {
		let outObject, value, key

		if (typeof inObject !== "object" || inObject === null) {
			return inObject
		}

		// Create an array or object to hold the values
		outObject = Array.isArray(inObject) ? [] : {}

		for (key in inObject) {
			value = inObject[key]

			// Recursively (deep) copy for nested objects, including arrays
			outObject[key] = deepCopy(value)
		}

		return outObject
	}
	
	function convertString(myString){
		return (
			myString.
			replace(/&amp;/g, "&").
			replace(/&gt;/g, ">").
			replace(/&lt;/g, "<").
			replace(/&quot;/g, "'").
			replace(/&#039;/g, "'")
		)
		// return myString.replace(/&#(\d+);/g, function(match, dec) {
		// 	return String.fromCharCode(dec);
		// });
	}

	function getResults() {
		let total = 0

		for (let i = 0; i < quizData.length; i++) {
			for (let j = 0; j < quizData[i]['answers'].length; j++) {
				if (quizData[i]['answers'][j].isCorrect && quizData[i]['answers'][j].isSelected) {
					total++;
				}
			}
		}
		return String(total)
	}

	const questionElements = quizData.map(questionData => (
		<Question 
			key={questionData.questionId}
			questionId={questionData.questionId}
			question={convertString(questionData.question)}
			// question={he.decode(questionData.question)}
			answers={questionData.answers}
			changeGameState={props.changeGameState}
			selectAnswer={selectAnswer}
			gameState={props.gameState}
		/>
	))

	return (
		<section className="quiz-wrapper">
			<div className="questions-container">
				{questionElements}
			</div>
			{props.gameState === 'Play' ? 
					<button className="check-answers" onClick={props.changeGameState}>
						Check answers
					</button>
				:
					<div className="score-card">
						<p>You scored {getResults()}/5 answers</p>
						<button className="check-answers" onClick={props.changeGameState}>Play again</button>
					</div>
			}
		</section>
	)
}