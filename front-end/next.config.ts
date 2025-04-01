import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	output: "standalone", // Gera um build independente
	distDir: "../back-end/.next", // Define a saída na pasta do backend
};

export default nextConfig;
