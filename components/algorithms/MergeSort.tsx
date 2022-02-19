/* eslint-disable no-var */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { Input, Kbd, Anchor } from "@mantine/core";
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
import { isEmpty } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Template from "../Template";
import { isEqualOrder, onArrayChange, onArraySubmit, isDeepEmpty } from "../../util/util";
import styles from "../../styles/components/mergesort.module.scss";
import withTransition from "../../util/withTransition";

const MergeSort: React.FC = () => {
	const notifications = useNotifications();
	const initArray = [
		{ value: 7, sorted: false },
		{ value: 1, sorted: false },
		{ value: 5, sorted: false },
		{ value: 2, sorted: false },
		{ value: 3, sorted: false },
		{ value: 6, sorted: false },
		{ value: 7, sorted: false },
		{ value: 9, sorted: false },
	];
	const [defaultArray, setDefaultArray] = useState([...initArray]);
	const [array, setArray] = useState([[[...defaultArray]], [], [], []]);
	const [currentArray, setCurrentArray] = useState([...defaultArray]);
	const [currentPosition, setCurrentPosition] = useState(0);
	const [currentNode, setCurrentNode] = useState(0);
	const [position, setPosition] = useState(0);
	const [positionTwo, setPositionTwo] = useState(-1);
	const [positionThree, setPositionThree] = useState(0);
	const [complete, setComplete] = useState(false);
	const [rightSection, setRightSection] = useState(false);
	const [cindex, setCIndex] = useState(0);
	const [L, setL] = useState(0);
	const [R, setR] = useState(defaultArray.length - 1);
	const [fastPlay, setFastPlay] = useState(false);
	const [speed, setSpeed] = useState(1);
	const [intervalID, setIntervalID] = useState<number>();
	const [userInput, setUserInput] = useState("");
	const [enable, setEnable] = useState(false);
	const [sortedIndex, setSortedIndex] = useState([]);

	useEffect(() => {
		console.log(array);
	}, [array]);

	const mergeLevelTwo = () => {
		const arrOne = [...array[2][positionTwo + 1]];
		const arrTwo = [...array[2][positionTwo + 2]];
		if (array[1][positionThree][position]?.value != undefined) {
			array[1][positionThree][position] = { value: undefined, sorted: false };
			setArray([...array]);
			return;
		}

		if (arrOne[0]?.value > arrTwo[0]?.value || arrOne[0]?.value == undefined) {
			array[1][positionThree][position] = { ...arrTwo[0] };
			array[2][positionTwo + 2].shift();
		} else {
			array[1][positionThree][position] = { ...arrOne[0] };
			array[2][positionTwo + 1].shift();
		}
		array[1][positionThree][position].sorted = true;
		setPosition(position + 1);
		setArray([...array]);
		if (array[2][0].length == 0 && array[2][1].length == 0 && positionTwo == -1) {
			setPositionTwo(positionTwo + 2);
			setPositionThree(1);
			setPosition(0);
		}
	};

	const mergeLevelThree = () => {
		const tempOne = array[3][currentPosition][0];
		const tempTwo = array[3][currentPosition + 1][0];
		if (tempOne.value > tempTwo.value) {
			array[2][currentNode][0] = { ...tempTwo };
			array[2][currentNode][1] = { ...tempOne };
		} else {
			array[2][currentNode][0] = { ...tempOne };
			array[2][currentNode][1] = { ...tempTwo };
		}
		array[2][currentNode][0].sorted = true;
		array[2][currentNode][1].sorted = true;
		delete array[3][currentPosition][0];
		delete array[3][currentPosition + 1][0];
		setArray([...array]);
		setCurrentPosition(currentPosition + 2);
		setCurrentNode(currentNode + 1);
	};
	const mergeLevelOne = () => {
		const arrOne = array[1][0];
		const arrTwo = array[1][1];
		if (array[0][0][position]?.value != undefined) {
			array[0][0][position] = { value: undefined, sorted: false };
			setArray([...array]);
			return;
		}
		if (arrOne[0]?.value > arrTwo[0]?.value || arrOne[0]?.value === undefined) {
			array[0][0][position] = { ...arrTwo[0] };
			array[1][positionTwo + 2].shift();
		} else {
			array[0][0][position] = { ...arrOne[0] };
			array[1][positionTwo + 1].shift();
		}
		array[0][0][position].sorted = true;
		sortedIndex.push(array[0][0][position]);
		setSortedIndex([...sortedIndex]);
		setPosition(position + 1);
		setArray([...array]);
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
	const onNext = () => {
		const sort = (a, b) => {
			if (a.value === b.value) return 0;

			return a.value < b.value ? -1 : 1;
		};

		if (isEqualOrder([...defaultArray].sort(sort), array[0][0], "value") && sortedIndex.length == 8) {
			clearInterval(intervalID);
			notifications.showNotification({
				message: "The Array Has Been Fully Sorted",
				color: "teal",
				style: { textAlign: "center" },
				disallowClose: true,
				icon: <FontAwesomeIcon icon={faCheck} />,
			});
			setEnable(true);
			return;
		}
		if (cindex == 3 && !rightSection) {
			mergeLevelThree();
			setRightSection(true);
			setCIndex(cindex - 1);
			return;
		}
		if (cindex == 1 && rightSection) {
			mergeLevelThree();
			setRightSection(false);
			const len = currentPosition == 2 ? 1 : 2;
			setCurrentArray(array[len][1]);
			setL(0);
			setR(3);
			setCIndex(1);
			setComplete(true);
			return;
		}
		if (rightSection) {
			const len = array[cindex + 1].length == 6 ? 3 : 1;
			const cArr = array[cindex][len];
			setCurrentArray([...cArr]);
			setL(0);
			setR(cArr.length);
			const m = L + parseInt((cArr.length - L) / 2);
			array[cindex + 1].push(cArr.slice(L, m));
			array[cindex + 1].push(cArr.slice(m, cArr.length));
			setCIndex(1);
			return;
		}
		if (cindex == 1 && currentPosition == 8) {
			if (isDeepEmpty(array[2])) {
				if (complete) {
					setComplete(false);
					setPosition(0);
					setPositionTwo(-1);
					setPositionThree(0);
					return;
				}
				mergeLevelOne();
				return;
			}
			setRightSection(false);
			mergeLevelTwo();
			return;
		}
		if (complete) {
			mergeLevelTwo();
			if (isEmpty(array[2][0]) && isEmpty(array[2][1])) {
				setComplete(false);
			}
			return;
		}
		const m = L + parseInt((R - L) / 2);
		array[cindex + 1].push(currentArray.slice(L, m + 1));
		array[cindex + 1].push(currentArray.slice(m + 1, currentArray.length + 1));
		setR(m);
		setL(L);
		setCurrentArray(currentArray.slice(L, m + 1));
		setArray([...array]);
		setCIndex(cindex + 1);
	};
	const onClear = () => {
		setArray([[[...initArray]], [], [], []]);
		setDefaultArray([...initArray]);
		setCurrentArray([...initArray]);
		setCurrentPosition(0);
		setCurrentNode(0);
		setPosition(0);
		setPositionTwo(-1);
		setPositionThree(0);
		setComplete(false);
		setRightSection(false);
		setCIndex(0);
		setL(0);
		setR(initArray.length - 1);
		setFastPlay(false);
		setSpeed(1);
		setUserInput("");
		setEnable(false);
		setSortedIndex([]);
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
			(item: number) => ({ value: item, sorted: false }),
			{ max: 8, min: 8 },
		);
		if (newArray) {
			setDefaultArray([...newArray]);
			setCurrentArray([...newArray]);
			setArray([[[...newArray]], [], [], []]);
		}
	};
	return (
		<>
			<Template
				headLine="Merge Sort"
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
						<div style={{ width: "100%" }} className={styles.inline}>
							{array[0].map((numArr: number[]) => {
								return numArr.map((num) => (
									<div className={styles[num.sorted ? "green" : "box"]}>{num.value}</div>
								));
							})}
						</div>
						<div
							style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", direction: "ltr" }}
						>
							<div className={styles.inline}>
								{array[1][0]?.map((num) => (
									<div className={styles[num.sorted ? "green" : "box"]}>{num.value}</div>
								))}
							</div>
							<div className={styles.inline}>
								{array[1][1]?.map((num) => (
									<div className={styles[num.sorted ? "green" : "box"]}>{num.value}</div>
								))}
							</div>
							<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", direction: "ltr" }}>
								<div className={styles.inline}>
									{array[2][0]?.map((num) => (
										<div className={styles[num.sorted ? "green" : "box"]}>{num.value}</div>
									))}
								</div>
								<div className={styles.inline}>
									{array[2][1]?.map((num) => (
										<div className={styles[num.sorted ? "green" : "box"]}>{num.value}</div>
									))}
								</div>
								<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
									<div className={styles.inline}>
										{array[3][0]?.map((num) => (
											<div className={styles[num.sorted ? "green" : "box"]}>{num.value}</div>
										))}
									</div>
									<div className={styles.inline}>
										{array[3][1]?.map((num) => (
											<div className={styles[num.sorted ? "green" : "box"]}>{num.value}</div>
										))}
									</div>
								</div>
								<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
									<div className={styles.inline}>
										{array[3][2]?.map((num) => (
											<div className={styles[num.sorted ? "green" : "box"]}>{num.value}</div>
										))}
									</div>
									<div className={styles.inline}>
										{array[3][3]?.map((num) => (
											<div className={styles[num.sorted ? "green" : "box"]}>{num.value}</div>
										))}
									</div>
								</div>
							</div>
							{/*  */}
							<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", direction: "ltr" }}>
								<div className={styles.inline}>
									{array[2][2]?.map((num) => (
										<div className={styles[num.sorted ? "green" : "box"]}>{num.value}</div>
									))}
								</div>
								<div className={styles.inline}>
									{array[2][3]?.map((num) => (
										<div className={styles[num.sorted ? "green" : "box"]}>{num.value}</div>
									))}
								</div>
								<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
									<div className={styles.inline}>
										{array[3][4]?.map((num) => (
											<div className={styles[num.sorted ? "green" : "box"]}>{num.value}</div>
										))}
									</div>
									<div className={styles.inline}>
										{array[3][5]?.map((num) => (
											<div className={styles[num.sorted ? "green" : "box"]}>{num.value}</div>
										))}
									</div>
								</div>
								<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
									<div className={styles.inline}>
										{array[3][6]?.map((num) => (
											<div className={styles[num.sorted ? "green" : "box"]}>{num.value}</div>
										))}
									</div>
									<div className={styles.inline}>
										{array[3][7]?.map((num) => (
											<div className={styles[num.sorted ? "green" : "box"]}>{num.value}</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</>
				}
				elementClassname="inlineFullWidth"
				inputClassname="inputGroup"
				infoComponent={
					<>
						Merge Sort is the very basic mechanism that been used to sort an Array. Since the Bubble Sort
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
					onFastPlay,
					fastPlay,
					enable,
					onNext,
				}}
			/>
		</>
	);
};

export default withTransition(MergeSort);
