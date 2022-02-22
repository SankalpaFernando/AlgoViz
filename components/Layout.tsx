/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { AppShell, Burger, Header, MediaQuery, Navbar, Text, useMantineTheme } from "@mantine/core";
import MainLink from "./MainLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import useSmallScreen from "../util/useSmallScreen";
const Layout: React.FC = ({ children }): JSX.Element => {
	const [opened, setOpened] = useState(false);
	const navigate = useRouter();
	const theme = useMantineTheme();
	const smallScreen = useSmallScreen();
	const variants = {
		hidden: { opacity: 0, x: -200, y: 0 },
		enter: { opacity: 1, x: 0, y: 0 },
		exit: { opacity: 0, x: 0, y: -100 },
	};
	const style = smallScreen && ({ width: "30%", margin: "0 auto" });
	return (
		<AppShell
			navbarOffsetBreakpoint="md"
			fixed
			navbar={
				<Navbar padding="md" hiddenBreakpoint="md" hidden={!opened} width={{ sm: 600, lg: 300 }}>
					<MainLink
						mainText="Sorting Algorithms"
						subLinks={[
							{ href: "/algorithms/sort/bubblesort", text: "Bubble Sort" },
							{ href: "/algorithms/sort/mergesort", text: "Merge Sort" },
							{ href: "/algorithms/sort/insertionsort", text: "Insertion Sort" },
						]}
						setBarOpen={() => setOpened(!opened)}
					/>
					<MainLink
						mainText="Searching Algorithms"
						subLinks={[
							{ href: "/algorithms/search/binarysearch", text: "Binary Search" },
							{ href: "/algorithms/search/linearsearch", text: "Linear Search" },
						]}
						setBarOpen={() => setOpened(!opened)}
					/>
					<MainLink
						mainText="Encoding Algorithms"
						subLinks={[
							{ href: "/algorithms/encoding/runlength", text: "Run Length" },
							{ href: "/algorithms/encoding/huffman", text: "Huffman Encoding" },
							{ href: "/algorithms/encoding/lzw", text: "LZW Encoding" },
						]}
						setBarOpen={() => setOpened(!opened)}
					/>
				</Navbar>
			}
			header={
				<Header height={smallScreen ? 100 : 70} padding="sm">
					<div
						style={{
							display: "flex",
							margin: smallScreen ? ".5rem 0" : "0",
							alignItems: "center",
							height: "100%",
						}}
					>
						<MediaQuery largerThan="md" styles={{ display: "none" }}>
							<Burger
								opened={opened}
								onClick={() => setOpened((o) => !o)}
								size="lg"
								color={theme.colors.gray[6]}
								mr="xl"
							/>
						</MediaQuery>
						<div style={{ ...style }}>
							<Text
								inherit
								variant="gradient"
								gradient={{ from: "cyan", to: "teal", deg: 45 }}
								component="span"
								style={{
									cursor: "pointer",
									fontFamily: "Nunito",
									textAlign: "center",
									fontSize: smallScreen ? "2.8rem" : "2.4rem",
								}}
								onClick={() => navigate.push("/")}
							>
								AlgoViz <FontAwesomeIcon icon={faRocket} color="#e6fcf5" />
							</Text>
						</div>
					</div>
				</Header>
			}
		>
			{children}
		</AppShell>
	);
};

export default Layout;
