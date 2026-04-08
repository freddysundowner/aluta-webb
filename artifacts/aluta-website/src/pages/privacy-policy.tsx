import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between border-b border-border/40 bg-background/90 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-white text-sm">A</div>
          <span className="font-bold tracking-tight text-lg">Aluta Technology Ventures</span>
        </Link>
        <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-32">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm mb-10">Last updated: April 8, 2025</p>

        <div className="prose prose-invert max-w-none space-y-8 text-foreground/90 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
            <p>
              Aluta Technology Ventures Limited ("Aluta," "we," "us," or "our") is a technology company incorporated in Kenya (Company No. PVT-Y2UG5E5), registered at Ng'enda House, Oginga Odinga Road, P.O. Box 41, Nakuru 20100, Kenya. The company is co-owned and directed by <strong>John Mbugua Mochu</strong> and <strong>Fredrick Mundia Githumbi</strong>, each holding equal shares of the company.
            </p>
            <p className="mt-3">
              Our official website is <a href="https://alutatechnologies.com" className="text-primary underline">alutatechnologies.com</a>. This Privacy Policy describes how we collect, use, disclose, and safeguard your personal information when you use our products and services, including <strong>Pro-Suite</strong> (pro-suite.co), TokShopLive (tokshoplive.com), PointifyPOS (pointifypos.com), and BankyKit (bankykit.com), as well as when you interact with us via messaging platforms including WhatsApp.
            </p>
            <p className="mt-3">
              By accessing or using any of our services, you agree to the terms of this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
            <p>We may collect the following categories of personal information:</p>
            <ul className="list-disc ml-6 mt-3 space-y-2">
              <li><strong>Identity Information:</strong> Full name, business name, job title.</li>
              <li><strong>Contact Information:</strong> Email address, phone number, WhatsApp number, physical business address.</li>
              <li><strong>Account Information:</strong> Username, password (hashed), account preferences, and subscription details.</li>
              <li><strong>Business Data:</strong> Transaction records, inventory data, point-of-sale records, and productivity data generated through use of our platforms.</li>
              <li><strong>Communication Data:</strong> Messages, inquiries, and support requests sent to us via WhatsApp Business API, email, or in-app messaging.</li>
              <li><strong>Usage Data:</strong> Pages visited, features used, session duration, device information, browser type, and IP address.</li>
              <li><strong>Payment Information:</strong> Billing details processed through secure third-party payment processors. We do not store full card numbers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
            <p>We use the personal information we collect to:</p>
            <ul className="list-disc ml-6 mt-3 space-y-2">
              <li>Provide, operate, and maintain our products and services.</li>
              <li>Create and manage your account.</li>
              <li>Send transactional notifications, service updates, and support responses via WhatsApp Business API and email.</li>
              <li>Send marketing communications where you have opted in (you may opt out at any time).</li>
              <li>Process payments and subscriptions.</li>
              <li>Analyse usage trends to improve our services.</li>
              <li>Comply with legal obligations under Kenyan law and applicable international regulations.</li>
              <li>Detect and prevent fraud, abuse, or security incidents.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. WhatsApp Business Messaging</h2>
            <p>
              Aluta Technology Ventures Limited uses the <strong>WhatsApp Business API</strong> (Meta Platforms, Inc.) to communicate with users of our services, particularly <strong>Pro-Suite</strong>. This includes:
            </p>
            <ul className="list-disc ml-6 mt-3 space-y-2">
              <li>Sending account notifications, subscription alerts, and service updates.</li>
              <li>Providing customer support responses through WhatsApp Business messaging.</li>
              <li>Sending transactional messages initiated by user actions within our platform.</li>
            </ul>
            <p className="mt-3">
              By providing your WhatsApp number and opting into WhatsApp messaging, you consent to receiving such communications from us. You may opt out at any time by replying <strong>STOP</strong> to any message or by contacting us at <a href="mailto:info@alutatechnologies.com" className="text-primary underline">info@alutatechnologies.com</a>.
            </p>
            <p className="mt-3">
              We do not sell or share your WhatsApp number or message content with third parties for their own marketing purposes. WhatsApp communications are governed by <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary underline">Meta's Privacy Policy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Sharing of Information</h2>
            <p>We do not sell your personal information. We may share your information with:</p>
            <ul className="list-disc ml-6 mt-3 space-y-2">
              <li><strong>Service Providers:</strong> Third-party vendors who assist in hosting, payment processing, analytics, and communication (including Meta Platforms for WhatsApp Business API).</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
              <li><strong>Legal Requirements:</strong> Where required by Kenyan law, court order, or regulatory authority.</li>
              <li><strong>With Your Consent:</strong> In any other case with your explicit consent.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Data Retention</h2>
            <p>
              We retain your personal data for as long as your account is active or as needed to provide you services. We will retain and use your information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements. You may request deletion of your account and associated data by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Data Security</h2>
            <p>
              We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. These include encryption in transit (HTTPS/TLS), access controls, and regular security reviews. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc ml-6 mt-3 space-y-2">
              <li>Access the personal information we hold about you.</li>
              <li>Correct inaccurate or incomplete data.</li>
              <li>Request deletion of your personal data.</li>
              <li>Object to or restrict certain processing activities.</li>
              <li>Withdraw consent where processing is based on consent.</li>
              <li>Lodge a complaint with a data protection authority.</li>
            </ul>
            <p className="mt-3">To exercise these rights, contact us at <a href="mailto:info@alutatechnologies.com" className="text-primary underline">info@alutatechnologies.com</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Children's Privacy</h2>
            <p>
              Our services are intended for use by businesses and individuals aged 18 and above. We do not knowingly collect personal information from children under 18. If you believe we have inadvertently collected such data, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on this page with a revised "last updated" date. Continued use of our services after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">11. Contact Us</h2>
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:</p>
            <div className="mt-3 space-y-1">
              <p><strong>Aluta Technology Ventures Limited</strong></p>
              <p>Directors: John Mbugua Mochu &amp; Fredrick Mundia Githumbi</p>
              <p>Ng'enda House, Oginga Odinga Road</p>
              <p>P.O. Box 41, Nakuru 20100, Kenya</p>
              <p>Phone: +254 715 363 474</p>
              <p>Website: <a href="https://alutatechnologies.com" className="text-primary underline">alutatechnologies.com</a></p>
              <p>Email: <a href="mailto:info@alutatechnologies.com" className="text-primary underline">info@alutatechnologies.com</a></p>
            </div>
          </section>

        </div>
      </main>

      <footer className="border-t border-border/40 py-10 px-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Aluta Technology Ventures Limited. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-3">
          <Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        </div>
      </footer>
    </div>
  );
}
