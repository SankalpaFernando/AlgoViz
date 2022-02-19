import React,{useState} from "react";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight, faAngleUp, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/components/mainlink.module.scss";
import { Collapse } from "@mantine/core";
import { useRouter } from "next/router";
import useSmallScreen from "../util/useSmallScreen";

type MainLinkProps = {
	setBarOpen:Function
}

const MainLink: React.FC<MainLinkProps> = ({setBarOpen}) => {
	const smallScreen = useSmallScreen();

	const [opened, setOpened] = useState(false);

  return (
			<div>
				<div
					className={styles.topLink}
					style={{ gap: smallScreen ? "1.4rem" : "1rem" }}
					onClick={() => setOpened(!opened)}
				>
					<div className={styles.icon} style={{ marginLeft: smallScreen ? "1.5rem" : ".1rem" }}>
						<FontAwesomeIcon
							color={opened ? "teal" : ""}
							style={{ fontSize: smallScreen ? "1.6rem" : "1rem" }}
							icon={opened ? faAngleDown : faAngleRight}
						/>
					</div>
					<p style={{ color: opened ? "teal" : "", fontSize: smallScreen ? "1.5rem" : "1.2rem" }}>
						Sorting Algorithms
					</p>
				</div>
				<Collapse in={opened} transitionDuration={500}>
					<div className={styles.content}>
						<SubLink href="/algorithms/bubblesort" setBarOpen={() => setBarOpen()} text="Bubble Sort" />
						<SubLink href="/algorithms/mergesort" setBarOpen={() => setBarOpen()} text="Merge Sort" />
						<SubLink setBarOpen={() => setBarOpen()} text="Quick Sort" />
					</div>
				</Collapse>
			</div>
		);
};

const SubLink: React.FC<{ text: string; href: string; setBarOpen:Function }> = ({ text, href = "/",setBarOpen }) => {
	const navigate = useRouter();
	const onRedirect = (href: string) => {
		navigate.push(href);
		setBarOpen();
	};
	const active = navigate.pathname === href;
	return (
		<div onClick={() => onRedirect(href)} className={active ? styles.activeSubNav : styles.subNav}>
			<p style={{ fontSize: "1.2rem" }}>{text}</p>
		</div>
	);
};


export default MainLink;