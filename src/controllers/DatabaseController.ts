import {FindCursor, MongoClient} from "mongodb";
import env from "../utils/env";

export default class DatabaseController {
	private client : MongoClient;

	constructor(username:string | undefined = undefined, password:string | undefined = undefined) {
		username = username || env.DATABASE_USERNAME;
		password = password || env.DATABASE_PASSWORD;
		const url = `mongodb+srv://${username}:${password}@cluster0.nk4zj.mongodb.net/zeny-exchange-rate?retryWrites=true&w=majority`;
		this.client = new MongoClient(url);
	}

	async insert(object:Object) {
		await this.client.connect();
		const database = this.client.db("zeny-exchange-rate");
		const collection = database.collection("exchange-rate");
		await collection.insertOne({
			data: object,
			date: new Date()
		});
	}

	async get(objects:FindCursor) {
		const array:Array<Object> = [];
		await objects.forEach(obj => {
			array.push(obj);
		});
		return array;
	}

	async getItems() {
		await this.client.connect();
		const database = this.client.db("zeny-exchange-rate");
		const collection = database.collection("items");
		const query = collection.find().limit(10);
		return await this.get(query);
	}
}
