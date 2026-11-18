import { MessageCircle } from "lucide-react";
import { profile } from "@/data/profile";

/** Fixed WhatsApp shortcut: the fastest way for a client in Egypt to send a brief. */
export function FloatingWhatsApp() {
  return (
    <a
      href={profile.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Send a brief on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-coral text-primary-foreground shadow-lift transition-transform duration-300 hover:scale-105 focus-visible:scale-105 sm:bottom-7 sm:right-7"
    >
      <MessageCircle aria-hidden="true" className="size-6" />
    </a>
  );
}
