import socket from "@/utils/socket";
import axios from "axios";
import { createContext, useContext } from "react";

export interface DataType {
	id: string;
	nome: string;
	cpf: string;
	dataNascimento: string;
	dataExame: string;
	tipoExame: string;
	funcao: string;
	empresa: string;
	responsavel: string;
}

interface DataProps {
	getData: (id?: string) => Promise<DataType | DataType[]>;
	createData: (data: DataType) => Promise<DataType | undefined>;
	updateData: (data: DataType) => Promise<DataType | undefined>;
	deleteData: (id: string) => Promise<boolean>;
}

const DataContext = createContext<DataProps | undefined>(undefined);

export default function DataProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const api_url = "http://localhost:48732";
	async function getData(id?: string) {
		const result = await axios.get(
			api_url + "/data/get" + (id ? `?id=${id}` : "")
		);
		socket.emit("get");
		return result.data as DataType | DataType[];
	}

	async function createData(data: DataType) {
		const result = await axios.post(api_url + "/data/create", data);
		socket.emit("get");
		return result.data as DataType | undefined;
	}

	async function updateData(data: DataType) {
		const result = await axios.put(api_url + "/data/update", data);
		socket.emit("get");
		return result.data as DataType | undefined;
	}

	async function deleteData(id: string) {
		console.log(api_url + "/data/delete?id=" + id);
		await axios.delete(api_url + "/data/delete?id=" + id);
		socket.emit("get");
		return true;
	}

	return (
		<DataContext.Provider
			value={{
				getData,
				createData,
				updateData,
				deleteData,
			}}
		>
			{children}
		</DataContext.Provider>
	);
}

export function useData() {
	const context = useContext(DataContext);
	if (!context) throw new Error("useData must be used within a DataProvider");
	return context;
}
