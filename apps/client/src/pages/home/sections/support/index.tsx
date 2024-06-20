import { t } from "@lingui/macro";

export const SupportSection = () => (
  <section
    id="support"
    className="relative space-y-12 bg-secondary-accent py-24 text-primary sm:py-32"
  >
    <div className="container space-y-6">
      <h1 className="text-4xl font-bold">{t`Supporting CareerAI`}</h1>
    </div>
  </section>
);
