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
import Header from "../Header";

const LinearSearch: React.FC = () => {
	const [array, setArray] = useState([...sortBy(defaultArray)]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [item, setItem] = useState(1);
  const [complete, setComplete] = useState(false);
	const notifications = useNotifications();
	const [userInput, setUserInput] = useState("");
	const [searchInput, setSearchInput] = useState("");
	const [enable, setEnable] = useState(false);
	const [fastPlay, setFastPlay] = useState(false);
	const [speed, setSpeed] = useState(1);
	const [intervalID, setIntervalID] = useState<number>();
	const onClear = () => {
		setArray([...sortBy(defaultArray)]);
		setUserInput("");
		setEnable(false);
		setFastPlay(false);
		setSearchInput("");
		clearInterval(intervalID);
	};
  const onNext = () => {
    
    if (array[currentIndex] === item) {
      notifications.showNotification({
        message: `The Item Has Been Founded at index ${currentIndex}`,
        color: "teal",
        style: { textAlign: "center" },
        disallowClose: true,
        icon: <FontAwesomeIcon icon={faCheck} />,
			});
      setEnable(true);
      clearInterval(intervalID);
      return;
    } else if (currentIndex===array.length-1) {
      notifications.showNotification({
				message: "The Relevant Item Isn't in The Array",
				color: "teal",
				style: { textAlign: "center" },
				disallowClose: true,
				icon: <FontAwesomeIcon icon={faCheck} />,
			});
			setEnable(true);
			clearInterval(intervalID);
    }
    setCurrentIndex(currentIndex + 1);
	};
	const onSubmitInput = (value: any) => {
		const regex = /[0-9]$/i;
		if (regex.test(value)) {
			setItem(parseInt(value));
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
		}
	};
	return (
		<>
			<Header title="Linear Search" link="search/linearsearch" />
			<Template
				headLine="Linear Search"
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
								<div key={index} className={currentIndex == index ? "green" : "box"}>
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
						Linear Search is the basic and simplest form of searching algorithms.It search through the
						array by hopping from index to next index until the relevant item is getting found.
						<br />
						<br />
						<b>Best Case Time Complexity :</b>{" "}
						<b>
							<i>O(n)</i>{" "}
						</b>{" "}
						<br />
						<b>Worst and Average Case Time Complexity :</b>{" "}
						<b>
							<i>O(n)</i>{" "}
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

export default withTransition(LinearSearch);
