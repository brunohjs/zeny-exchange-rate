// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from "next";
import CurrentPricesScrapper from "../../controllers/CurrentPricesScrapper";

type Data = {
	name: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const currentPricesScrapper = new CurrentPricesScrapper();
	console.log(await currentPricesScrapper.updatePrice());
	res.status(200).json({name: "John Doe"});
}
