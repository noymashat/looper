import "./App.css";
import { useState } from "react";

import { Col } from "antd";
import Pad from "./Pad";

const App = () => {
	// load sound files
	const guitar = new Audio("./electric-guitar.mp3");
	const bass = new Audio("./funk-bass.mp3");
	const funkBeats = new Audio("./future-funk-beats.mp3");
	const grooveDrum = new Audio("./groove-drums.mp3");
	const tangguDrum = new Audio("./groove-tanggu.mp3");
	const organSynth = new Audio("./SilentStar-OrganSynth.mp3");
	const stutter = new Audio("./stutter-breakbeats.mp3");
	const drums = new Audio("./stompy-slosh.mp3");
	const maze = new Audio("./maze-politics.mp3");

	const [sounds, setSounds] = useState([
		[false, guitar],
		[false, bass],
		[false, funkBeats],
		[false, grooveDrum],
		[false, tangguDrum],
		[false, organSynth],
		[false, stutter],
		[false, drums],
		[false, maze],
	]);

	const update = (index, boolean) => {
		let array = [...sounds];
		array[index][0] = boolean ? true : false;
		setSounds(array);
	};

	const stopSync = (index) => {
		update(index, false);
		const someonePlaying = sounds.filter((sound) => sound[0] === true);
		sounds[index][1].pause();
		sounds[index][1].currentTime = 0;
		if (someonePlaying.length === 1) {
			sounds[index][1].addEventListener(
				"pause",
				() => {
					sounds.forEach((sound, i) => {
						if (sound[0]) {
							playSync(i);
						} else {
							sound[1].pause();
							sound[1].currentTime = 0;
						}
					});
				},
				false
			);
		}
	};

	const playSync = (index) => {
		const someonePlaying = sounds.filter((sound) => sound[0] === true);
		update(index, true);
		// if some sound is playing: start playing the sounds[index] after `some sound`
		if (someonePlaying.length > 0) {
			const first = someonePlaying[0];
			first[1].addEventListener(
				"ended",
				() => {
					sounds.forEach((sound) => {
						if (sound[0]) sound[1].play();
						else {
							sound[1].pause();
							sound[1].currentTime = 0;
						}
					});
				},
				false
			);
		}
		// no one is playing- start playing without any delay
		else {
			sounds[index][1].play();
		}
	};

	return (
		<div className="App">
			<header className="App-header">
				<Col>
					<Pad
						name={"0"}
						value={0}
						sound={guitar}
						playSync={playSync}
						update={update}
						stopSync={stopSync}
					/>
					<Pad
						name={"3"}
						value={3}
						sound={grooveDrum}
						playSync={playSync}
						update={update}
						stopSync={stopSync}
					/>
					<Pad
						name={"6"}
						value={6}
						sound={stutter}
						playSync={playSync}
						update={update}
						stopSync={stopSync}
					/>
				</Col>
				<Col>
					<Pad
						name={"1"}
						value={1}
						sound={bass}
						playSync={playSync}
						update={update}
						stopSync={stopSync}
					/>
					<Pad
						name={"4"}
						value={4}
						sound={tangguDrum}
						playSync={playSync}
						update={update}
						stopSync={stopSync}
					/>
					<Pad
						name={"7"}
						value={7}
						sound={drums}
						playSync={playSync}
						update={update}
						stopSync={stopSync}
					/>
				</Col>
				<Col>
					<Pad
						name={"2"}
						value={2}
						sound={funkBeats}
						playSync={playSync}
						update={update}
						stopSync={stopSync}
					/>
					<Pad
						name={"5"}
						value={5}
						sound={organSynth}
						playSync={playSync}
						update={update}
						stopSync={stopSync}
					/>
					<Pad
						name={"8"}
						value={8}
						sound={maze}
						playSync={playSync}
						update={update}
						stopSync={stopSync}
					/>
				</Col>
			</header>
		</div>
	);
};

export default App;
