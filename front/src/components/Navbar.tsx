import { useRouter } from "next/router";

export default function Navbar() {
	const router = useRouter();

	return (
		<nav className="h-16 bg-slate-950 text-white shadow-2xl">
			<div className="h-full mx-auto px-6 flex items-center justify-between">
				{/* Logo / Marca */}
				<button
					type="button"
					onClick={() => router.push("/")}
					className="text-xl font-bold text-vip cursor-pointer tracking-wide"
				>
					VIP Audiometria
				</button>

				{/* Links */}
				<div className="flex items-center space-x-6">
					<button
						type="button"
						onClick={() => router.push("/pessoas")}
						className={`hover:text-vip transition ${
							router.pathname.startsWith("/pessoas") ? "text-vip" : ""
						}`}
					>
						Pessoas
					</button>

					<button
						type="button"
						onClick={() => router.push("/empresas")}
						className={`hover:text-vip transition ${
							router.pathname.startsWith("/empresas") ? "text-vip" : ""
						}`}
					>
						Empresas
					</button>
				</div>
			</div>
		</nav>
	);
}
