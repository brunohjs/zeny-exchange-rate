import {MongoClient, MongoOptions} from "mongodb";

export default class DatabaseController {
	private client : MongoClient;
	useUnifiedTopology: MongoOptions;

	constructor(username:string = null, password:string = null) {
		username = username || process.env.DATABASE_USERNAME;
		password = password || process.env.DATABASE_PASSWORD;
		const url = `mongodb+srv://${username}:${password}@cluster0.nk4zj.mongodb.net/zeny-exchange-rate?retryWrites=true&w=majority`;
		this.client = new MongoClient(url);
	}

	async insert(object) {
		await this.client.connect();
		const database = this.client.db("zeny-exchange-rate");
		const collection = database.collection("exchange-rate");
		await collection.insertOne({
			data: object,
			date: new Date()
		});
	}

	async get(objects) {
		let array = [];
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