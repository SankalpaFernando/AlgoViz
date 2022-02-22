import React, { useState } from "react";
import { faCheck, faPlay, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Text, Anchor, Input, Kbd } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import styles from "../../styles/components/binarysearch.module.scss";
import { sortBy } from "lodash";
import { defaultArray, onArrayChange, onArraySubmit } from "../../util/util";
import Template from "../Template";
import withTransition from "../../util/withTransition";

const BinarySearch: React.FC = () => {
	const [array, setArray] = useState([...sortBy(defaultArray)]);
	const [dArray, setDArray] = useState([...sortBy(defaultArray)]);
	const [mIndex, setMIndex] = useState(Math.floor(defaultArray.length / 2));
	const [item, setItem] = useState(1);
	const notifications = useNotifications();
	const [userInput, setUserInput] = useState("");
	const [searchInput, setSearchInput] = useState("");
	const [enable, setEnable] = useState(false);
	const [fastPlay, setFastPlay] = useState(false);
	const [speed, setSpeed] = useState(1);
	const [intervalID, setIntervalID] = useState<number>();
	const onClear = () => {
		setArray([...sortBy(defaultArray)]);
		setDArray([...sortBy(defaultArray)]);
		setUserInput("");
		setEnable(false);
		setFastPlay(false);
		setMIndex(Math.floor(defaultArray.length / 2));
		setItem(1);
		setSearchInput("");
		clearInterval(intervalID);
	};
	const binarySearch = (arr: number[], l: number, r: number, x: number): number => {
		if (r >= l) {
			const mid = l + Math.floor((r - l) / 2);
			if (arr[mid] == x) return mid;
			if (arr[mid] > x) return binarySearch(arr, l, mid - 1, x);
			return binarySearch(arr, mid + 1, r, x);
		}
		return -1;
	};
	const onNext = () => {
		let newArray: number[] = [];
		if (array[mIndex] == item) {
			notifications.showNotification({
				message: `The Item Has Been Founded at index ${binarySearch(dArray, 0, dArray.length - 1, item)}`,
				color: "teal",
				style: { textAlign: "center" },
				disallowClose: true,
				icon: <FontAwesomeIcon icon={faCheck} />,
			});
			setEnable(true);
			newArray[0] = array[mIndex];
			clearInterval(intervalID);
			return;
		} else if (array.length === 1) {
			notifications.showNotification({
				message: "The Relevant Item Isn't in The Array",
				color: "teal",
				style: { textAlign: "center" },
				disallowClose: true,
				icon: <FontAwesomeIcon icon={faCheck} />,
			});
			setEnable(true);
		} else if (array[mIndex] > item) {
			newArray = [...array].slice(0, mIndex);
		} else {
			newArray = [...array].slice(mIndex, array.length);
		}
		setMIndex(Math.floor(newArray.length / 2));
		setArray(newArray);
	};
	const onSubmitInput = (value: any) => {
		const regex = /[0-9]$/i;
		if (regex.test(value)) {
			setItem(value);
			setSearchInput("");
		} else {
			notifications.showNotification({
				message: "Item should only contains a number",
				color: "red",
				disallowClose: true,
				icon: <FontAwesomeIcon icon={faXmark} />,
			});
		}
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
			setArray([...sortBy(newArray)]);
			setDArray([...sortBy(newArray)]);
			setMIndex(Math.floor(newArray.length / 2));
		}
	};
	return (
		<>
			<Template
				headLine="Binary Search"
				inputComponent={
					<>
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
						<Input
							onChange={(event: any) => setSearchInput(event.target.value)}
							placeholder="Input the Searching Number"
							size="lg"
							style={{ width: "100%" }}
							value={searchInput}
							onKeyDown={(e: any) => {
								if (e.code === "Enter") {
									onSubmitInput(searchInput);
								}
							}}
							rightSectionWidth={107}
							rightSection={
								<div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
									<Kbd>Enter</Kbd>
									<FontAwesomeIcon
										color="#63E6BE"
										size="lg"
										onClick={() => onSubmitInput(searchInput)}
										icon={faPlay}
									/>
								</div>
							}
						/>
					</>
				}
				elementComponent={
					<div>
						<Text className="searchText">Searching For : {item}</Text>
						<div className={styles.inline}>
							{array.map((num, index) => (
								<div key={index} className={mIndex == index ? "green" : "box"}>
									{num}
								</div>
							))}
						</div>
					</div>
				}
				elementClassname="inline"
				inputClassname="searchInputGroup"
				infoComponent={
					<>
						Binary Search is a searching algorithm used in a sorted array by repeatedly dividing the
						search interval in half. The idea of binary search is to use the information that the array is
						sorted and reduce the time complexity to O(Log n)
						<br />
						<br />
						<b>Best Case Time Complexity :</b>{" "}
						<b>
							<i>O(1)</i>{" "}
						</b>{" "}
						<br />
						<b>Worst and Average Case Time Complexity :</b>{" "}
						<b>
							<i>O(log n)</i>{" "}
						</b>{" "}
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

export default withTransition(BinarySearch);
