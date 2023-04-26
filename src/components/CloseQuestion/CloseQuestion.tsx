import React from "react";
import RadioInput from "components/RadioInput/RadioInput";
import style from "./CloseQuestion.module.css";

type Props = {
	questionIndex: number;
	description: string;
	chosenAnswer: number;
	rightAnswer: number;
	options: { text: string; explanation: string }[];
	isSubmitted: boolean;
	onChoose: (id: number, option: number) => void;
};

export default function CloseQuestion({
	questionIndex,
	description,
	options,
	onChoose,
	chosenAnswer,
	rightAnswer,
	isSubmitted,
}: Props) {
	const onClickHandler = (indexOption: number) => {
		onChoose(questionIndex, indexOption);
	};

	return (
		<div className={style["close-question"]}>
			<h2>{description}</h2>
			<div className={style.options}>
				{/* eslint-disable */}
				{options.map((option, index) => (
					<RadioInput
						isDisable={isSubmitted}
						key={`${questionIndex}option${index}`}
						onClick={onClickHandler}
						isChecked={chosenAnswer === index}
						isCorrect={rightAnswer === chosenAnswer}
						index={index}
						optionText={option.text}
						explanationText={option.explanation}
					/>
				))}
			</div>
		</div>
	);
}
