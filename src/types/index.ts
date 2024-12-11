export interface Stock {
	name: string;
	currentPrice: number;
	percentageChange: number;
	alertPrice?: number;
	priceHistory: { price: number; timeStamp: number }[];
}

export interface StockUpdate {
	name: string;
	currentPrice: number;
	percentageChange: number;
	timeStamp: number;
}

export interface StockResponse {
	p: string;
	s: string;
	t: number;
	v: number;
}

export interface ApiResponse {
	data: [StockResponse];
	type: string;
}
