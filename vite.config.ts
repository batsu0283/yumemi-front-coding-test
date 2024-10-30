/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/yumemi-front-coding-test/",
  test: {
    include: ["src/**/*.test.{ts,tsx}", "src/**/*.spec.{ts,tsx}"], // テストファイルのみ対象
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/vitest.setup.ts",
    coverage: {
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.d.ts",
        "src/**/*.test.{ts,tsx}",
        "src/**/*.spec.{ts,tsx}",
      ],

      reporter: ["text", "json", "html"],
    },
  },
});
