import React, { useState, useEffect } from "react";
import { faCheck, faPlay, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, Kbd, Table, Text } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import styles from "../../styles/components/huffman.module.scss";
import { defaultString, onArrayChange, onArraySubmit, sort,arrayType,Node } from "../../util/util";
import Controls from "../Controls";



const Huffman: React.FC = (): JSX.Element => {
	const notifications = useNotifications();
	const [historyArray, setHistoryArray] = useState<Node[][]>([]);
	const [array, setArray] = useState<arrayType[]>([]);
	const [nodeArray, setNodeArray] = useState<Node[]>([]);
  const [currentNode, setCurrentNode] = useState<Node>();
  const [currentString, setCurrentString] = useState(defaultString);
  const [index, setIndex] = useState(0);
  const [complete, setComplete] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [enable, setEnable] = useState(false);
  const [fastPlay, setFastPlay] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [intervalID, setIntervalID] = useState<number>();
	useEffect(() => {
		fillNodeArray(defaultString.split(""));
	}, []);
	const getCodes = (currentNode: Node | undefined, key: string): null | string | undefined => {
		if (currentNode == undefined) {
			return null;
		}
		if (currentNode.char == key) {
			return currentNode.code;
		}
		const leftResult = getCodes(currentNode.left, key);
		if (leftResult != null) {
			if (currentNode.code === undefined) return leftResult;
			return leftResult + currentNode.code;
		}
		const rightResult = getCodes(currentNode.right, key);
		if (rightResult != null) {
			if (currentNode.code === undefined) return rightResult;
			return rightResult + currentNode.code;
		}
		return null;
	};

	const onClear = () => {
		setHistoryArray([]);
		setCurrentString(defaultString);
		fillNodeArray(defaultString.split(""));
		setComplete(false);
		setUserInput("");
		setEnable(false);
		setFastPlay(false);
		clearInterval(intervalID);
	};
	const onNext = () => {
		if (nodeArray.length > 1) {
			nodeArray.sort(sort);
			historyArray.push([...nodeArray]);
			const nodeOne = nodeArray[0];
			nodeOne.code = "0";
			const nodeTwo = nodeArray[1];
			nodeTwo.code = "1";
			const node = new Node(nodeOne.value + nodeTwo.value, `P${index}`, nodeOne, nodeTwo);
			nodeArray.shift();
			nodeArray.shift();
			nodeArray.push(node);
			setNodeArray([...nodeArray]);
			setCurrentNode(node);
			setIndex(index + 1);
		} else if (nodeArray.length == 1) {
			historyArray.push([...nodeArray]);
			console.log(historyArray);
			nodeArray.pop();
			setComplete(true);
		}
		if (complete) {
			setArray([...array.map((item) => ({ ...item, code: getCodes(currentNode, item.char) }))]);
			notifications.showNotification({
				message: "The Encoding Process Has Been Completed",
				color: "teal",
				style: { textAlign: "center" },
				disallowClose: true,
				icon: <FontAwesomeIcon icon={faCheck} />,
			});
			setEnable(true);
		}
		setHistoryArray([...historyArray]);
	};
	const fillNodeArray = (newArray: string[]) => {
		const subArr:arrayType[] = [];
		const subNodeArr: Node[] = [];
		newArray.forEach((char) => {
			const index = subArr.findIndex((item) => item.char === char);
			if (index < 0) {
				subArr.push({ char, value: 1, code: null });
			} else {
				subArr[index].value += 1;
			}
		});
		subArr.forEach(({ value, char }) => subNodeArr.push(new Node(value, char)));
		setArray([...subArr].sort(sort));
		setNodeArray([...subNodeArr]);
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
			(num: string) => num,
			{ max: 100, min: 2 },
			/[a-zA-Z]/gm,
			(str) => str,
			"Input should only contains letters",
			"",
		);
		if (newArray) {
			const set = new Set([...newArray]);
			if (set.size > 5) {
				notifications.showNotification({
					message: "Due to Responsive Issues only 5 Distinct Characters are Allowed",
					color: "red",
					disallowClose: true,
					icon: <FontAwesomeIcon icon={faXmark} />,
				});
				return;
			}
			if (set.size < 2) {
				notifications.showNotification({
					message: "The String should at least contain 2 Distinct Characters",
					color: "red",
					disallowClose: true,
					icon: <FontAwesomeIcon icon={faXmark} />,
				});
				return;
			}
			fillNodeArray(newArray);
			setCurrentString(userInput);
		}
	};
	return (
		<div>
			<Text
				align="center"
				variant="gradient"
				gradient={{ from: "teal", to: "indigo", deg: 180 }}
				size="sm"
				weight={700}
				style={{ fontFamily: "Nunito, sans-serif", fontSize: "4rem", textAlign: "center" }}
			>
				Huffman Encoding
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
			<Text
				align="center"
				gradient={{ from: "indigo", to: "cyan", deg: 45 }}
				variant="gradient"
				size="lg"
				style={{ letterSpacing: "1rem", marginBottom: "1.4rem" }}
			>
				{currentString}
			</Text>
      {complete && <Text
        style={{ marginBottom: "1.4rem" }}
        size="xl"
        align="center"
        variant="gradient"
        gradient={{ from: "green", to: "teal", deg: 45 }}
      >
        Compression Ratio{" "}
        {(
          (array.reduce((prev, curr) => prev + curr.value, 0) * 7) /
          array.reduce((prev, curr) => prev + curr.value * curr.code?.length, 0)
        ).toFixed(2)}
      </Text>}
			<div
				style={{
					width: "80%",
					margin: "0 auto",
					display: "grid",
					gridTemplateColumns: "3fr 1fr",
				}}
			>
				<div>
					{historyArray.map((arr, i) => {
						return (
							<>
								<div className={styles.inline} key={i}>
									{arr.map((data, c) => {
										return (
											<div key={c} style={{ display: "grid", gridTemplateColumns: "1fr" }}>
												<div key={i + c} className="box">
													{data.char}({data.value})
												</div>
												{c < 2 && <div style={{ textAlign: "center" }}>{data.code}</div>}
											</div>
										);
									})}
								</div>
							</>
						);
					})}
				</div>
				{complete && (
					<div>
						<Table striped highlightOnHover>
							<thead>
								<td>Character</td>
								<td>Code</td>
							</thead>
							<tbody>
								{array.map((item, key) => (
									<tr key={key}>
										<td>{item.char}</td>
										<td>{item.code}</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
				)}
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
		</div>
	);
};

export default Huffman;
