/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import { Text, Alert } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Controls from "./Controls";
import styles from "../styles/components/template.module.scss";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

interface TemplateProps {
	headLine: string;
	inputComponent: React.FC;
	elementComponent: JSX.Element;
	elementClassname: string;
	inputClassname: string;
	infoComponent: React.FC;
	controls: {
		onClear: Function;
		speed: number;
		setSpeed: Function;
		fastPlay: boolean;
		enable: boolean;
		onNext: Function;
		intervalID: number | undefined;
		setIntervalID: Function;
		setFastPlay:Function
	};
}


const Template: React.FC<TemplateProps> = ({
	headLine,
	inputComponent,
	elementComponent,
	elementClassname,
	inputClassname,
	infoComponent,
	controls,
}) => {
	const { onClear, speed, setSpeed, fastPlay, enable, onNext, intervalID, setIntervalID,setFastPlay } =
		controls;
	const onFastPlay = () => {
		if (fastPlay) {
			clearInterval(intervalID);
		} else {
			let XSpeed;
			switch (speed) {
				case 0.25:
					XSpeed = 2000;
					break;
				case 0.5:
					XSpeed = 1000;
					break;
				case 1.5:
					XSpeed = 50;
					break;
				case 2:
					XSpeed = 25;
					break;
				default:
					XSpeed = 500;
			}
			const btnElement = document.getElementById("next-btn");
			const intID = window.setInterval(() => {
				btnElement?.click();
			}, XSpeed);
			setIntervalID(intID);
		}
		setFastPlay(!fastPlay);
	};
	return (
		<div className={styles.visualizer}>
			<Text
				align="center"
				variant="gradient"
				gradient={{ from: "teal", to: "indigo", deg: 180 }}
				size="sm"
				weight={700}
				style={{ fontFamily: "Nunito, sans-serif", fontSize: "4rem", textAlign: "center" }}
			>
				{headLine}
			</Text>
			<div className={styles[inputClassname]}>{inputComponent}</div>
      <div className={styles[elementClassname]}>{elementComponent}</div>
			<Controls
				onClear={() => onClear()}
				speed={speed}
				setSpeed={setSpeed}
				onFastPlay={onFastPlay}
				enable={enable}
				onNext={onNext}
				fastPlay={fastPlay}
			/>
			<div className={styles.infoHolder}>
				<Alert icon={<FontAwesomeIcon icon={faInfo} size="lg" />} title="Quickie Recap" color="teal">
					{infoComponent}
				</Alert>
			</div>
		</div>
	);
};

export default Template;