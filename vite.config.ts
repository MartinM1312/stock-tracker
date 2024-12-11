import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
	define: {
		"process.env": {
			API_KEY: process.env.API_KEY,
			API_ENDPOINT: process.env.API_ENDPOINT,
		},
	},
	plugins: [react()],
});
