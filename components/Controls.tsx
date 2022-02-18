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
	onFastPlay: Function;
	enable: boolean;
	onNext: Function;
	fastPlay: boolean;
};

const Controls: React.FC<ControlsProps> = ({
	onClear,
	speed,
	setSpeed,
	onFastPlay,
	enable,
	onNext,
	fastPlay,
}) => (
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

export default Controls;
