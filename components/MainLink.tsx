import React,{useState} from "react";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight, faAngleUp, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/components/mainlink.module.scss";
import { Collapse, Anchor } from "@mantine/core";
import { useRouter } from "next/router";
const MainLink: React.FC = () => {
	const [opened, setOpened] = useState(false);

  return (
			<div>
				<div className={styles.topLink} onClick={() => setOpened(!opened)}>
					<div className={styles.icon}>
						<FontAwesomeIcon color={opened ? "teal" : ""} icon={opened ? faAngleDown : faAngleRight} />
					</div>
					<p style={{ color: opened ? "teal" : "" }}>Sorting Algorithms</p>
				</div>
				<Collapse in={opened} transitionDuration={500}>
					<div className={styles.content}>
						<SubLink href="/algorithms/bubblesort" text="Bubble Sort" />
						<SubLink href="/algorithms/mergesort" text="Merge Sort" />
						<SubLink text="Quick Sort" />
					</div>
				</Collapse>
			</div>
		);
};

const SubLink: React.FC<{ text: string, href?: string }> = ({ text, href="/" }) => {
	const navigate = useRouter();
	const onRedirect = (href: string) => {
		navigate.push(href);
	};
	const active = navigate.pathname === href;
	return (
		<div onClick={()=>onRedirect(href)} className={active ? styles.activeSubNav : styles.subNav}>
			<p>{text}</p>
		</div>
	)
};


export default MainLink;