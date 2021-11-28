import cheerio from "cheerio";
import rp from "request-promise";
import helper from "../utils/helper";
import DatabaseController from "./DatabaseController";

export default class CurrentPricesScrapper {
	public async getCurrentPrice() {
		return {
			"safelyTrade": await this.safelyTrade(),
			"busterShop": await this.busterShop(),
			"frostStore": await this.frostStore()
		};
	}

	public async updatePrice() {
		const data = await this.getCurrentPrice();
		const databaseController = new DatabaseController();
		await databaseController.insert(data);
		return data;
	}

	private async safelyTrade() {
		return await rp("https://safelytrade.com.br/ragnarok/432-100kks-ragnarok-thor-zenys.html").then(html => {
			const $ = cheerio.load(html);
			const text = $(".current-price span").attr("content") as string;
			const currentPrice = (parseFloat(text) / 100).toFixed(4)!;
			return currentPrice;
		}).catch(error => {
			this.logError("Safely Trade", error);
		});
	}

	private async busterShop() {
		return await rp("https://www.bustershop.com.br/zeny-ragnarok-kk_100").then(html => {
			const $ = cheerio.load(html);
			let text = $(".preco-promocional").html() as string;
			text = text.trim().replace("R$ ", "").replace(",", ".");
			const currentPrice = (parseFloat(text) / 100).toFixed(4);
			return currentPrice;
		}).catch(error => {
			this.logError("Buster Shop", error);
		});
	}

	private async frostStore() {
		return await rp("https://www.froststore.com.br/produto/100-milhoes-de-zeny-100-kks/").then(html => {
			const $ = cheerio.load(html);
			let text = $("ins").html() as string;
			const matchValue = text.match(/\d+,\d+/);
			text = matchValue ? matchValue[0].replace(",", ".") : "" ;
			const currentPrice = (parseFloat(text) / 100).toFixed(4);
			return currentPrice;
		}).catch(error => {
			this.logError("Frost Store", error);
		});
	}

	private logError(plataform:string, error:Error) {
		helper.log(`Erro na cotação do ${plataform}. Erro: ${error}.`, 1, "error");
	}
}
