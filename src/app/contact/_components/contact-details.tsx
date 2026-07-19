import type { ContactDetails } from "@/types/contact";

interface Props {
  details: ContactDetails;
}

/** Tiny inline SVG icons so we don't add another dependency here. */
function SocialIcon({ platform }: { platform: string }) {
  // Render an emoji-ish initial — keeps markup minimal and avoids extra assets.
  const initial = platform.charAt(0).toUpperCase();
  return (
    <span
      aria-hidden="true"
      className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary"
    >
      {initial}
    </span>
  );
}

export function ContactDetailsList({ details }: Props) {
  return (
    <div className="space-y-8">
      {details.offices.length > 0 ? (
        <section>
          <h2 className="text-lg font-semibold tracking-tight">Offices</h2>
          <ul className="mt-4 space-y-4">
            {details.offices.map((office) => (
              <li
                key={`${office.name}-${office.city}`}
                className="rounded-lg border border-border bg-card p-5"
              >
                <p className="font-semibold">{office.name}</p>
                <address className="mt-2 not-italic text-sm text-muted-foreground">
                  {office.addressLines.map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                  {office.city}, {office.country}
                </address>
                <dl className="mt-3 space-y-1 text-sm">
                  {office.phone ? (
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground">Phone:</dt>
                      <dd>
                        <a
                          href={`tel:${office.phone.replace(/\s+/g, "")}`}
                          className="hover:underline"
                        >
                          {office.phone}
                        </a>
                      </dd>
                    </div>
                  ) : null}
                  {office.email ? (
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground">Email:</dt>
                      <dd>
                        <a
                          href={`mailto:${office.email}`}
                          className="hover:underline"
                        >
                          {office.email}
                        </a>
                      </dd>
                    </div>
                  ) : null}
                  {office.hours ? (
                    <div className="flex gap-2">
                      <dt className="text-muted-foreground">Hours:</dt>
                      <dd>{office.hours}</dd>
                    </div>
                  ) : null}
                </dl>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section>
        <h2 className="text-lg font-semibold tracking-tight">Direct lines</h2>
        <dl className="mt-4 space-y-1 text-sm">
          {details.supportEmail ? (
            <div className="flex gap-2">
              <dt className="text-muted-foreground">Support:</dt>
              <dd>
                <a
                  href={`mailto:${details.supportEmail}`}
                  className="hover:underline"
                >
                  {details.supportEmail}
                </a>
              </dd>
            </div>
          ) : null}
          {details.salesEmail ? (
            <div className="flex gap-2">
              <dt className="text-muted-foreground">Sales:</dt>
              <dd>
                <a
                  href={`mailto:${details.salesEmail}`}
                  className="hover:underline"
                >
                  {details.salesEmail}
                </a>
              </dd>
            </div>
          ) : null}
          {details.responseTime ? (
            <p className="pt-2 text-xs text-muted-foreground">
              Typical response: {details.responseTime}
            </p>
          ) : null}
        </dl>
      </section>

      {details.social.length > 0 ? (
        <section>
          <h2 className="text-lg font-semibold tracking-tight">Follow us</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {details.social.map((s) => (
              <li key={`${s.platform}-${s.url}`}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm hover:bg-accent"
                >
                  <SocialIcon platform={s.platform} />
                  <span className="capitalize">{s.platform}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
