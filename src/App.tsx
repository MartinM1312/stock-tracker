import React, { useEffect } from "react";
import "../index.css";
import Home from "./components/Home";
import StockService from "./services/StockService";
const App: React.FC = () => {
	useEffect(() => {
		StockService.loadStocksFromStorage();
		StockService.startListening();
	}, []);
	return <Home />;
};

export default App;
