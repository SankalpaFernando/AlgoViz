import React, { useState } from "react";
import { faCheck, faInfo, faPlay, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Anchor, Input, Kbd, Text } from "@mantine/core";
import styles from "../../styles/components/runlength.module.scss";
import { onArrayChange, onArraySubmit } from "../../util/util";
import { useNotifications } from "@mantine/notifications";
import Controls from "../Controls";
import withTransition from "../../util/withTransition";
import Header from "../Header";
type itemType = string | number;

const RunLength: React.FC = (): JSX.Element => {
	const defaultArray = ["A", "B", "A", "B", "A", "B", "C", "A", "C", "B", "A", "C", "A", "B", "C"];
	const notifications = useNotifications();
	const [array, setArray] = useState([...defaultArray]);
	const [subArray, setSubArray] = useState([]);
	const [count, setCount] = useState(1);
	const [colIndex, setColIndex] = useState(0);
	const [item, setItem] = useState<itemType>();
	const [userInput, setUserInput] = useState("");
	const [complete, setComplete] = useState(false);
	const [enable, setEnable] = useState(false);
	const [fastPlay, setFastPlay] = useState(false);
	const [speed, setSpeed] = useState(1);
	const [intervalID, setIntervalID] = useState<number>();

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
			(num: string) => num,
			{ max: 100, min: 2 },
			/^\w+(?=(,?))(?:\1\w+)+$/gm,
			(str) => str,
			"Input should only contains letters",
			"",
		);
		if (newArray) {
			setArray([...newArray]);
		}
	};
	const onNext = () => {
    if (complete) {
      notifications.showNotification({
							message: "The Encoding Process Has Been Completed",
							color: "teal",
							style: { textAlign: "center" },
							disallowClose: true,
							icon: <FontAwesomeIcon icon={faCheck} />,
      });
      setEnable(true);
			return;
		}
		if (colIndex === array.length) {
			subArray.push(count);
			setSubArray([...subArray]);
			setColIndex(colIndex + 1);
			setComplete(true);
			return;
		} else if (item == array[colIndex]) {
			setCount(count + 1);
			setColIndex(colIndex + 1);
			return;
		} else if (array[colIndex - 1] != undefined && array[colIndex] != array[colIndex - 1]) {
			subArray.push(count);
		}
		setItem(array[colIndex]);
		subArray.push(array[colIndex]);
		setSubArray([...subArray]);
		setCount(1);
		setColIndex(colIndex + 1);
	};
	const onClear = () => {
		setArray([...defaultArray]);
		setSubArray([]);
		setCount(0);
		setItem(undefined);
		setUserInput("");
    setComplete(false);
    setColIndex(0);
		setEnable(false);
		setFastPlay(false);
    setSpeed(1);
    clearInterval(intervalID);
	};

	return (
		<>
			<Header title="RunLength Encoding" link="encoding/runlength" />
			<Text
				align="center"
				variant="gradient"
				gradient={{ from: "teal", to: "indigo", deg: 180 }}
				size="sm"
				weight={700}
				style={{ fontFamily: "Nunito, sans-serif", fontSize: "4rem", textAlign: "center" }}
			>
				Run Length Encoding
			</Text>
			<div className={styles.inputGroup}>
				<Input
					onChange={(event: any) =>
						onArrayChange(
							event,
							setUserInput,
							() => {
								notifications.showNotification({
									message: "The Array must only contains letters",
									color: "red",
									disallowClose: true,
									icon: <FontAwesomeIcon icon={faXmark} />,
								});
							},
							/[a-zA-Z]/gm,
						)
					}
					placeholder="Input the String"
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
			</div>
			{complete && (
				<Text
					size="xl"
					weight={500}
					align="center"
					color={array.length / subArray.length < 1 ? "red" : "teal"}
					style={{ width: "100%", textAlign: "center", margin: "2rem 0" }}
				>
					Compression Ratio {"   "} is {(array.length / subArray.length).toFixed(2)}
				</Text>
			)}
			<div style={{ width: "80%", margin: "0 auto" }}>
				<div style={{ display: "flex", width: "100%", marginBottom: "2rem" }}>
					<Text align="center" size="lg" style={{ width: "50%" }}>
						Input
					</Text>
					<Text align="center" size="lg" style={{ width: "50%" }}>
						Output
					</Text>
				</div>
				<div style={{ display: "flex", gap: "5rem" }}>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "1fr 1fr 1fr 1fr",
							width: "40%",
							margin: "0 auto",
							height: "fit-content",
						}}
					>
						{array.map((arr, index) => (
							<div key={index} className={index === colIndex ? "green" : "box"}>
								{arr}
							</div>
						))}
					</div>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "1fr 1fr 1fr 1fr",
							width: "40%",
							margin: "0 auto",
							height: "fit-content",
						}}
					>
						{subArray.map((arr, index) => (
							<div key={index} className={"box"}>
								{arr}
							</div>
						))}
					</div>
				</div>
				<Controls
					{...{
						onClear,
						speed,
						setSpeed,
						fastPlay,
						enable,
						onNext,
						intervalID,
						setIntervalID,
						setFastPlay,
					}}
				/>
				<div className="infoHolder">
					<Alert icon={<FontAwesomeIcon icon={faInfo} size="lg" />} title="Quickie Recap" color="teal">
						<>
							Run-length encoding (RLE) is a form of lossless data compression in which runs of data
							(sequences in which the same data value occurs in many consecutive data elements) are stored
							as a single data value and count, rather than as the original run. This is most efficient on
							data that contains many such runs
							<br />
							<br />
							However, RLE only gives efficient output when there exists lot of repetitive data like
							background colors and tends to give negative compression ratios when its come to distinct
							data such as photographic images
							<br />
							<br />
							<Anchor href="https://www.geeksforgeeks.org/run-length-encoding/" target="_blank">
								For More Info{" "}
							</Anchor>
						</>
					</Alert>
				</div>
			</div>
		</>
	);
};

export default withTransition(RunLength);
