import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/" className="flex items-center text-gray-600 hover:text-brand-purple">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using SheetDrop ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p className="text-gray-700 mb-4">
                These Terms of Service ("Terms") govern your use of our email automation service that processes emails and extracts data to Google Sheets. By using our Service, you agree to these Terms. These Terms should be read in conjunction with our <Link to="/privacy" className="text-brand-purple hover:underline">Privacy Policy</Link>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                SheetDrop is an email automation service that:
              </p>
              <ul className="list-disc ml-6 text-gray-700 mb-4">
                <li>Processes incoming emails based on user-configured filters</li>
                <li>Extracts relevant data from email content and attachments</li>
                <li>Automatically organizes data into Google Sheets</li>
                <li>Provides email management and automation tools</li>
                <li>Offers customizable filtering and data extraction rules</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts and Registration</h2>
              <p className="text-gray-700 mb-4">
                To use our Service, you must:
              </p>
              <ul className="list-disc ml-6 text-gray-700 mb-4">
                <li>Be at least 18 years old or have parental consent</li>
                <li>Register for an account with valid information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized use</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Service Plans and Pricing</h2>
              <p className="text-gray-700 mb-4">
                We offer the following service plans:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Free Plan</h3>
                <ul className="list-disc ml-6 text-gray-700 mb-2">
                  <li>1 filter total</li>
                  <li>10 emails processed per month</li>
                  <li>Basic email automation features</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Pro Plan</h3>
                <ul className="list-disc ml-6 text-gray-700 mb-2">
                  <li>20 filters total</li>
                  <li>1,000 emails processed per month</li>
                  <li>Advanced automation features</li>
                  <li>Priority support</li>
                </ul>
              </div>
              <p className="text-gray-700">
                Pricing is subject to change with 30 days notice. All fees are non-refundable except as required by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Acceptable Use Policy</h2>
              <p className="text-gray-700 mb-4">
                You agree not to use the Service to:
              </p>
              <ul className="list-disc ml-6 text-gray-700 mb-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Process emails containing illegal, harmful, or offensive content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Use the Service for spam or unsolicited communications</li>
                <li>Reverse engineer or attempt to extract source code</li>
                <li>Share account credentials with unauthorized users</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Processing and Privacy</h2>
              <p className="text-gray-700 mb-4">
                Our data processing practices are governed by our Privacy Policy. By using our Service, you acknowledge that:
              </p>
              <ul className="list-disc ml-6 text-gray-700 mb-4">
                <li>We process emails and extract data as configured by you</li>
                <li>Data is transmitted to your connected Google Sheets</li>
                <li>We implement appropriate security measures</li>
                <li>You are responsible for compliance with applicable data protection laws</li>
                <li>We retain email data for 30 days unless configured otherwise</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property Rights</h2>
              <p className="text-gray-700 mb-4">
                The Service and its original content, features, and functionality are owned by SheetDrop and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p className="text-gray-700">
                You retain ownership of your data and content. You grant us a limited license to process your emails solely for the purpose of providing the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Service Availability and Maintenance</h2>
              <p className="text-gray-700 mb-4">
                We strive to maintain high service availability but do not guarantee uninterrupted access. We may:
              </p>
              <ul className="list-disc ml-6 text-gray-700 mb-4">
                <li>Perform scheduled maintenance with advance notice</li>
                <li>Implement updates and improvements</li>
                <li>Suspend service for security or technical reasons</li>
                <li>Modify features and functionality</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                To the maximum extent permitted by law, SheetDrop shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
              <p className="text-gray-700">
                Our total liability shall not exceed the amount paid by you for the Service in the 12 months preceding the claim.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Indemnification</h2>
              <p className="text-gray-700 mb-4">
                You agree to defend, indemnify, and hold harmless SheetDrop from and against any claims, damages, obligations, losses, liabilities, costs, or debt arising from:
              </p>
              <ul className="list-disc ml-6 text-gray-700 mb-4">
                <li>Your use of the Service</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any third-party rights</li>
                <li>Any content you process through the Service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Termination</h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
              </p>
              <p className="text-gray-700 mb-4">
                Upon termination:
              </p>
              <ul className="list-disc ml-6 text-gray-700 mb-4">
                <li>Your right to use the Service ceases immediately</li>
                <li>We will delete your account and data within 30 days</li>
                <li>You remain liable for any outstanding fees</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Governing Law and Dispute Resolution</h2>
              <p className="text-gray-700 mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction where SheetDrop is incorporated, without regard to its conflict of law provisions.
              </p>
              <p className="text-gray-700">
                Any disputes arising from these Terms or the Service shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these Terms at any time. We will notify users of material changes via email or through the Service. Your continued use of the Service after such modifications constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> varun.bhanot11@gmail.com<br />
                  <strong>Service:</strong> SheetDrop<br />
                  <strong>Address:</strong> SheetDrop Legal Team<br />
                  We'll respond to your inquiry within 30 days.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Severability</h2>
              <p className="text-gray-700">
                If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage; 