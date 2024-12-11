import React from "react";
import { Stock } from "../types";
import {
	Card,
	CardContent,
	Typography,
	IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface TopCardsProps {
	stocks: Stock[];
	onRemoveStock: (stockName: string) => void;
}

const TopCards: React.FC<TopCardsProps> = ({
	stocks,
	onRemoveStock,
}) => {
	return (
		<div className="top-card">
			{stocks.map(stock => (
				<Card
					key={stock.name}
					style={{
						backgroundColor:
							stock.currentPrice > (stock.alertPrice || 0)
								? "green"
								: "red",
						color: "white",
						position: "relative",
					}}
				>
					<div className="top-card-icon">
						<IconButton
							onClick={() => onRemoveStock(stock.name)}
						>
							<CloseIcon />
						</IconButton>
					</div>
					<CardContent>
						<Typography variant="h5">
							{stock.name}
						</Typography>
						<Typography variant="body1">
							${stock.currentPrice.toFixed(2)}
						</Typography>
						<Typography variant="body2">
							{stock.percentageChange.toFixed(5)}%
						</Typography>
					</CardContent>
				</Card>
			))}
		</div>
	);
};

export default TopCards;
