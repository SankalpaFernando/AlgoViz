/* eslint-disable react/react-in-jsx-scope */
import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider, NormalizeCSS, GlobalStyles } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import Layout from "../components/Layout";
import "../styles/index.scss";

export default function App(props: AppProps) {
	const { Component, pageProps } = props;
	return (
		<>
			<Head>
				<title>Mantine next example</title>
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
			</Head>
			<MantineProvider
				theme={{
					colorScheme: "light",
				}}
			>
				<NormalizeCSS />
				<GlobalStyles />
				<NotificationsProvider position="top-center">
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</NotificationsProvider>
			</MantineProvider>
		</>
	);
}
