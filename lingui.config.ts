import type { LinguiConfig } from "@lingui/conf";

const config: LinguiConfig = {
  format: "po",
  sourceLocale: "en-US",
  fallbackLocales: { default: "en-US" },
  locales: [
    "vi-VN",
    "en-US",
  ],
  catalogs: [
    {
      include: ["<rootDir>/apps/client/src"],
      path: "<rootDir>/apps/client/src/locales/{locale}/messages",
    },
  ],
};

export default config;
