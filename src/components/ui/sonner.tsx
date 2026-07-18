"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      richColors
      closeButton
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "bg-card text-card-foreground border border-border shadow-lg",
          description: "text-muted-foreground",
        },
      }}
    />
  );
}