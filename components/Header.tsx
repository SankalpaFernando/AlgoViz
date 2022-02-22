import Head from "next/head";
import React from "react";

type HeaderProps = {
  title: string;
  link: string;
}


const Header: React.FC<HeaderProps> = ({ title, link }): JSX.Element => {
  const description = `Visualization For ${title}`;
  return (
			<Head>
				<title>{title} - AlgoViz</title>
				<meta name="description" content={`${description}`} />
				<meta property="og:title" content={`${title} - AlgoViz`} />
				<meta property="og:description" content={`${description}`} />
				<meta
					property="og:url"
					content={`https://www.algoviz.sankalpafernando.com/${link}`}
				/>
			</Head>
		);
};

export default Header;