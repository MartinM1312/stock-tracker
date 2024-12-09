export interface Stock {
	name: string;
	currentPrice: number;
	percentageChange: number;
	alertPrice?: number;
}

export interface StockUpdate {
	name: string;
	currentPrice: number;
	percentageChange: number;
}
