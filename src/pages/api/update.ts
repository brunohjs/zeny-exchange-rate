import type {NextApiRequest, NextApiResponse} from "next";
import CurrentPricesScrapper from "../../controllers/CurrentPricesScrapper";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const currentPricesScrapper = new CurrentPricesScrapper();
	const response = await currentPricesScrapper.updatePrice();
	res.status(200).json(response);
}
