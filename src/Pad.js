import React, { useState, useEffect } from "react";
import "./Pad.css";

export default function Pad({
	name,
	value,
	sound,
	playSync,
	update,
	stopSync,
}) {
	const [on, setOn] = useState(false);

	// load audio file on component load
	useEffect(() => {
		// console.log("load sound ", value);
		sound.load();
	}, [sound, value]);

	// play audio sound
	const playSound = () => {
		playSync(value);
	};

	// stop audio sound
	const stopSound = () => {
		// console.log("STOP");
		// sound.pause();
		// update(value);
		// sound.currentTime = 0;
		stopSync(value);
	};

	const styleOn = {
		height: "100px",
		width: "100px",
		margin: "10px",
		outline: "none",
		border: "none",
		borderRadius: "4px",
		backgroundColor: "rgb(133, 65, 136)",
		boxShadow: "0 3px 0 rgb(83, 55, 87)",
		transform: "translateY(4px)",
	};
	const styleOff = {
		height: "100px",
		width: "100px",
		margin: "10px",
		outline: "none",
		border: "none",
		borderRadius: "4px",
		backgroundColor: "rgb(152,88,155)",
		boxShadow: "0 6px 0 rgb(114,76,120)",
	};
	const styleBtn = on ? styleOn : styleOff;

	const onClick = () => {
		setOn(!on);
		on ? stopSound() : playSound();
	};

	return (
		<div>
			<div>
				<button className="pad" style={styleBtn} onClick={onClick}>
					{value}
				</button>
			</div>
		</div>
	);
}
