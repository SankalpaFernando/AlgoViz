import { faCheck, faInfo, faPlay, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Anchor, Input, Kbd, Table, Text } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import React, { useState, useEffect } from "react";
import styles from "../../styles/components/lzw.module.scss";
import { defaultString, onArrayChange, onArraySubmit } from "../../util/util";
import withTransition from "../../util/withTransition";
import Controls from "../Controls";
import Header from "../Header";

const LZW: React.FC = (): JSX.Element => {
	const notifications = useNotifications();
	const [array, setArray] = useState<string[]>([...defaultString.split("")]);
	const [output, setOutput] = useState<number[]>([]);
	const [dict, setDict] = useState<string[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [complete, setComplete] = useState(false);
	const [p, setP] = useState(array[0]);
	const [userInput, setUserInput] = useState("");
	const [enable, setEnable] = useState(false);
	const [fastPlay, setFastPlay] = useState(false);
	const [speed, setSpeed] = useState(1);
	const [intervalID, setIntervalID] = useState<number>();

	useEffect(() => {
		const subDict:string[] = [];
		const distinctChar = new Set([...array]);
		distinctChar.forEach((entry) => subDict.push(entry));
    setDict([...subDict]);
    setP(array[0]);
	}, [array]);

	const onSubmitArray = () => {
		const newArray = onArraySubmit<string>(
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
			/[a-zA-Z]/gm,
			(str) => str,
			"Input should only contains letters",
			"",
		);
		if (newArray) {
			setArray([...newArray]);
		}
	};
	const onClear = () => {
    setArray([...defaultString.split("")]);
    setOutput([]);
    setDict([]);
    setCurrentIndex(0);
    setComplete(false);
    setP(array[0]);
		setUserInput("");
		setComplete(false);
		setEnable(false);
		setFastPlay(false);
		setSpeed(1);
		clearInterval(intervalID);
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
		if (currentIndex < array.length) {
      const c = array[currentIndex + 1];
      let dp;
			if (dict.includes(p + c)) {
				dp = p + c;
			} else {
				output.push(dict.findIndex((e) => e == p) + 1);
				if (c !== undefined) {
					dict.push(p + c);
				}
				dp = c;
			}
			setP(dp);
			setDict([...dict]);
			setCurrentIndex(currentIndex + 1);
			setOutput([...output]);
		} else {
			console.log(dict);
			setComplete(true);
		}
	};

	return (
		<>
			<Header title="LZW Encoding" link="encoding/lzw" />
			
			<Text
				align="center"
				variant="gradient"
				gradient={{ from: "teal", to: "indigo", deg: 180 }}
				size="sm"
				weight={700}
				style={{ fontFamily: "Nunito, sans-serif", fontSize: "4rem", textAlign: "center" }}
			>
				Lempel–Ziv–Welch Encoding
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
					style={{ marginBottom: "1.4rem" }}
					size="xl"
					align="center"
					variant="gradient"
					gradient={{ from: "green", to: "teal", deg: 45 }}
				>
					Compression Ratio {(array.length / output.length).toFixed(2)}
				</Text>
			)}
			<div style={{ width: "80%", margin: "0 auto" }}>
				<div
					style={{
						display: "grid",
						gap: "5rem",
						gridTemplateColumns: "2fr 2fr 1fr",
						marginBottom: "2rem",
					}}
				>
					<Text align="center" size="lg" style={{ width: "100%" }}>
						Input
					</Text>
					<Text align="center" size="lg" style={{ width: "100%" }}>
						Output
					</Text>
					<div></div>
				</div>
				<div style={{ display: "grid", gap: "5rem", gridTemplateColumns: "2fr 2fr 1fr" }}>
					<div className={styles.inline}>
						{array.map((arr, i) => (
							<div key={i} className={currentIndex === i ? "green" : "box"}>
								{arr}
							</div>
						))}
					</div>
					<div className={styles.inline}>
						{output.map((arr, i) => (
							<div key={i} className={currentIndex === i ? "green" : "box"}>
								{arr}
							</div>
						))}
					</div>
					<div>
						<Table striped highlightOnHover>
							<thead>
								<td>Character</td>
								<td>Code</td>
							</thead>
							<tbody>
								{dict.map((item, key) => (
									<tr key={key}>
										<td>{key + 1}</td>
										<td>{item}</td>
									</tr>
								))}
							</tbody>
						</Table>
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
							LZW compression works by reading a sequence of symbols, grouping the symbols into strings,
							and converting the strings into codes. Because the codes take up less space than the strings
							they replace, we get compression
							<br />
							<br />
							In addition, the both encoder and decoder of the LZW algorithm are capable of building their
							own data tables thus, there is no need of transmitting the data tree in prior to the data
							transmission
							<br />
							<br />
							<Anchor
								href="https://www.geeksforgeeks.org/lzw-lempel-ziv-welch-compression-technique/"
								target="_blank"
							>
								For More Info{" "}
							</Anchor>
						</>
					</Alert>
				</div>
			</div>
		</>
	);
};

export default withTransition(LZW);
