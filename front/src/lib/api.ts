import axios from "axios";

export default axios.create({
	withCredentials: true,
	baseURL: "/api",
});

export function formatCPF(value: string) {
    const numbers = value.replace(/\D/g, "").slice(0, 11);

    return numbers
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1-$2");
}
