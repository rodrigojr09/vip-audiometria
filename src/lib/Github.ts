import axios from "axios";
import { logger } from "./Logger";
import { writeFile, mkdirSync, existsSync } from "fs";
import path from "path";
import { dados } from "../data/dados";

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

			const { data } = await axios.get(url);

			if (!data || !data.tag_name)
				throw new Error("Nenhuma release encontrada.");

			logger.info(`Release encontrada: ${data.tag_name}`);

			return {
				tagName: data.tag_name,
				name: data.name,
				body: data.body,
				url: data.html_url,
				publishedAt: data.published_at,
				assets: data.assets,
			};
		} catch (error: any) {
			logger.error(`Erro ao buscar release: ${error.message}`);
			throw new Error("Não foi possível buscar a release.");
		}
	}

	async getLatestReleaseSetup() {
		try {
			const release = await this.getLatestRelease();

			if (!release.assets || release.assets.length === 0) {
				logger.warn("A release não contém assets para download.");
				throw new Error("Sem arquivos para download nesta release.");
			}

			const asset = release.assets[0]; // Pega o primeiro asset
			const downloadUrl = asset.browser_download_url;
			const fileName = asset.name;

			const filePath = dados.getFile(fileName);

			logger.debug(`Baixando asset da release: ${downloadUrl}`);

			const response = await axios.get(downloadUrl, {
				responseType: "arraybuffer",
			});

			await new Promise<void>((resolve, reject) => {
				writeFile(filePath, response.data, (err) => {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
				});
			});

			logger.info(`Release salva em: ${filePath}`);

			return filePath;
		} catch (error: any) {
			logger.error(`Erro ao baixar release: ${error.message}`);
			throw new Error("Não foi possível baixar a release.");
		}
	}
}
