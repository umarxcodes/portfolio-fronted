import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2, Mail, MapPin, MessageCircle } from "lucide-react";
import { Button, Field, Input, Textarea } from "@/components/ui";
import { Reveal } from "@/components/common/Reveal";
import { submitContactSchema } from "@/features/contact/validation";
import { useSubmitContact } from "@/features/contact";
import { useProfile } from "@/features/profile";
import { getIdentityProfile, identity } from "@/config/identity";
import { useToast } from "@/context";
import { getErrorMessage } from "@/lib/errorHandler";

export default function ContactPage() {
  const { toast } = useToast();
  const submit = useSubmitContact();
  const { data: profileData } = useProfile();
  const profile = getIdentityProfile(profileData?.profile);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(submitContactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = async (values) => {
    try {
      await submit.mutateAsync(values);
      toast.success("Message sent — I'll get back to you soon.");
      reset();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  if (submit.isSuccess) {
    return (
      <div className="container-page max-w-xl py-20">
        <div className="flex flex-col items-center text-center">
          <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <h1 className="font-heading text-3xl font-bold text-content-primary">Message sent</h1>
          <p className="mt-3 text-content-secondary">
            Thank you for reaching out. I'll be in touch shortly.
          </p>
          <Button className="mt-6" variant="secondary" onClick={() => submit.reset()}>
            Send another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page max-w-5xl py-14">
      <header className="mb-8">
        <Reveal>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">
            Contact
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="text-4xl font-bold tracking-tight text-content-primary sm:text-5xl">
            Get in touch
          </h1>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-3 text-content-secondary">
            Have a role, project, or question for {profile.name}? Send a message or start a WhatsApp
            chat.
          </p>
        </Reveal>
      </header>

      <div className="grid gap-8 lg:grid-cols-[0.75fr_1fr]">
        <aside className="space-y-3">
          <Reveal delay={180}>
            <a
              href={`mailto:${profile.email}`}
              className="group flex items-center gap-3 rounded-lg border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-brand-500/40 hover:shadow-sm"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-500/10 text-brand-600 dark:text-brand-300">
                <Mail className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-medium text-content-primary">Email</span>
                <span className="text-sm text-content-secondary group-hover:text-content-primary">
                  {profile.email}
                </span>
              </span>
            </a>
          </Reveal>
          <Reveal delay={220}>
            <a
              href={identity.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 rounded-lg border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-brand-500/40 hover:shadow-sm"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-success/10 text-success">
                <MessageCircle className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-medium text-content-primary">WhatsApp</span>
                <span className="text-sm text-content-secondary group-hover:text-content-primary">
                  {identity.whatsappNumber}
                </span>
              </span>
            </a>
          </Reveal>
          <Reveal delay={260}>
            <div className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent">
                <MapPin className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-medium text-content-primary">Location</span>
                <span className="text-sm text-content-secondary">{profile.location}</span>
              </span>
            </div>
          </Reveal>
        </aside>

        <Reveal delay={200}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Field label="Name" required error={errors.name?.message}>
              <Input placeholder="Jane Recruiter" error={errors.name} {...register("name")} />
            </Field>
            <Field label="Email" required error={errors.email?.message}>
              <Input
                type="email"
                placeholder="jane@example.com"
                error={errors.email}
                {...register("email")}
              />
            </Field>
            <Field label="Subject" required error={errors.subject?.message}>
              <Input
                placeholder="Opportunity at your company"
                error={errors.subject}
                {...register("subject")}
              />
            </Field>
            <Field
              label="Message"
              required
              error={errors.message?.message}
              hint="Min 10 characters"
            >
              <Textarea
                rows={6}
                placeholder="Tell me a bit about what you have in mind…"
                error={errors.message}
                {...register("message")}
              />
            </Field>
            <Button
              type="submit"
              isLoading={submit.isPending}
              loadingText="Sending…"
              rightIcon={<Send className="h-4 w-4" />}
            >
              Send message
            </Button>
          </form>
        </Reveal>
      </div>
    </div>
  );
}
