
import { Helmet } from "react-helmet-async";

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "information", title: "Information We Collect" },
  { id: "use", title: "How We Use Information" },
  { id: "sharing", title: "When We Share Information" },
  { id: "payments", title: "Payments and Bookings" },
  { id: "cookies", title: "Cookies and Analytics" },
  { id: "advertising", title: "Google AdSense and Advertising" },
  { id: "retention", title: "Data Retention and Security" },
  { id: "rights", title: "Your Privacy Choices and Rights" },
  { id: "children", title: "Children's Privacy" },
  { id: "transfers", title: "Third-Party Services" },
  { id: "changes", title: "Policy Updates" },
  { id: "contact", title: "Contact and Grievances" },
];

function Section({ id, number, title, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-b border-slate-100 py-8 last:border-0"
    >
      <div className="mb-4 flex items-start gap-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-sm font-bold text-orange-600">
          {number}
        </span>
        <h2 className="pt-1 text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
          {title}
        </h2>
      </div>

      <div className="space-y-4 pl-0 text-[15px] leading-7 text-slate-600 md:pl-[52px]">
        {children}
      </div>
    </section>
  );
}

function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | ServoraCare</title>
        <meta
          name="description"
          content="Read the ServoraCare Privacy Policy to understand how we collect, use, store and protect personal information when you use our home service platform."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.servoracare.in/privacy-policy"
        />
        <meta
          property="og:title"
          content="Privacy Policy | ServoraCare"
        />
        <meta
          property="og:description"
          content="Learn how ServoraCare handles personal information, bookings, cookies and advertising."
        />
        <meta
          property="og:url"
          content="https://www.servoracare.in/privacy-policy"
        />
      </Helmet>

      <main className="min-h-screen bg-slate-50 pb-16">
        {/* HERO */}
        <div className="relative overflow-hidden bg-blue-950 px-4 py-16 text-white md:py-20">
          <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />

          <div className="relative mx-auto max-w-6xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-blue-100">
              <span className="h-2 w-2 rounded-full bg-orange-400" />
              Your privacy matters
            </div>

            <h1 className="max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">
              Privacy Policy
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-blue-100 md:text-lg">
              We believe that trust starts with transparency. This page
              explains what information we collect, why we need it and
              how we handle it when you use ServoraCare.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-blue-100">
              <span className="rounded-lg bg-white/10 px-4 py-2">
                Last updated: 7 November 2026
              </span>
              <span className="rounded-lg bg-white/10 px-4 py-2">
                ServoraCare, India
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:py-14">
          {/* TABLE OF CONTENTS */}
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">
              On this page
            </h2>

            <nav className="space-y-1">
              {sections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-orange-50 hover:text-orange-700"
                >
                  <span className="mr-2 text-xs text-slate-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </a>
              ))}
            </nav>

            <div className="mt-6 rounded-xl bg-blue-50 p-4">
              <p className="text-sm font-semibold text-blue-950">
                Have a privacy question?
              </p>
              <a
                href="mailto:support@servoracare.in"
                className="mt-2 inline-block text-sm font-semibold text-orange-600 hover:underline"
              >
                Contact our team
              </a>
            </div>
          </aside>

          {/* POLICY CONTENT */}
          <article className="min-w-0 rounded-2xl border border-slate-200 bg-white px-5 py-7 shadow-sm md:px-10 md:py-10">
            <div className="mb-8 rounded-xl border border-orange-100 bg-orange-50/70 p-5">
              <p className="font-semibold text-slate-900">
                A simple promise
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                We use information to operate our home-services platform,
                manage bookings, communicate with users and improve our
                services. We aim to collect only information that is
                reasonably needed for these purposes.
              </p>
            </div>

            <Section
              id="introduction"
              number="01"
              title="Introduction"
            >
              <p>
                Welcome to ServoraCare. We operate
                <a
                  href="https://www.servoracare.in"
                  className="font-semibold text-orange-600 hover:underline"
                >
                  {" "}www.servoracare.in
                </a>
                , an online platform that helps customers connect with
                professionals for home-related services.
              </p>

              <p>
                This Privacy Policy describes how ServoraCare collects,
                uses, stores, shares and protects personal information
                when you visit our website, create an account, request a
                service, work as a service professional or contact us.
              </p>

              <p>
                This policy should be read together with any relevant
                booking terms or other notices displayed when you use
                our services. Where we ask for consent, you can choose
                whether to provide it, subject to information that is
                necessary to provide a service you request.
              </p>

              <p>
                ServoraCare aims to handle personal information in
                accordance with applicable Indian laws, including the
                Digital Personal Data Protection Act, 2023 and the
                rules made under it, as and when their respective
                provisions apply.
              </p>
            </Section>

            <Section
              id="information"
              number="02"
              title="Information We Collect"
            >
              <p>
                The information we collect depends on how you use
                ServoraCare. It may include:
              </p>

              <ul className="list-disc space-y-2 pl-6 marker:text-orange-500">
                <li>
                  <strong className="text-slate-800">
                    Account details:
                  </strong>{" "}
                  Your name, email address, mobile number, account role
                  and login credentials.
                </li>
                <li>
                  <strong className="text-slate-800">
                    Booking details:
                  </strong>{" "}
                  The service requested, service address, preferred
                  date or time, booking status and instructions you
                  provide.
                </li>
                <li>
                  <strong className="text-slate-800">
                    Technician information:
                  </strong>{" "}
                  Details provided by service professionals, such as
                  contact information, service specialisation,
                  availability and relevant onboarding information.
                </li>
                <li>
                  <strong className="text-slate-800">
                    Payment references:
                  </strong>{" "}
                  Payment status, transaction reference or UTR details
                  submitted to help us verify a payment.
                </li>
                <li>
                  <strong className="text-slate-800">
                    Support communications:
                  </strong>{" "}
                  Messages, feedback, complaints and information
                  submitted through our contact or support channels.
                </li>
                <li>
                  <strong className="text-slate-800">
                    Technical information:
                  </strong>{" "}
                  Information such as browser type, device details,
                  IP address, log information and website usage data,
                  where collected by our systems or enabled tools.
                </li>
              </ul>

              <p>
                Please do not send us your password, login OTP, UPI PIN,
                card PIN or other confidential authentication details.
                We do not need your UPI PIN or card PIN to verify a
                payment reference.
              </p>
            </Section>

            <Section
              id="use"
              number="03"
              title="How We Use Information"
            >
              <p>We use relevant information for purposes such as:</p>

              <ul className="list-disc space-y-2 pl-6 marker:text-orange-500">
                <li>Creating and managing customer and technician accounts.</li>
                <li>Receiving, processing and managing service bookings.</li>
                <li>Sharing necessary booking information with the assigned service professional.</li>
                <li>Communicating booking confirmations, updates and service-related messages.</li>
                <li>Checking submitted payment references and maintaining transaction records.</li>
                <li>Responding to enquiries, complaints and support requests.</li>
                <li>Maintaining platform security and preventing fraud or misuse.</li>
                <li>Understanding website performance and improving our services.</li>
                <li>Meeting applicable legal, regulatory and record-keeping requirements.</li>
              </ul>

              <p>
                We aim to use information only for the purposes
                explained to you or for other purposes permitted by
                applicable law.
              </p>
            </Section>

            <Section
              id="sharing"
              number="04"
              title="When We Share Information"
            >
              <p>
                We do not sell personal information as a business
                practice. We may share limited information when it is
                needed to operate the platform or provide a service.
              </p>

              <ul className="list-disc space-y-2 pl-6 marker:text-orange-500">
                <li>
                  <strong className="text-slate-800">
                    Assigned technicians:
                  </strong>{" "}
                  Relevant customer contact, service and location
                  details needed to carry out an accepted booking.
                </li>
                <li>
                  <strong className="text-slate-800">
                    Customers:
                  </strong>{" "}
                  Relevant service professional details needed to
                  coordinate a booking.
                </li>
                <li>
                  <strong className="text-slate-800">
                    Technology providers:
                  </strong>{" "}
                  Service providers supporting website hosting,
                  databases, email delivery, security, analytics and
                  platform operations.
                </li>
                <li>
                  <strong className="text-slate-800">
                    Advertising partners:
                  </strong>{" "}
                  Relevant technical information may be processed
                  through advertising technologies if advertisements
                  are enabled on our website.
                </li>
                <li>
                  <strong className="text-slate-800">
                    Legal authorities:
                  </strong>{" "}
                  Information may be disclosed where required by law,
                  a valid legal process or a lawful government request.
                </li>
              </ul>

              <p>
                Where third parties process information for us, we
                expect appropriate safeguards and contractual
                protections to be used, as required by applicable law.
              </p>
            </Section>

            <Section
              id="payments"
              number="05"
              title="Payments and Bookings"
            >
              <p>
                ServoraCare may collect payment-related information
                such as payment status and transaction reference
                numbers or UTR details submitted by users.
              </p>

              <p>
                Where you pay through a UPI application or another
                payment service, that provider's own terms and privacy
                policy also apply. We do not ask you to share your UPI
                PIN, card PIN or banking password with us.
              </p>

              <p>
                Booking addresses and contact details may be shared
                with the assigned service professional to coordinate
                the requested service. Please provide accurate details
                and only information necessary for the booking.
              </p>
            </Section>

            <Section
              id="cookies"
              number="06"
              title="Cookies and Analytics"
            >
              <p>
                Cookies are small files stored by your browser. We and
                service providers working with us may use cookies or
                similar technologies to:
              </p>

              <ul className="list-disc space-y-2 pl-6 marker:text-orange-500">
                <li>Keep website features and sessions working.</li>
                <li>Remember preferences where supported.</li>
                <li>Understand website traffic and performance.</li>
                <li>Measure advertising performance and prevent invalid activity.</li>
              </ul>

              <p>
                You can manage cookies through your browser settings.
                Blocking certain cookies may affect some website
                features. Where applicable law requires consent before
                non-essential cookies or similar technologies are
                used, we will seek that consent through an appropriate
                mechanism.
              </p>
            </Section>

            <Section
              id="advertising"
              number="07"
              title="Google AdSense and Advertising"
            >
              <p>
                If advertising is enabled on ServoraCare, we may use
                Google AdSense or other advertising partners to display
                advertisements.
              </p>

              <p>
                Third-party vendors, including Google, use cookies to
                serve ads based on a user's prior visits to this
                website or other websites. Google's use of advertising
                cookies enables Google and its partners to serve ads
                based on visits to this site and/or other sites on the
                Internet.
              </p>

              <p>
                Users can opt out of personalised advertising by
                visiting Google's Ads Settings:
              </p>

              <a
                href="https://adssettings.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex font-semibold text-orange-600 hover:underline"
              >
                Google Ads Settings ↗
              </a>

              <p>
                You can also learn more about Google's advertising
                technologies here:
              </p>

              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex font-semibold text-orange-600 hover:underline"
              >
                How Google uses information from sites or apps that use
                its services ↗
              </a>

              <p>
                Google's general Privacy Policy is available at:
              </p>

              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex font-semibold text-orange-600 hover:underline"
              >
                Google Privacy Policy ↗
              </a>

              <p>
                If other advertising networks serve advertisements on
                this website, their identities and relevant privacy
                information should also be disclosed here or through
                an appropriate linked notice.
              </p>

              <p>
                Where required by applicable law or Google's publisher
                requirements, we will provide suitable cookie
                disclosures, consent choices and advertising controls.
              </p>
            </Section>

            <Section
              id="retention"
              number="08"
              title="Data Retention and Security"
            >
              <p>
                We keep personal information only for as long as it is
                reasonably needed for the purpose for which it was
                collected, including providing services, maintaining
                necessary business records, resolving disputes,
                protecting the platform and meeting legal obligations.
              </p>

              <p>
                When information is no longer required, we aim to
                securely delete it or remove identifying details,
                subject to applicable legal and operational
                requirements.
              </p>

              <p>
                We use reasonable security measures intended to
                protect information against unauthorised access,
                alteration, disclosure, loss or misuse. These may
                include access controls and appropriate technical
                safeguards.
              </p>

              <p>
                No website, internet transmission or storage system
                can be guaranteed to be completely secure. If a
                personal data breach occurs, we will take steps
                required by applicable law.
              </p>
            </Section>

            <Section
              id="rights"
              number="09"
              title="Your Privacy Choices and Rights"
            >
              <p>
                Depending on the law applicable to your information,
                you may have rights to:
              </p>

              <ul className="list-disc space-y-2 pl-6 marker:text-orange-500">
                <li>Request information about personal data being processed.</li>
                <li>Request correction or updating of inaccurate information.</li>
                <li>Request erasure of personal data where legally applicable.</li>
                <li>Withdraw consent where processing is based on consent.</li>
                <li>Raise a privacy concern or grievance.</li>
                <li>Use any other rights available under applicable law.</li>
              </ul>

              <p>
                To make a request, email us at{" "}
                <a
                  href="mailto:support@servoracare.in"
                  className="font-semibold text-orange-600 hover:underline"
                >
                  support@servoracare.in
                </a>
                {" "}using the subject line "Privacy Request".
              </p>

              <p>
                We may need to verify your identity before acting on a
                request. Some information may need to be retained
                where the law requires it or where it is necessary to
                establish, exercise or defend a legal claim.
              </p>
            </Section>

            <Section
              id="children"
              number="10"
              title="Children's Privacy"
            >
              <p>
                Our platform is designed for people who are legally
                able to create an account and request or provide
                services. We do not knowingly seek to collect
                children's personal data in breach of applicable
                law.
              </p>

              <p>
                If you believe a child has provided personal
                information to us improperly, please contact us. We
                will review the matter and take steps required by
                applicable law.
              </p>
            </Section>

            <Section
              id="transfers"
              number="11"
              title="Third-Party Services"
            >
              <p>
                Our website may rely on third-party services for
                hosting, database operations, email delivery,
                analytics, payment-related activities and
                advertising. These providers may process information
                according to their own terms and privacy policies.
              </p>

              <p>
                Our website may also link to external websites. We do
                not control the privacy practices of those websites,
                so please read their policies before sharing
                information with them.
              </p>

              <p>
                Where personal information is processed or stored
                outside India, we will take steps required by
                applicable Indian law and any other applicable
                requirements.
              </p>
            </Section>

            <Section
              id="changes"
              number="12"
              title="Policy Updates"
            >
              <p>
                We may update this Privacy Policy when our services,
                technology, data practices or legal requirements
                change.
              </p>

              <p>
                The latest version will be published on this page
                with its revised date. We encourage you to review
                this page periodically.
              </p>

              <p>
                If a change requires fresh notice or consent under
                applicable law, we will take the steps required
                before relying on that change.
              </p>
            </Section>

            <Section
              id="contact"
              number="13"
              title="Contact and Grievances"
            >
              <p>
                If you have a question, privacy request or complaint
                about how ServoraCare handles your personal
                information, please contact us.
              </p>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="font-bold text-slate-900">
                  ServoraCare
                </p>

                <p className="mt-3 text-sm text-slate-600">
                  Website
                </p>
                <a
                  href="https://www.servoracare.in"
                  className="font-semibold text-orange-600 hover:underline"
                >
                  www.servoracare.in
                </a>

                <p className="mt-4 text-sm text-slate-600">
                  Privacy and support enquiries
                </p>
                <a
                  href="mailto:support@servoracare.in"
                  className="font-semibold text-orange-600 hover:underline"
                >
                  support@servoracare.in
                </a>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  Please use the subject line "Privacy Request" or
                  "Privacy Grievance" so that your message can be
                  directed appropriately.
                </p>
              </div>
            </Section>

            {/* CLOSING */}
            <div className="mt-8 rounded-2xl bg-blue-950 p-6 text-white md:p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-orange-300">
                ServoraCare
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                Your Home, Our Care.
              </h2>
              <p className="mt-3 text-sm leading-6 text-blue-100">
                Thank you for trusting ServoraCare. We value your
                privacy and aim to handle your information with care
                and transparency.
              </p>
            </div>

            <p className="mt-8 text-center text-xs leading-5 text-slate-400">
              This Privacy Policy is published for general
              information. It does not replace any rights or
              obligations under applicable law.
            </p>
          </article>
        </div>
      </main>
    </>
  );
}

export default PrivacyPolicy;
