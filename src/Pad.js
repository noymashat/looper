import React, { useState, useEffect } from "react";
export default function Pad({
	name,
	value,
	sound,
	playSync,
	stopSync,
	update,
}) {
	const [on, setOn] = useState(false);

	// load audio file on component load
	useEffect(() => {
		sound.load();
	}, [sound]);

	// play audio sound
	const playSound = () => {
		update(value, true); // turn sound's boolean state to true = wants to play
		playSync(value);
	};

	// stop audio sound
	const stopSound = () => {
		update(value, false); // turn sound's boolean state to false = wants to stop
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
		fontFamily: "Monospace",
		fontWeight: "bold",
		fontSize: "15px",
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
		fontFamily: "Monospace",
		fontWeight: "bold",
		fontSize: "15px",
	};

	const styleBtn = on ? styleOn : styleOff;

	const onClick = () => {
		setOn(!on);
		on ? stopSound() : playSound();
	};
	let nameNewline = name.replace(" ", "\n");

	return (
		<div>
			<div>
				<button className="pad" style={styleBtn} onClick={onClick}>
					{nameNewline}
				</button>
			</div>
		</div>
	);
}
