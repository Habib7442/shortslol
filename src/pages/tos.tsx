import Footer from '@/components/Footer';
import Header from '@/components/layout/Header';

const tos = () => {
  return (
    <div>
      <Header />
      <div className='mx-4 my-10 min-h-screen text-gray-900 sm:mx-10'>
        <h1>Privacy Policy for shortslol</h1>
        <p>
          <strong>Effective Date: May 21, 2023</strong>
        </p>
        <h2>1. Introduction</h2>
        <p>
          Welcome to shortslol. Your privacy is of great importance to us and we
          are committed to protecting it. This Privacy Policy describes how we
          collect, use, process, and disclose your information, including
          personal information, in conjunction with your access to and use of
          the shortslol services.
        </p>
        <h2>2. Information We Collect</h2>
        <p>
          The primary type of personal information we collect is your email
          address. When you sign up for our services, we require your email
          address to create an account and to facilitate communication with you.
        </p>
        <h2>3. How We Use Your Information</h2>
        <p>We use your email address for the following purposes:</p>
        <ul>
          <li>To create and maintain your account.</li>
          <li>To communicate with you about your account and our services.</li>
          <li>
            To send you marketing materials, if you have opted in to receive
            such communications.
          </li>
          <li>To comply with our legal obligations.</li>
        </ul>
        <h2>4. Sharing and Disclosure</h2>
        <p>
          shortslol does not sell or rent your personal information to third
          parties. We only disclose your information in the following
          circumstances:
        </p>
        <ul>
          <li>To service providers that we use to support our business.</li>
          <li>
            In response to a subpoena or similar investigative demand, court
            order, or request for cooperation from law enforcement or other
            government agencies.
          </li>
          <li>
            To defend against legal claims or to exercise our legal rights.
          </li>
        </ul>
        <h2>5. Data Security</h2>
        <p>
          We use industry-standard methods and take reasonable measures to
          protect your personal information. While no method of data
          transmission over the Internet or electronic storage is 100% secure,
          we strive to use commercially acceptable means to protect your
          personal information.
        </p>
        <h2>6. Your Rights</h2>
        <p>
          You have the right to access, update or delete your personal
          information at any time. If you wish to exercise any of these rights,
          please contact us at our support email.
        </p>
        <h2>7. Changes to this Policy</h2>
        <p>
          From time to time, we may update this Privacy Policy to reflect
          changes to our information practices. We will notify you of any
          changes by posting the new Privacy Policy on this page.
        </p>
        <h2>8. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at: <a href='mailto:team@shorts.lol'>team@shorts.lol</a>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default tos;
