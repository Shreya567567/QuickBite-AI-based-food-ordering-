import { useNavigate } from "react-router-dom";
import "./PrivacySecurity.css";

export default function PrivacySecurity() {
  const navigate = useNavigate();

  return (
    <div className="privacy-security-container">
      {/* Back to Profile Button & Header */}
      <header className="privacy-header">
        <button className="back-btn" onClick={() => navigate("/profile")}>
          <span className="material-symbols-outlined">arrow_back</span>
          <span>Back to Profile</span>
        </button>
        <h1 className="privacy-title">Privacy &amp; Security Policy</h1>
        <p className="privacy-subtitle">
          Learn how QuickBite protects your personal information, manages your data, and secures your platform experience.
        </p>
      </header>

      {/* Grid Layout for Policies */}
      <main className="privacy-content-grid">
        
        {/* Card 1: Data Collection & Usage */}
        <section className="policy-card">
          <div className="policy-card-header">
            <span className="material-symbols-outlined policy-icon primary">visibility</span>
            <h2>Data Collection &amp; Usage</h2>
          </div>
          <div className="policy-card-body">
            <p>
              We collect information that helps us deliver a customized, high-quality food delivery experience:
            </p>
            <ul>
              <li><strong>Profile Information:</strong> Your name, email address, phone number, and date of birth are stored securely to identify you and customize your user profile.</li>
              <li><strong>Addresses:</strong> Saved delivery locations (e.g. Home, Office) are kept to streamline the checkout process and verify delivery availability.</li>
              <li><strong>Location Data:</strong> With your permission, we use approximate location details to compute nearby restaurants and estimate delivery times accurately.</li>
              <li><strong>Device &amp; Session:</strong> Login sessions, cookie preferences, and UI selections (such as Dark Mode) are saved locally to maintain persistent settings.</li>
            </ul>
          </div>
        </section>

        {/* Card 2: Security Infrastructure */}
        <section className="policy-card">
          <div className="policy-card-header">
            <span className="material-symbols-outlined policy-icon secondary">security</span>
            <h2>Security Infrastructure</h2>
          </div>
          <div className="policy-card-body">
            <p>
              QuickBite uses industry-standard protective measures to safeguard your credentials and transactions:
            </p>
            <ul>
              <li><strong>Secure Authentication:</strong> User accounts and credentials are managed through Firebase Authentication, which utilizes secure password hashing algorithms and prevents unauthorized access.</li>
              <li><strong>Data Encryption:</strong> All data transmitted between your browser and our servers is encrypted in transit using Secure Socket Layer (SSL/TLS) technology.</li>
              <li><strong>Firestore Security:</strong> Database records are guarded by strict Firestore security rules that ensure only authorized users can read or write their own profile and order history.</li>
              <li><strong>Payment Protections:</strong> All future payment integrations will be PCI-DSS compliant. No full credit/debit card numbers are ever stored directly on our servers.</li>
            </ul>
          </div>
        </section>

        {/* Card 3: Sharing & Third-Party Disclosure */}
        <section className="policy-card">
          <div className="policy-card-header">
            <span className="material-symbols-outlined policy-icon tertiary">share</span>
            <h2>Sharing &amp; Disclosures</h2>
          </div>
          <div className="policy-card-body">
            <p>
              We respect your privacy and enforce strict boundaries on how your information is disclosed:
            </p>
            <ul>
              <li><strong>With Restaurant Partners:</strong> Only necessary delivery details (name, delivery address, and phone number) are shared with the specific restaurant preparing your order.</li>
              <li><strong>No Data Selling:</strong> We do not sell, rent, or trade your personal data to advertising agencies or third-party marketing companies.</li>
              <li><strong>Legal Compliance:</strong> We may disclose information if required to do so by law, court order, or governmental authority to protect public safety or legal rights.</li>
            </ul>
          </div>
        </section>

        {/* Card 4: Your Rights & Actions */}
        <section className="policy-card">
          <div className="policy-card-header">
            <span className="material-symbols-outlined policy-icon error">person_pin</span>
            <h2>Your Rights &amp; Data Control</h2>
          </div>
          <div className="policy-card-body">
            <p>
              You maintain full control over the personal details you share with the platform:
            </p>
            <ul>
              <li><strong>Access &amp; Edit:</strong> You can review and update your name, phone number, date of birth, and saved addresses directly from your profile settings screen at any time.</li>
              <li><strong>Account Deletion:</strong> If you wish to permanently delete your account and all associated profile records, you can submit a deletion request by contacting our privacy compliance team.</li>
              <li><strong>Opt-Out Preferences:</strong> You can configure browser settings to disable local cookies, although some components of the platform (like active logins) may not work correctly as a result.</li>
            </ul>
          </div>
        </section>

      </main>

      {/* Footer Support Zone */}
      <footer className="privacy-footer">
        <div className="support-card">
          <div>
            <h3>Have Privacy Questions?</h3>
            <p>Our dedicated compliance team is ready to assist you with data protection queries or account deletion requests.</p>
          </div>
          <a href="mailto:privacy@quickbite.com" className="contact-btn">
            <span className="material-symbols-outlined">mail</span>
            <span>Contact Privacy Support</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
