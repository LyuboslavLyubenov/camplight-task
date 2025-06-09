import { defineConfig } from "eslint/config";
import { config } from "@camplight-task/eslint-config/base";

export default defineConfig([
  config,
  {
    files: ["**/*.{tsx}"]
  },
]);
