import { ContactLeadForm } from "@/components/real-estate/leads/LeadForms";

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
  return <ContactLeadForm className={className} />;
}
