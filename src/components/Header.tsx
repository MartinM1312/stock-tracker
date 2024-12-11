import React from "react";
import { Typography } from "@mui/material";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
const Header: React.FC = () => {
	return (
		<div className="header">
			<Typography
				variant="h4"
				component="div"
				align="center"
			>
				Stock Tracker
			</Typography>
			<QueryStatsIcon fontSize="large" />
		</div>
	);
};

export default Header;
