/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import { AppShell, Burger, Header, MediaQuery, Navbar, Text, useMantineTheme } from "@mantine/core";
import MainLink from "./MainLink";
const Layout: React.FC = ({ children }): JSX.Element => {
	const [opened, setOpened] = useState(false);
	const theme = useMantineTheme();

	return (
		<AppShell
			navbarOffsetBreakpoint="md"
			fixed
			navbar={
				<Navbar padding="md" hiddenBreakpoint="md" hidden={!opened} width={{ sm: 300, lg: 300 }}>
					<MainLink />
					<MainLink />
					<MainLink />
				</Navbar>
			}
			header={
				<Header height={70} padding="sm">
					<div style={{ display: "flex", alignItems: "center", height: "100%" }}>
						<MediaQuery largerThan="md" styles={{ display: "none" }}>
							<Burger
								opened={opened}
								onClick={() => setOpened((o) => !o)}
								size="sm"
								color={theme.colors.gray[6]}
								mr="xl"
							/>
						</MediaQuery>

						<Text>Application header</Text>
					</div>
				</Header>
			}
		>
			{children}
		</AppShell>
	);
};

export default Layout;
