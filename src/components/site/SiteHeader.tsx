import { useState } from "react";
import { Link } from "@tanstack/react-router";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { profile } from "@/data/profile";
import { NAV } from "./nav";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8">
        <Link
          to="/"
          className="font-display-wide text-[0.95rem] sm:text-base"
          aria-label={`${profile.name}, home`}
        >
          {profile.wordmark}
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm font-medium">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="link-underline pb-0.5 text-muted-foreground transition-colors hover:text-foreground"
                  activeProps={{ className: "text-foreground", "aria-current": "page" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
          <DialogPrimitive.Trigger
            className="eyebrow rounded-full border border-border px-4 py-2 text-foreground md:hidden"
            aria-label="Open menu"
          >
            Menu
          </DialogPrimitive.Trigger>
          <DialogPrimitive.Portal>
            <DialogPrimitive.Content className="fixed inset-0 z-50 flex flex-col bg-background px-5 pb-10 pt-4 data-[state=open]:animate-in data-[state=open]:fade-in-0">
              <div className="flex h-12 items-center justify-between">
                <span className="font-display-wide text-[0.95rem]">{profile.wordmark}</span>
                <DialogPrimitive.Close
                  className="rounded-full border border-border p-2"
                  aria-label="Close menu"
                >
                  <X className="size-5" aria-hidden="true" />
                </DialogPrimitive.Close>
              </div>
              <DialogPrimitive.Title className="sr-only">Menu</DialogPrimitive.Title>
              <DialogPrimitive.Description className="sr-only">
                Site navigation
              </DialogPrimitive.Description>
              <nav aria-label="Mobile" className="mt-auto">
                <ul className="space-y-1">
                  <li>
                    <Link
                      to="/"
                      onClick={() => setOpen(false)}
                      className="font-display-tight block py-1 text-[3.6rem] text-muted-foreground"
                      activeProps={{ className: "text-coral" }}
                      activeOptions={{ exact: true }}
                    >
                      Home
                    </Link>
                  </li>
                  {NAV.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="font-display-tight block py-1 text-[3.6rem]"
                        activeProps={{ className: "text-coral" }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-10 space-y-1 text-sm text-muted-foreground">
                <a className="block" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
                <a className="block" href={profile.whatsapp.href} target="_blank" rel="noopener noreferrer">
                  WhatsApp {profile.whatsapp.display}
                </a>
              </div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      </div>
    </header>
  );
}
