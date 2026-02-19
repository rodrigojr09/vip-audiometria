import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ConfigProvider } from "@/hooks/useConfig";
import EmpresaProvider from "@/hooks/useEmpresa";
import ExameProvider from "@/hooks/useExame";
import PessoaProvider from "@/hooks/usePessoa";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<PessoaProvider>
			<ExameProvider>
				<EmpresaProvider>
					<ConfigProvider>
						<Head>
							<link href="/icon.ico" rel="icon" type="image/x-icon" />
						</Head>
						<div className="flex w-screen max-w-[100vw]">
							<Sidebar />
							<div className="ml-80 w-full h-screen flex flex-col">
								<Navbar />
								<Component {...pageProps} />
							</div>
						</div>
					</ConfigProvider>
				</EmpresaProvider>
			</ExameProvider>
		</PessoaProvider>
	);
}
