import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export", // Gera um build independente
	distDir: "../back-end/views", // Define a saída na pasta do backend
};

export default nextConfig;
