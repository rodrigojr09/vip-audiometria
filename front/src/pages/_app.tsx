import Sidebar from "@/components/Sidebar";
import PessoaProvider from "@/hooks/usePessoa";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<link href="/icon.ico" rel="icon" type="image/x-icon" />
			</Head>
			<div className="flex w-full h-full">
				<PessoaProvider>
					<Sidebar />
					<Component {...pageProps} />
				</PessoaProvider>
			</div>
		</>
	);
}
