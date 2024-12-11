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

	const handleSubmit = () => {
		if (selectedStock && alertPrice) {
			onAddStock(selectedStock, Number(alertPrice));
			setSelectedStock("");
			setAlertPrice("");
		}
	};

	return (
		<div>
			<div style={{ marginBottom: 15, marginRight: 20 }}>
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
			<div style={{ marginBottom: 15, marginRight: 20 }}>
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
