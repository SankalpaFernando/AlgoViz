/* eslint-disable @typescript-eslint/ban-types */
import React from "react";

import { Button, Group, Menu, Badge } from "@mantine/core";
import { faRotate, faAnglesRight, faForward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/components/control.module.scss";

type ControlsProps = {
	onClear: Function;
	speed: number;
	setSpeed: Function;
	enable: boolean;
	onNext: Function;
	fastPlay: boolean;
	intervalID: number | undefined;
	setIntervalID: Function;
	setFastPlay:Function;
};

const Controls: React.FC<ControlsProps> = ({
	onClear,
	speed,
	setSpeed,
	enable,
	onNext,
	fastPlay,
	intervalID,
	setIntervalID,
	setFastPlay
}) => {
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
		<div className={styles.btnGroup}>
			<Group>
				<Button
					onClick={() => {
						onClear();
					}}
					variant="light"
					color="teal"
					leftIcon={<FontAwesomeIcon icon={faRotate} />}
				>
					Reset
				</Button>
				<Menu
					control={
						<Badge style={{ height: "34px" }} color="teal" radius="xs" size="lg">
							{`Speed ${speed}x`}
						</Badge>
					}
				>
					<Menu.Item onClick={() => setSpeed(0.25)}>0.25x</Menu.Item>
					<Menu.Item onClick={() => setSpeed(0.5)}>0.5x</Menu.Item>
					<Menu.Item onClick={() => setSpeed(1)}>1x</Menu.Item>
					<Menu.Item onClick={() => setSpeed(1.5)}>1.5x</Menu.Item>
					<Menu.Item onClick={() => setSpeed(2)}>2x</Menu.Item>
				</Menu>
				<Button
					variant="light"
					color="teal"
					id="download-btn"
					onClick={() => onFastPlay()}
					rightIcon={<FontAwesomeIcon icon={faForward} />}
				>
					{fastPlay ? "Stop Fast Play" : `Fast Play on ${speed}x`}
				</Button>
				<Button
					disabled={enable}
					variant="light"
					color="teal"
					id="next-btn"
					onClick={() => onNext()}
					rightIcon={<FontAwesomeIcon icon={faAnglesRight} />}
				>
					Next
				</Button>
			</Group>
		</div>
	);
};

export default Controls;
