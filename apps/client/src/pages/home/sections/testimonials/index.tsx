/* eslint-disable lingui/text-restrictions */
/* eslint-disable lingui/no-unlocalized-strings */

import { t, Trans } from "@lingui/macro";
import { Quotes } from "@phosphor-icons/react";
import { cn } from "@career-ai/utils";
import { motion } from "framer-motion";

const email = "contact@career-ai.vn";

type Testimonial = {
  quote: string;
  name: string;
};

const testimonials: Testimonial[][] = [
  [
    {
      name: "...",
      quote:
        "...",
    },
  ],
  [
    {
      name: "...",
      quote:
        "...",
    },
  ],
];

export const TestimonialsSection = () => (
  <section id="testimonials" className="container relative space-y-12 py-24 sm:py-32">
    <div className="space-y-6 text-center">
      <h1 className="text-4xl font-bold">{t`Testimonials`}</h1>
      <p className="mx-auto max-w-2xl leading-relaxed">
        <Trans>
          I always love to hear from the users of CareerAI with feedback or support. Here are
          some of the messages I've received. If you have any feedback, feel free to drop me an
          email at{" "}
          <a href={email} className="underline">
            {email}
          </a>
          .
        </Trans>
      </p>
    </div>

    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-y-0">
      {testimonials.map((columnGroup, groupIndex) => (
        <div key={groupIndex} className="space-y-8">
          {columnGroup.map((testimonial, index) => (
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0, transition: { delay: index * 0.25 } }}
              className={cn(
                "relative overflow-hidden rounded-lg bg-secondary-accent p-5 text-primary shadow-lg",
                index > 0 && "hidden lg:block",
              )}
            >
              <Quotes size={64} className="absolute -right-3 bottom-0 opacity-20" />
              <blockquote className="italic leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-3 font-medium">{testimonial.name}</figcaption>
            </motion.figure>
          ))}
        </div>
      ))}
    </div>
  </section>
);
