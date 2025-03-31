import Sidebar from "@/components/Sidebar";
import DataProvider from "@/hooks/useData";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div className="flex w-screen h-screen">
			<DataProvider>
				<Sidebar />
				<Component {...pageProps} />
			</DataProvider>
		</div>
	);
}
