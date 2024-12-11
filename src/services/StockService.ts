import {
	Stock,
	StockResponse,
	StockUpdate,
} from "../types";
import WebSocketService from "./WebSocketService";

const websocketService = new WebSocketService(
	"wss://ws.finnhub.io",
	"ctcec5pr01qjor98dhogctcec5pr01qjor98dhp0"
);
const MAX_HISTORY_LENGTH = 5000;

class StockService {
	private stocks: Stock[] = [];

	addStock(name: string, alertPrice: number): Stock {
		const existingStock = this.stocks.find(
			stock => stock.name === name
		);
		if (existingStock) {
			return existingStock;
		}
		const newStock: Stock = {
			name,
			currentPrice: 0,
			percentageChange: 0,
			alertPrice,
			priceHistory: [],
		};
		this.stocks.push(newStock);
		websocketService.subscribe(name);
		return newStock;
	}

	updateStock(update: StockUpdate): Stock[] {
		this.stocks = this.stocks.map(stock =>
			stock.name === update.name
				? {
						...stock,
						currentPrice: update.currentPrice,
						percentageChange: stock.currentPrice
							? ((update.currentPrice -
									stock.currentPrice) /
									stock.currentPrice) *
							  100
							: 0,
						timeStamp: update.timeStamp,
						priceHistory: [
							...stock.priceHistory.slice(
								-MAX_HISTORY_LENGTH + 1
							),
							{
								price: update.currentPrice,
								timeStamp: update.timeStamp,
							},
						],
				  }
				: stock
		);
		return this.stocks;
	}

	getStocks(): Stock[] {
		return this.stocks;
	}

	startListening(): void {
		websocketService.onMessage(response => {
			if (response.type === "trade") {
				response.data.map((stock: StockResponse) => {
					const stockUpdate: StockUpdate = {
						name: stock.s,
						currentPrice: +stock.p,
						timeStamp: stock.t,
						percentageChange: 0,
					};
					this.updateStock(stockUpdate);
				});
			}
		});
	}
}

export default new StockService();
