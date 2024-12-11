import React, { useState, useEffect } from "react";
import LeftForm from "./LeftForm";
import TopCards from "./TopCards";
import StockGraph from "./StockGraph";

import Header from "./Header";
import StockService from "../services/StockService";
import { Stock } from "../types";
const Home: React.FC = () => {
	const [stocks, setStocks] = useState<Stock[]>([]);

	useEffect(() => {
		StockService.startListening();
		const interval = setInterval(() => {
			setStocks([...StockService.getStocks()]);
		}, 2000);
		return () => clearInterval(interval);
	}, []);

	const addStock = (name: string, alertPrice: number) => {
		StockService.addStock(name, alertPrice);
		setStocks([...StockService.getStocks()]);
	};

	return (
		<div
			style={{
				padding: "1rem",
				display: "flex",
				flexDirection: "column",
				gap: "2rem",
			}}
		>
			<Header />
			<TopCards stocks={stocks} />
			<div
				style={{ display: "flex", flexDirection: "row" }}
			>
				<LeftForm
					stocks={[
						"AAPL",
						"GOOGL",
						"AMZN",
						"BINANCE:BTCUSDT",
						"BINANCE:ETHUSDT",
					]}
					onAddStock={addStock}
				/>
				<StockGraph stocks={stocks} />
			</div>
		</div>
	);
};

export default Home;
