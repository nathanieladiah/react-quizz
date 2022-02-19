import React from "react";

export default function Cover(props){
	return (
		<section className="cover-section">
			<h1>Quizzical</h1>
			<p>Some description if needed</p>
			<button onClick={props.changeGameState}>
				Start quiz
			</button>
		</section>
	)
}