import { DemoForm } from "@/components/forms/DemoForm";

export const metadata = { title: "Book a Nexora demo" };

export default function BookDemoPage() {
  return <main className="min-h-screen bg-cream px-4 py-16"><div className="mx-auto max-w-3xl"><p className="text-sm font-semibold uppercase tracking-widest text-primary">Nexora RealtyOS</p><h1 className="mt-3 text-4xl font-bold text-on-surface">Book a guided product demo</h1><p className="mt-4 max-w-2xl text-on-surface-variant">Tell us about your agency and the team will follow up using your preferred channel.</p><DemoForm className="mt-8" /></div></main>;
}
