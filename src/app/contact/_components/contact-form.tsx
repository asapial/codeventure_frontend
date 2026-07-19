"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  TOPIC_VALUES,
  contactMessageSchema,
  contactTopicLabels,
  type ContactMessage,
  type ContactSubmissionResponse,
} from "@/types/contact";
import { submitContactMessage } from "@/lib/api/contact";

import { ContactSuccess } from "./contact-success";

interface Props {
  defaultTopic?: ContactMessage["topic"];
}

export function ContactForm({ defaultTopic = "general" }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<ContactSubmissionResponse | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactMessage>({
    resolver: zodResolver(contactMessageSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      company: "",
      topic: defaultTopic,
      subject: "",
      message: "",
      website: "",
    },
  });

  const currentTopic = useWatch({ control, name: "topic" }) ?? defaultTopic;

  async function onSubmit(values: ContactMessage) {
    // Honeypot — silently succeed for bots.
    if (values.website && values.website.length > 0) {
      setReceipt({ id: "bot-suppressed" });
      return;
    }
    try {
      setSubmitting(true);
      const response = await submitContactMessage(values);
      setReceipt(response);
      reset();
      toast.success("Message sent — thanks! We'll reply within 1 business day.");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to send message.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  if (receipt) {
    return <ContactSuccess receipt={receipt} onReset={() => setReceipt(null)} />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
      aria-busy={submitting}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">Your name</Label>
          <Input
            id="contact-name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name ? (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email ? (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-company">Company (optional)</Label>
          <Input
            id="contact-company"
            autoComplete="organization"
            {...register("company")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-topic">Topic</Label>
          <Select
            value={currentTopic}
            onValueChange={(v) =>
              setValue("topic", v as ContactMessage["topic"], {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger id="contact-topic" aria-invalid={!!errors.topic}>
              <SelectValue placeholder="Select topic" />
            </SelectTrigger>
            <SelectContent>
              {TOPIC_VALUES.map((t) => (
                <SelectItem key={t} value={t}>
                  {contactTopicLabels[t]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.topic ? (
            <p className="text-sm text-destructive">{errors.topic.message}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-subject">Subject</Label>
        <Input
          id="contact-subject"
          aria-invalid={!!errors.subject}
          {...register("subject")}
        />
        {errors.subject ? (
          <p className="text-sm text-destructive">{errors.subject.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          rows={6}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        {errors.message ? (
          <p className="text-sm text-destructive">{errors.message.message}</p>
        ) : null}
      </div>

      {/* Honeypot — hidden from real users and screen readers */}
      <div aria-hidden="true" className="hidden">
        <Label htmlFor="contact-website">Website</Label>
        <Input
          id="contact-website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
