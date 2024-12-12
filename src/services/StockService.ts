import {
	Stock,
	StockResponse,
	StockUpdate,
} from "../types";
import WebSocketService from "./WebSocketService";

const websocketService = new WebSocketService(
	process.env.API_ENDPOINT ?? "",
	process.env.API_KEY ?? ""
);
const MAX_HISTORY_LENGTH = 500;

class StockService {
	private stocks: Stock[] = [];

	addStock(name: string, alertPrice: number): Stock {
		const existingStock = this.stocks.find(
			stock => stock.name === name
		);
		if (existingStock) {
			existingStock.alertPrice = alertPrice;
			return existingStock;
		}
		const newStock: Stock = {
			name,
			currentPrice: 0,
			percentageChange: 0,
			alertPrice,
			priceHistory: [],
		};
		this.stocks.forEach(stock => (stock.priceHistory = []));
		this.stocks.push(newStock);
		websocketService.subscribe(name);
		return newStock;
	}

	removeStock(name: string): void {
		const index = this.stocks.findIndex(
			stock => stock.name === name
		);
		if (index === -1) {
			return undefined;
		}
		this.stocks.splice(index, 1);
		websocketService.unsubscribe(name);
	}

	updateStock(update: StockUpdate): Stock[] {
		this.stocks = this.stocks.map(stock => {
			const isBelowAlert =
				stock.alertPrice &&
				update.currentPrice < stock.alertPrice;
			if (
				isBelowAlert &&
				Notification.permission === "granted"
			) {
				new Notification(`${stock.name} Alert`, {
					body: `Price dropped below alert: $${update.currentPrice}`,
				});
			}
			return stock.name === update.name
				? {
						...stock,
						currentPrice: update.currentPrice,
						percentageChange: stock.currentPrice
							? ((update.currentPrice -
									stock.currentPrice) /
									stock.currentPrice) *
							  100
							: 0,
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
				: stock;
		});

		localStorage.setItem(
			"stocks",
			JSON.stringify(this.stocks)
		);

		return this.stocks;
	}

	loadStocksFromStorage(): void {
		const savedStocks = localStorage.getItem("stocks");
		if (savedStocks) {
			this.stocks = JSON.parse(savedStocks);
		}
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
