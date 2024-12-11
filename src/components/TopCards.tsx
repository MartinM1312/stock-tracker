import React from "react";
import { Stock } from "../types";
import {
	Card,
	CardContent,
	Typography,
} from "@mui/material";

interface TopCardsProps {
	stocks: Stock[];
}

const TopCards: React.FC<TopCardsProps> = ({ stocks }) => {
	return (
		<div style={{ display: "flex", gap: "1rem" }}>
			{stocks.map(stock => (
				<Card
					key={stock.name}
					style={{
						backgroundColor: "rgba(40, 40, 40)",

						color:
							stock.currentPrice > (stock.alertPrice || 0)
								? "green"
								: "red",
					}}
				>
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
