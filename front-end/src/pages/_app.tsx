import Sidebar from "@/components/Sidebar";
import PessoaProvider from "@/hooks/usePessoa";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div className="flex w-screen h-screen">
			<PessoaProvider>
				<Sidebar />
				<Component {...pageProps} />
			</PessoaProvider>
		</div>
	);
}
