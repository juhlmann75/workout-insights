import Head from 'next/head';
import React from "react";
import TopNavbar from "./topNavbar";

export const siteTitle = 'Hacker News Plus';

export default function Layout({
                                   children,
                                   home,
                                   title
                               }: {
    children: React.ReactNode,
    home?: boolean,
    title?: string
}) {

    const titleTagValue = title ? title + ' | Workout Insights' : siteTitle;

    return (
        <div>
            <Head>
                <title>{titleTagValue}</title>
                <link rel="icon" href="/vercel.svg"/>
                <meta
                    name="description"
                    content="Workout Insights Description"
                />
                <meta name="og:title" content={siteTitle}/>
            </Head>
            <main>
                <TopNavbar></TopNavbar>
                <div className="container mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}