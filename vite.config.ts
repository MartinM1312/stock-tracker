import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
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
	plugins: [
		react(),
		VitePWA({
			manifest: false,
			registerType: "autoUpdate",
			devOptions: { enabled: true },
			workbox: {
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/ws\.finnhub\.io/,
						handler: "NetworkFirst",
						options: {
							cacheName: "finnhub-websocket-cache",
						},
					},
				],
			},
		}),
	],
	build: {
		manifest: true,
	},
});
