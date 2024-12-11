import React, { useState } from "react";
import {
	MenuItem,
	Select,
	TextField,
	Button,
	InputLabel,
} from "@mui/material";

type LeftFormProps = {
	stocks: string[];
	onAddStock: (stock: string, alertPrice: number) => void;
};

const LeftForm: React.FC<LeftFormProps> = ({
	stocks,
	onAddStock,
}) => {
	const [selectedStock, setSelectedStock] = useState("");
	const [alertPrice, setAlertPrice] = useState<number | "">(
		""
	);

	const validateFields = () => {
		if (!selectedStock) {
			alert("Please select a stock to add.");
			return false;
		}
		if (!alertPrice) {
			alert("Please enter a valid alert price.");
			return false;
		}
		return true;
	};

	const handleSubmit = () => {
		if (validateFields()) {
			onAddStock(selectedStock, Number(alertPrice));
			setSelectedStock("");
			setAlertPrice("");
		}
	};

	return (
		<div>
			<div className="input-container">
				<InputLabel color="primary" id="select-stock-label">
					Stock
				</InputLabel>
				<Select
					labelId="select-stock-label"
					value={selectedStock}
					onChange={e => setSelectedStock(e.target.value)}
					fullWidth
				>
					{stocks.map(stock => (
						<MenuItem key={stock} value={stock}>
							{stock}
						</MenuItem>
					))}
				</Select>
			</div>
			<div className="input-container">
				<TextField
					label="Alert Price"
					type="number"
					value={alertPrice}
					onChange={e =>
						setAlertPrice(Number(e.target.value))
					}
					fullWidth
				/>
			</div>
			<Button
				onClick={handleSubmit}
				variant="outlined"
				color="success"
			>
				Add Stock
			</Button>
		</div>
	);
};

export default LeftForm;
