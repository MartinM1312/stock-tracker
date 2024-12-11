import React from "react";
import { Typography } from "@mui/material";

const Header: React.FC = () => {
	return (
		<div style={{ color: "#34b7eb" }}>
			<Typography
				variant="h4"
				component="div"
				align="center"
			>
				Stock Tracker
			</Typography>
		</div>
	);
};

export default Header;
