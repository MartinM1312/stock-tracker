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
import { GRAPH_COLORS } from "../constants";

interface StockGraphProps {
	stocks: Stock[];
}

const StockGraph: React.FC<StockGraphProps> = ({
	stocks,
}) => {
	const theme = useTheme();
	const allData = stocks.flatMap(stock =>
		stock.priceHistory.map(point => ({
			time: new Date(point.timeStamp).toLocaleTimeString(),
			price: point.price,
			stockName: stock.name,
		}))
	);

	const legendContent = () => {
		return (
			<div className="legend-container">
				{stocks.map((stock, index) => (
					<div key={index} className="legend-content">
						<p>{stock.name}</p>
						<div
							className="legend-indicator"
							style={{
								backgroundColor: GRAPH_COLORS[index],
							}}
						></div>
					</div>
				))}
			</div>
		);
	};

	return (
		<ResponsiveContainer width="80%" height={400}>
			<LineChart data={allData}>
				<XAxis
					dataKey="time"
					tick={{ fontFamily: theme.typography.fontFamily }}
					hide
				/>
				<YAxis
					label={{
						value: "(USD)",
						angle: -90,
						position: "insideLeft",
						fontFamily: theme.typography.fontFamily,
						fill: theme.palette.text.primary,
					}}
					domain={["dataMin", "dataMax"]}
					type="number"
					tick={{
						fontFamily: theme.typography.fontFamily,
					}}
					tickFormatter={(value: number) =>
						value.toFixed(2).toString()
					}
					tickSize={1}
					allowDecimals={false}
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
					content={legendContent}
				/>
				{stocks.map((stock, index) => (
					<Line
						key={stock.name}
						type="monotone"
						dataKey="price"
						data={allData.filter(
							d => d.stockName === stock.name
						)}
						name={stock.name}
						stroke={
							GRAPH_COLORS[index % GRAPH_COLORS.length]
						}
						activeDot={{ r: 8 }}
						isAnimationActive={false}
						dot={false}
					/>
				))}
			</LineChart>
		</ResponsiveContainer>
	);
};

export default StockGraph;
