import axios from "axios";
import { logger } from "./Logger"; // ajuste o caminho conforme a localização real do seu logger

export class GitHubRelease {
	private owner: string;
	private repo: string;

	constructor(owner: string, repo: string) {
		this.owner = owner;
		this.repo = repo;
	}

	async getLatestRelease() {
		try {
			const url = `https://api.github.com/repos/${this.owner}/${this.repo}/releases/latest`;
			logger.debug(`Buscando release em: ${url}`);
			const response = await axios.get(url);

			logger.info(`Release encontrada: ${response.data.tag_name}`);

			return {
				tagName: response.data.tag_name,
				name: response.data.name,
				body: response.data.body,
				url: response.data.html_url,
				publishedAt: response.data.published_at,
			};
		} catch (error: any) {
			logger.error(`Erro ao buscar release: ${error.message}`);
			throw new Error("Não foi possível buscar a release.");
		}
	}
}
