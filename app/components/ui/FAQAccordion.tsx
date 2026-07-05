"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: readonly FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-light-border rounded-xl border border-light-border bg-surface-container-lowest shadow-low">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="font-semibold text-on-surface">
                {item.question}
              </span>
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-container text-deep-sage"
                aria-hidden="true"
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-4 body-md text-on-surface-variant md:px-6 md:pb-5">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
