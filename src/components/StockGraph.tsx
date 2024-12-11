import React from "react";

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from "recharts";

import { useTheme } from "@mui/material/styles";

import { Stock } from "../types";
interface StockGraphProps {
	stocks: Stock[];
}

const StockGraph: React.FC<StockGraphProps> = ({
	stocks,
}) => {
	const theme = useTheme();

	const data =
		stocks[0]?.priceHistory.map(point => ({
			time: new Date(point.timeStamp).toLocaleTimeString(),
			price: point.price,
		})) || [];
	const minValue = Math.min(...data.map(d => d.price));
	const maxValue = Math.max(...data.map(d => d.price));
	return (
		<ResponsiveContainer width="90%" height={400}>
			<LineChart data={data}>
				<XAxis
					dataKey="time"
					tick={{ fontFamily: theme.typography.fontFamily }}
				/>
				<YAxis
					domain={[
						Math.round(minValue),
						Math.round(maxValue),
					]}
					tick={{ fontFamily: theme.typography.fontFamily }}
				/>
				<Tooltip
					contentStyle={{
						fontFamily: theme.typography.fontFamily,
					}}
				/>
				<Legend
					verticalAlign="top"
					height={36}
					wrapperStyle={{
						fontFamily: theme.typography.fontFamily,
					}}
					content={
						<div>
							{stocks.map(stock => (
								<p>{stock.name}</p>
							))}
						</div>
					}
				/>

				<Line
					type="monotone"
					dataKey="price"
					stroke="#82ca9d"
					activeDot={{ r: 8 }}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
};

export default StockGraph;
