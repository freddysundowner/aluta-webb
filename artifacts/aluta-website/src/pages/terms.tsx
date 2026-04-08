import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
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
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground text-sm mb-10">Last updated: April 8, 2025</p>

        <div className="prose prose-invert max-w-none space-y-8 text-foreground/90 leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold mb-3">1. Agreement to Terms</h2>
            <p>
              These Terms of Service ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and <strong>Aluta Technology Ventures Limited</strong> ("Aluta," "we," "us," or "our"), a private limited company incorporated in Kenya (Company No. PVT-Y2UG5E5), with its registered office at Ng'enda House, Oginga Odinga Road, P.O. Box 41, Nakuru 20100, Kenya. The company is owned and directed by <strong>Fredrick Mundia Githumbi</strong>. Our official website is <a href="https://alutatechnologies.com" className="text-primary underline">alutatechnologies.com</a>.
            </p>
            <p className="mt-3">
              By accessing or using any of our platforms — including <strong>Pro-Suite</strong> (pro-suite.co), TokShopLive (tokshoplive.com), PointifyPOS (pointifypos.com), and BankyKit (bankykit.com) — you confirm that you have read, understood, and agree to be bound by these Terms.
            </p>
            <p className="mt-3">
              If you do not agree to these Terms, you must not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Description of Services</h2>
            <p>Aluta Technology Ventures Limited provides the following products and services:</p>
            <ul className="list-disc ml-6 mt-3 space-y-2">
              <li><strong>Pro-Suite</strong> — An all-in-one business productivity suite for teams and companies, accessible at pro-suite.co.</li>
              <li><strong>TokShopLive</strong> — A live commerce platform enabling product sales via livestream, accessible at tokshoplive.com.</li>
              <li><strong>PointifyPOS</strong> — A modern point-of-sale system for African retail businesses, accessible at pointifypos.com.</li>
              <li><strong>BankyKit</strong> — A fintech toolkit for building banking and payments experiences, accessible at bankykit.com.</li>
            </ul>
            <p className="mt-3">
              These services may include web applications, APIs, mobile applications, messaging integrations (including WhatsApp Business API), and related support services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Eligibility</h2>
            <p>
              You must be at least 18 years of age and capable of forming a legally binding contract to use our services. By using our services, you represent and warrant that you meet these requirements. Our services are intended for business use and are not designed for personal, family, or household purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Account Registration</h2>
            <p>
              To access certain features, you must create an account. You agree to:
            </p>
            <ul className="list-disc ml-6 mt-3 space-y-2">
              <li>Provide accurate, current, and complete information during registration.</li>
              <li>Maintain and promptly update your account information.</li>
              <li>Keep your credentials confidential and not share them with third parties.</li>
              <li>Notify us immediately of any unauthorised access to your account.</li>
              <li>Be responsible for all activities that occur under your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. WhatsApp Business Messaging</h2>
            <p>
              As part of our <strong>Pro-Suite</strong> and other services, we use the <strong>WhatsApp Business API</strong> (provided by Meta Platforms, Inc.) to send notifications, alerts, and support communications.
            </p>
            <p className="mt-3">By opting into WhatsApp communications from Aluta, you agree that:</p>
            <ul className="list-disc ml-6 mt-3 space-y-2">
              <li>You have provided your own WhatsApp number or a number you are authorised to use.</li>
              <li>You consent to receiving business-initiated messages including service notifications, transactional updates, and support responses.</li>
              <li>You may opt out at any time by replying <strong>STOP</strong> or contacting our support team.</li>
              <li>You will not use our messaging services to send spam, illegal content, or content that violates Meta's WhatsApp Business Policy.</li>
            </ul>
            <p className="mt-3">
              Our use of WhatsApp Business API is subject to <a href="https://www.whatsapp.com/legal/business-policy" target="_blank" rel="noopener noreferrer" className="text-primary underline">Meta's WhatsApp Business Policy</a> and <a href="https://www.whatsapp.com/legal/commerce-policy" target="_blank" rel="noopener noreferrer" className="text-primary underline">Commerce Policy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Acceptable Use</h2>
            <p>You agree not to use our services to:</p>
            <ul className="list-disc ml-6 mt-3 space-y-2">
              <li>Violate any applicable Kenyan law, international law, or regulation.</li>
              <li>Infringe upon the intellectual property rights of others.</li>
              <li>Transmit spam, malware, or any harmful or deceptive content.</li>
              <li>Attempt to gain unauthorised access to our systems or the accounts of other users.</li>
              <li>Reverse engineer, decompile, or disassemble any part of our software.</li>
              <li>Resell or sublicence our services without express written authorisation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Intellectual Property</h2>
            <p>
              All content, trademarks, software, designs, and materials on our platforms are the exclusive property of Aluta Technology Ventures Limited or its licensors. Nothing in these Terms grants you any right to use our brand name, logo, or other proprietary content without our prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Payment and Subscriptions</h2>
            <p>
              Certain services require a paid subscription or transaction fee. All pricing is displayed at the point of purchase. Payments are processed by secure third-party payment processors. Subscriptions auto-renew unless cancelled before the renewal date. Refund eligibility is governed by the refund policy applicable to your specific service plan.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by Kenyan law, Aluta Technology Ventures Limited shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenue, whether incurred directly or indirectly. Our total aggregate liability to you for any claims arising under these Terms shall not exceed the amount you have paid to us in the three months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Disclaimer of Warranties</h2>
            <p>
              Our services are provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, regarding the reliability, availability, or fitness of our services for any particular purpose. We do not warrant that our services will be uninterrupted, error-free, or free from harmful components.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">11. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to our services at any time, with or without notice, if you breach these Terms or engage in conduct that we determine, in our sole discretion, is harmful to us, other users, or third parties. You may terminate your account at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">12. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the Republic of Kenya. Any disputes arising from or relating to these Terms shall be subject to the exclusive jurisdiction of the courts of Kenya.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">13. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. Material changes will be communicated by updating the "last updated" date on this page and, where appropriate, by sending a notice to your registered contact. Continued use of our services after changes take effect constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">14. Contact Us</h2>
            <p>For questions or concerns about these Terms, contact us at:</p>
            <div className="mt-3 space-y-1">
              <p><strong>Aluta Technology Ventures Limited</strong></p>
              <p>Director: Fredrick Mundia Githumbi</p>
              <p>Ng'enda House, Oginga Odinga Road</p>
              <p>P.O. Box 41, Nakuru 20100, Kenya</p>
              <p>Phone: +254 715 363 474</p>
              <p>Website: <a href="https://alutatechnologies.com" className="text-primary underline">alutatechnologies.com</a></p>
              <p>Email: <a href="mailto:hello@aluta.co.ke" className="text-primary underline">hello@aluta.co.ke</a></p>
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
