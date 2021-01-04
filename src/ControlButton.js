import "./ControlButton.css";
import React from "react";
import PlayArrowSharpIcon from "@material-ui/icons/PlayArrowSharp";
import StopSharpIcon from "@material-ui/icons/StopSharp";

export default function ControlButton({ value, playAllOn, stopAllAndRewind }) {
	
	const playBtnStyle = (toggle) => {
		let sheet = document.createElement("style");
		if (!toggle) {
			sheet.innerHTML =
				".control1 {transform: scale(0.9); color: rgb(102, 55, 104);} .control2 {transform: scale(1); color: rgb(152, 88, 155);}";
		} else {
			sheet.innerHTML =
				".control1 {transform: scale(1); color: rgb(152, 88, 155);} .control2 {transform: scale(0.9); color: rgb(102, 55, 104);}";
		}
		document.body.appendChild(sheet);
	};

	const playAll = () => {
		playBtnStyle(false);
		playAllOn();
	};

	const stopAll = () => {
		playBtnStyle(true);
		stopAllAndRewind();
	};

	return (
		<div>
			{value ? (
				<PlayArrowSharpIcon className="control1" onClick={playAll} />
			) : (
				<StopSharpIcon className="control2" onClick={stopAll} />
			)}
		</div>
	);
}
