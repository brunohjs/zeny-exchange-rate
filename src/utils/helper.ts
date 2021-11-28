import env from "./env";

const utils = {
	/**
     * Função gera uma string formatada da data.
     * @param {Date} date Data que será formatada
     * @returns {string} String formatada
     */
	formatDate: (date = new Date()) => {
		const dayNumber = date.getDate();
		const day = dayNumber < 10 ? `0${dayNumber.toString()}` : dayNumber.toString();
		const monthNumber = date.getMonth() + 1;
		const month = monthNumber < 10 ? `0${monthNumber.toString()}` : monthNumber.toString();
		const year = date.getFullYear().toString().slice(2);
		const hoursNumber = date.getHours();
		const hours = hoursNumber < 10 ? `0${hoursNumber.toString()}` : hoursNumber.toString();
		const minutesNumber = date.getMinutes();
		const minutes = minutesNumber < 10 ? `0${minutesNumber.toString()}` : minutesNumber.toString();
		const secondsNumber = date.getSeconds();
		const seconds = secondsNumber < 10 ? `0${secondsNumber.toString()}` : secondsNumber.toString();
		return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
	},

	/**
     * Função que gera uma mensagem de log padrão no terminal.
     * @param {string} message Mensagem do log
     * @param {number} level Nível de identação no log (default 0)
     * @param {string} type Tipo do log (default "info")
     */
	log: (message:string, level:number = 0, type:string = "info") => {
		message = message || "(sem log)";
		switch (type) {
		case "warn":
			type = "📢";
			break;
		case "erro":
			type = "❌";
			break;
		default:
			type = "ℹ️ ";
			break;
		}
		if (env.ENV != "test" || message == "teste") {
			const levelChars = level ? "-".repeat(level * 2) : "+";
			console.log(`[${utils.formatDate()}] ${type} ${levelChars} ${message}`);
		}
	}
};

export default utils;