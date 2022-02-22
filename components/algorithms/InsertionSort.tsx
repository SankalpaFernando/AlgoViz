import React, { useState, useEffect } from "react";
import { faCheck, faPlay, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Anchor, Input, Kbd } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import { defaultArray, onArrayChange, onArraySubmit } from "../../util/util";
import withTransition from "../../util/withTransition";
import Template from "../Template";

const InsertionSort: React.FC = (): JSX.Element => {
	const notifications = useNotifications();
	const [array, setArray] = useState([...defaultArray.map((num)=>({value:num,color:"box"}))]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [subCurrentIndex, setSubCurrentIndex] = useState(0);
	const [userInput, setUserInput] = useState("");
	const [complete, setComplete] = useState(false);
	const [enable, setEnable] = useState(false);
	const [fastPlay, setFastPlay] = useState(false);
	const [speed, setSpeed] = useState(1);
	const [intervalID, setIntervalID] = useState<number>();
	useEffect(() => {
		if (complete) {
			notifications.showNotification({
				message: "The Array Has Been Fully Sorted",
				color: "teal",
				style: { textAlign: "center" },
				disallowClose: true,
				icon: <FontAwesomeIcon icon={faCheck} />,
			});
			setEnable(true);
		}
	}, [complete]);
  const onClear = () => {
		setCurrentIndex(0);
		setSubCurrentIndex(0);
		setComplete(false);
		setUserInput("");
		setEnable(false);
    setFastPlay(false);
    setArray([...defaultArray.map((num) => ({ value: num, color: "box" }))]);
		clearInterval(intervalID);
	};
	const onNext = () => {
		if (currentIndex >= array.length - 1 && subCurrentIndex <= 0) {
			setComplete(true);
			return;
		}
		if (subCurrentIndex !== 0) {
			const temp = array[subCurrentIndex - 1].value;
			if (array[subCurrentIndex].value < array[subCurrentIndex - 1].value) {
				array[subCurrentIndex - 1].value = array[subCurrentIndex].value;
				array[subCurrentIndex].value = temp;
			}
			setSubCurrentIndex(subCurrentIndex - 1);
			return;
		}
		if (array[currentIndex].value > array[currentIndex + 1].value) {
			const temp = array[currentIndex + 1].value;
			array[currentIndex + 1].value = array[currentIndex].value;
			array[currentIndex].value = temp;
			setSubCurrentIndex(currentIndex);
		}
		setCurrentIndex(currentIndex + 1);
		setArray([...array]);
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
			(num: number) => ({ value: num, color: "box" }),
			{ max: 100, min: 2 },
		);
		if (newArray) {
			setArray([...newArray]);
		}
	};
	return (
		<>
			<Template
				headLine="Insertion Sort"
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
						{array.map((num, index) => {
							let color = "box";
							if (currentIndex === index || complete) {
								color = "green";
							} else if (currentIndex + 1 === index) {
								color = "yellow";
							} else if (subCurrentIndex - 1 === index) {
								color = "red";
							} else if (subCurrentIndex === index) {
								color = "blue";
							}
							return (
								<div key={index} className={color}>
									{num.value}
								</div>
							);
						})}
					</>
				}
				elementClassname="inline"
				inputClassname="inputGroup"
				infoComponent={
					<>
						Insertion sort is a simple sorting algorithm that works similar to the way you sort playing
						cards in your hands. The array is virtually split into a sorted and an unsorted part. Values
						from the unsorted part are picked and placed at the correct position in the sorted part <br />
						<br />
						<b>Best Case Time Complexity :</b>{" "}
						<b>
							<i>O(n)</i>{" "}
						</b>{" "}
						<br />
						<b>Worst and Average Case Time Complexity :</b>{" "}
						<b>
							<i>O(n*2)</i>{" "}
						</b>{" "}
						<br />
						<br />{" "}
						<Anchor href="https://www.geeksforgeeks.org/insertion-sort/" target="_blank">
							For More Info{" "}
						</Anchor>
					</>
				}
				controls={{
					onClear,
					speed,
					setSpeed,
					setIntervalID,
					intervalID,
					setFastPlay,
					fastPlay,
					enable,
					onNext,
				}}
			/>
		</>
	);
};

export default withTransition(InsertionSort);
