import React, { useState, useEffect } from "react";
import LeftForm from "./LeftForm";
import TopCards from "./TopCards";
import StockGraph from "./StockGraph";

import Header from "./Header";
import StockService from "../services/StockService";
import { Stock } from "../types";
import { STOCKS } from "../constants";
const Home: React.FC = () => {
	const [stocks, setStocks] = useState<Stock[]>([]);

	useEffect(() => {
		if (
			"Notification" in window &&
			Notification.permission === "default"
		) {
			Notification.requestPermission();
		}

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

	const removeStock = (name: string) => {
		StockService.removeStock(name);
		setStocks([...StockService.getStocks()]);
	};

	return (
		<div className="main-content">
			<Header />
			<TopCards
				stocks={stocks}
				onRemoveStock={removeStock}
			/>
			<div className="stocks-container">
				<LeftForm stocks={STOCKS} onAddStock={addStock} />
				<StockGraph stocks={stocks} />
			</div>
		</div>
	);
};

export default Home;
