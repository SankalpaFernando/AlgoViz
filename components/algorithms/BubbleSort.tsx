/* eslint-disable no-new */
/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-implied-eval */
/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from "react";
import {
	Button,
	Group,
	Input,
	ActionIcon,
	Menu,
	Badge,
	Kbd,
	Text,
	Alert,
	Anchor,
} from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import {
	faPlay,
	faRotate,
	faAnglesRight,
	faForward,
	faCheck,
	faXmark,
	faInfo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isEmpty, isEqual } from "lodash";
import Template from "../Template";
import styles from "../../styles/components/bubblesort.module.scss";
import { isEqualOrder, onArrayChange, defaultArray, onArraySubmit } from "../../util/util";
import withTransition from "../../util/withTransition";
import Header from "../Header";

const BubbleSort: React.FC = (): JSX.Element => {
	const notifications = useNotifications();
	//Hooks
	const [array, setArray] = useState([...defaultArray]);
	const [currentStep, setCurrentStep] = useState(1);
	const [userInput, setUserInput] = useState("");
	const [index, setIndex] = useState(0);
	const [kIndex, setKIndex] = useState(0);
	const [sortedIndex, setSortedIndex] = useState<number[]>([]);
	const [enable, setEnable] = useState(false);
	const [fastPlay, setFastPlay] = useState(false);
	const [speed, setSpeed] = useState(1);
	const [intervalID, setIntervalID] = useState<number>();

	useEffect(() => {
		if (sortedIndex.length === array.length) {
			notifications.showNotification({
				message: "The Array Has Been Fully Sorted",
				color: "teal",
				style: { textAlign: "center" },
				disallowClose: true,
				icon: <FontAwesomeIcon icon={faCheck} />,
			});
			setEnable(true);
		}
	}, [sortedIndex]);

	const onNext = () => {
		const tempArray = array;
		if (array[index] > array[index + 1]) {
			const temp = array[index];
			array[index] = array[index + 1];
			array[index + 1] = temp;
			setArray([...array]);
		}
		if (index >= array.length - kIndex - 1) {
			setKIndex(kIndex + 1);
			setSortedIndex([...sortedIndex, index]);
			setIndex(0);
		} else {
			setIndex(index + 1);
		}
		if (isEqualOrder([...tempArray].sort(), array) && isEqual(array, sortedIndex)) {
			clearInterval(intervalID);
			setFastPlay(false);
		}
	};
	const onClear = () => {
		setCurrentStep(1);
		setIndex(0);
		setKIndex(0);
		setSortedIndex([]);
		setUserInput("");
		setEnable(false);
		setFastPlay(false);
		setArray([...defaultArray]);
		clearInterval(intervalID);
	};

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
	const onSubmitArray = () => {
		const newArray = onArraySubmit(
			userInput,
			(message: string) => {
				notifications.showNotification({
					message,
					color: "red",
					disallowClose: true,
					icon: <FontAwesomeIcon icon={faXmark} />,
				});
			},
			onClear,
			(num: number) => num,
			{ max: 100, min: 2 },
		);
		if (newArray) {
			setArray([...newArray]);
		}
	};
	return (
		<>
		<Header
				title="Bubble Sort"
				link="sort/bubblesort"
			/>
		<Template
			headLine="Bubble Sort"
			inputComponent={
				<Input
					onChange={(event: any) =>
						onArrayChange(event, setUserInput, () => {
							notifications.showNotification({
								message: "The Array must only contains numbers which separated with ,",
								color: "red",
								disallowClose: true,
								icon: <FontAwesomeIcon icon={faXmark} />,
							});
						})
					}
					placeholder="Input the Array with , Separated Numbers"
					size="lg"
					style={{ width: "100%" }}
					value={userInput}
					onKeyDown={(e: any) => {
						if (e.code === "Enter") {
							onSubmitArray();
						}
					}}
					rightSectionWidth={107}
					rightSection={
						<div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
							<Kbd>Enter</Kbd>
							<FontAwesomeIcon color="#63E6BE" size="lg" onClick={() => onSubmitArray()} icon={faPlay} />
						</div>
					}
				/>
			}
			elementComponent={
				<>
					{array.map((num, i) => {
						if (sortedIndex.includes(i)) {
							return <div className="green">{num}</div>;
						}
						if (i === index || i === index + 1) {
							return <div className="yellow">{num}</div>;
						}
						return (
							// eslint-disable-next-line react/jsx-key
							<div className="box">{num}</div>
						);
					})}
				</>
			}
			elementClassname="inline"
			inputClassname="inputGroup"
			infoComponent={
				<>
					Bubble Sort is the very basic mechanism that been used to sort an Array. Since the Bubble Sort
					Algorithm is simple to implement it has been used to introduce the concept of sorting. <br />
					<br />
					<b>Best Case Time Complexity :</b>{" "}
					<b>
						<i>O(n)</i>{" "}
					</b>{" "}
					<i>When array is already sorted</i>
					<br />
					<b>Worst and Average Case Time Complexity :</b>{" "}
					<b>
						<i>O(n*n)</i>{" "}
					</b>{" "}
					<i>When array is reversely sorted</i>
					<br />
					<br />{" "}
					<Anchor href="https://www.geeksforgeeks.org/bubble-sort/" target="_blank">
						For More Info{" "}
					</Anchor>
				</>
			}
			controls={{
				onClear,
				speed,
				setSpeed,
				intervalID,
				setIntervalID,
				setFastPlay,
				fastPlay,
				enable,
				onNext,
			}}
			/>
			</>
	);
};

export default withTransition(BubbleSort);
