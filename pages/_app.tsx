/* eslint-disable react/react-in-jsx-scope */
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider, NormalizeCSS, GlobalStyles } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import Layout from "../components/Layout";
import { AnimatePresence, motion } from "framer-motion";
import "../styles/index.scss";

export default function App(props: AppProps) {
	const { Component, pageProps,router } = props;
		const variants = {
			hidden: { opacity: 0, y: 100, x: 0 },
			enter: { opacity: 1, y: -10, x: 0 },
			exit: { opacity: 0, y: 0, x: 0 },
		};
	return (
		<>
			<Head>
				<title>AlgoViz 🚀</title>
				<meta name="viewport" content="width=900"></meta>
				<meta name="viewport" content="width=720"></meta>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
				<link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet" />
			</Head>
			<MantineProvider
				theme={{
					colorScheme: "light",
				}}
			>
				<NormalizeCSS />
				<GlobalStyles />
				<NotificationsProvider position="top-center">
					{router.route === "/" ? (
						<motion.main
							variants={variants}
							initial="hidden"
							animate="enter"
							exit="exit"
							transition={{
								delay: 1,
								x: { type: "spring", stiffness: 100 },
								default: { duration: 2 },
							}}
							className=""
						>
							<Component {...pageProps} />
						</motion.main>
					) : (
						<Layout>
							<AnimatePresence exitBeforeEnter>
								<Component {...pageProps} key={router.route} />
							</AnimatePresence>
						</Layout>
					)}
				</NotificationsProvider>
			</MantineProvider>
		</>
	);
}
