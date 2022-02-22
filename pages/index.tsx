/* eslint-disable react/react-in-jsx-scope */
import { Title, Text, Button, Container, ActionIcon } from "@mantine/core";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faPlay, faRocket } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/router";
import Head from "next/head";
export default function HomePage() {
	const smallScreen = useMediaQuery("(max-width: 600px)");

	const navigate = useRouter();

	return (
		<>
			<Title
				sx={{
					fontSize: smallScreen ? 40 : 120,
					fontWeight: 900,
					letterSpacing: -2,
					color: "#313131",
				}}
				align="center"
				mt={100}
			>
				Welcome to{" "}
				<Text
					inherit
					variant="gradient"
					gradient={{ from: "cyan", to: "teal", deg: 45 }}
					component="span"
					style={{
						fontFamily: "Nunito",
					}}
				>
					AlgoViz <FontAwesomeIcon icon={faRocket} className="floating-rocket" color="#e6fcf5" />
				</Text>
			</Title>
			<Text
				color="dimmed"
				align="center"
				size="lg"
				style={{ fontFamily: "Nunito" }}
				sx={{ maxWidth: smallScreen ? 350 : 700 }}
				mx="auto"
				mt="xl"
			>
				AlgoViz is an open source algorithm visualization application that intends to support Computer
				Science and Engineering Students in understanding Data Structures & Algorithms
			</Text>
			<Text
				color="dimmed"
				align="center"
				size="lg"
				style={{ display: "grid", gap: "2rem" }}
				sx={{ maxWidth: smallScreen ? 200 : 400, gridTemplateColumns: smallScreen ? "1fr" : "1fr 1fr" }}
				mx="auto"
				mt="xl"
				className="content"
			>
				<Button
					component="a"
					target="_blank"
					href="https://github.com/SankalpaFernando/AlgoViz"
					leftIcon={<FontAwesomeIcon size="xl" icon={faGithub} />}
					variant="light"
					color="teal"
				>
					Source Code
				</Button>
				<Button
					component="a"
					target="_blank"
					href="https://www.linkedin.com/in/sankalpa-fernando"
					leftIcon={<FontAwesomeIcon size="xl" icon={faLinkedinIn} />}
					color="teal"
				>
					Contact Me
				</Button>
			</Text>
			<Container
				sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
				mt={smallScreen ? 50 : 100}
			>
				<Text style={{ fontSize: "1.2rem", color: "#868e97" }}>Click to Start Your Journey</Text>
			</Container>
			<Container
				sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
				mt={50}
				mb={100}
				className="floating"
			>
				<ActionIcon
					color="teal"
					sx={{ height: smallScreen ? 100 : 180, width: smallScreen ? 100 : 180, borderRadius: "50%" }}
					size="xl"
					radius="xl"
					variant="light"
					onClick={() => navigate.push("/algorithms/sort/bubblesort")}
				>
					<FontAwesomeIcon
						style={{
							fontSize: smallScreen ? "3rem" : "6rem",
							marginLeft: "1.2rem",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
						icon={faPlay}
					/>
				</ActionIcon>
			</Container>
		</>
	);
}
