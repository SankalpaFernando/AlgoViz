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
    onClear: Function,
    speed: number,
    setSpeed: Function,
    onFastPlay: Function,
    fastPlay: boolean,
    enable: boolean,
    onNext: Function
  }
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
	const { onClear, speed, setSpeed, onFastPlay, fastPlay, enable, onNext } =
		controls;
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