import { Metadata } from "next";
import ContactPage from "@/components/layout/ContactPage";

export const metadata: Metadata = {
  title: "CONTACT",
};

export default function Contact() {
  return <ContactPage />;
}
