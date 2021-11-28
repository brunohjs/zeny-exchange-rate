import cheerio from "cheerio";
import rp from "request-promise";
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
	}

	private async safelyTrade() {
		return await rp("https://safelytrade.com.br/ragnarok/432-100kks-ragnarok-thor-zenys.html").then(html => {
			const $ = cheerio.load(html);
			const currentPrice = (parseFloat($(".current-price span").attr("content")) / 100).toFixed(4);
			return currentPrice;
		}).catch(error => {
			console.log("ops");
		});
	}

	private async busterShop() {
		return await rp("https://www.bustershop.com.br/zeny-ragnarok-kk_100").then(html => {
			const $ = cheerio.load(html);
			const text = $(".preco-promocional").html().trim().replace("R$ ", "").replace(",", ".");
			const currentPrice = (parseFloat(text) / 100).toFixed(4);
			return currentPrice;
		}).catch(error => {
			console.log("ops");
		});
	}

	private async frostStore() {
		return await rp("https://www.froststore.com.br/produto/100-milhoes-de-zeny-100-kks/").then(html => {
			const $ = cheerio.load(html);
			const text = $("ins").html().match(/\d+,\d+/)[0].replace(",", ".");
			const currentPrice = (parseFloat(text) / 100).toFixed(4);
			return currentPrice;
		}).catch(error => {
			console.log("ops");
		});
	}
}