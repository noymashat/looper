import "./App.css";
import { useState, useEffect } from "react";

import { Col, Row } from "antd";
import Pad from "./Pad";
import ControlButton from "./ControlButton";

const App = () => {
	// load sound files
	const guitar = new Audio("./electric-guitar.mp3");
	const bass = new Audio("./funk-bass.mp3");
	const funkBeats = new Audio("./future-funk-beats.mp3");
	const grooveDrum = new Audio("./groove-drums.mp3");
	const tangguDrum = new Audio("./groove-tanggu.mp3");
	const organSynth = new Audio(
		"gs://looper--app.appspot.com/SilentStar-OrganSynth.mp3"
	);
	const stutter = new Audio("./stutter-breakbeats.mp3");
	const drums = new Audio("./stompy-slosh.mp3");
	const maze = new Audio("./maze-politics.mp3");

	// an array of sounds and their boolean states = if true, this sound should be played
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
	// useEffect(() => {}, [sounds]);

	const [play, setPlay] = useState(false);

	const playAllOn = () => {
		// indicates play button is pressed
		setPlay(true);
		// keep sounds with `true` playing in loop
		sounds.forEach((sound) => {
			if (sound[0]) {
				sound[1].play();
				sound[1].addEventListener(
					"ended",
					() => {
						if (sound[0]) {
							sound[1].play();
						}
					},
					false
				);
			}
		});
	};

	const stopAllAndRewind = () => {
		// indicates stop button is pressed
		setPlay(false);
		// stop all sounds
		sounds.forEach((sound) => {
			// sound[0] = false;
			sound[1].pause();
			sound[1].currentTime = 0;
		});
	};

	// update the boolean state of a sound in sounds array
	const update = (index, boolean) => {
		let array = [...sounds];
		array[index][0] = boolean;
		setSounds(array);
	};

	// if the play button is on,
	// if someone else(!) is true = already playing, wait until it ends, then call playAllOn()
	// else, call playAllOn() immediately
	const playSync = (index) => {
		if (play) {
			// filter to leave only other playing sounds
			let someonePlaying = sounds.map((sound, i) => {
				if (sound[0] === true) {
					return { id: i, audio: sound[1] };
				}
			});
			someonePlaying = someonePlaying.filter((sound) => sound !== undefined);
			const otherSound = someonePlaying.filter((sound) => sound.id !== index);
			// someone else is playing
			if (otherSound.length > 0) {
				otherSound[0].audio.addEventListener(
					"ended",
					() => {
						playAllOn();
					},
					false
				);
			}
			// no one else is playing
			else {
				playAllOn();
			}
		}
	};

	// if the play button is on,
	// when current sound ends (sounds[index]),
	// if the boolen state is true = someone turned this sound again - start playing it again
	// else, boolean state is false = this sound needs to be stopped - stop it and rewind
	const stopSync = (index) => {
		if (play) {
			sounds[index][1].addEventListener(
				"ended",
				() => {
					if (sounds[index][0]) {
						sounds[index][1].play();
					} else {
						sounds[index][1].pause();
						sounds[index][1].currentTime = 0;
					}
				},
				false
			);
		}
	};

	return (
		<div className="App">
			<header className="App-header">
				<div className="pads">
					<Col>
						<Pad
							name={"Electric Guitar"}
							value={0}
							sound={guitar}
							update={update}
							playSync={playSync}
							stopSync={stopSync}
						/>
						<Pad
							name={"Groove Drums"}
							value={3}
							sound={grooveDrum}
							update={update}
							playSync={playSync}
							stopSync={stopSync}
						/>
						<Pad
							name={"Stutter Breakbeats"}
							value={6}
							sound={stutter}
							update={update}
							playSync={playSync}
							stopSync={stopSync}
						/>
					</Col>
					<Col>
						<Pad
							name={"Funk Bass"}
							value={1}
							sound={bass}
							update={update}
							playSync={playSync}
							stopSync={stopSync}
						/>
						<Pad
							name={"Groove Tanggu"}
							value={4}
							update={update}
							sound={tangguDrum}
							playSync={playSync}
							stopSync={stopSync}
						/>
						<Pad
							name={"Stompy Slosh"}
							value={7}
							sound={drums}
							update={update}
							playSync={playSync}
							stopSync={stopSync}
						/>
					</Col>
					<Col>
						<Pad
							name={"Future Funk Beats"}
							value={2}
							sound={funkBeats}
							update={update}
							playSync={playSync}
							stopSync={stopSync}
						/>
						<Pad
							name={"Silent Star"}
							value={5}
							sound={organSynth}
							update={update}
							playSync={playSync}
							stopSync={stopSync}
						/>
						<Pad
							name={"Maze Politics"}
							value={8}
							sound={maze}
							update={update}
							playSync={playSync}
							stopSync={stopSync}
						/>
					</Col>
				</div>
				<div className="controls">
					<ControlButton
						value={true}
						playAllOn={playAllOn}
						stopAllAndRewind={() => {}}
					/>
					<ControlButton
						value={false}
						playAllOn={() => {}}
						stopAllAndRewind={stopAllAndRewind}
					/>
				</div>
			</header>
		</div>
	);
};

export default App;

// --- old play
// if(play)
// const someonePlaying = sounds.filter((sound) => sound[0] === true);
// // update(index, true);
// // if some sound is playing - start playing the sounds[index] after `someSound`
// if (someonePlaying.length > 0) {
// 	const someSound = someonePlaying[0];
// 	someSound[1].addEventListener(
// 		"ended",
// 		() => {
// 			console.log("2: ", sounds);

// 			sounds.forEach((sound, i) => {
// 				if (sound[0]) {
// 					sound[1].play();
// 				} else {
// 					sound[1].pause();
// 					sound[1].currentTime = 0;
// 				}
// 			});
// 		},
// 		false
// 	);
// }
// // no one is playing- start playing without any delay
// else {
// 	sounds[index][1].play();
// }

//----old stop
// if(play)
// update(index, false);
// const someonePlaying = sounds.filter((sound) => sound[0] === true);
// if (someonePlaying.length > 0) {
// console.log("3: ", sounds);
// sounds[index][1].addEventListener(
// 	"pause",
// 	() => {
// 		sounds.forEach((sound, i) => {
// 			if (sound[0]) {
// 				sound[1].play();
// 				sound[1].addEventListener(
// 					"ended",
// 					() => {
// 						if (sound[0]) {
// 							sound[1].play();
// 						}
// 					},
// 					false
// 				);
// 			} else {
// 				sound[1].pause();
// 				sound[1].currentTime = 0;
// 			}
// 		});
// 	},
// 	false
// );
// }
