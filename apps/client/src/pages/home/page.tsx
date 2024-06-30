import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Helmet } from "react-helmet-async";

import { FeaturesSection } from "./sections/features";
import { HeroSection } from "./sections/hero";
import { LogoCloudSection } from "./sections/logo-cloud";
import { StatisticsSection } from "./sections/statistics";
import { TemplatesSection } from "./sections/templates";

export const HomePage = () => {
  const { i18n } = useLingui();

  return (
    <main className="relative isolate bg-background">
      <Helmet prioritizeSeoTags>
        <html lang={i18n.locale} />

        <title>
          {t`CareerAI`} - {t`CareerAI`}
        </title>

        <meta
          name="description"
          content="Elevate Your Job Hunt with AI-Powered CVs, Interviews, and Job Matches!."
        />
      </Helmet>

      <HeroSection />
      <LogoCloudSection />
      <StatisticsSection />
      <FeaturesSection />
      <TemplatesSection />
    </main>
  );
};
