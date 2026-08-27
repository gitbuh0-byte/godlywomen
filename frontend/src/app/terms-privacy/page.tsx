'use client';

import { useState } from 'react';

export default function TermsPrivacyPage() {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>('terms');

  return (
    <main className="flex-1 bg-white relative">
      {/* Decorative Background Elements */}
      <svg className="fixed top-0 right-0 w-screen h-96 opacity-40 pointer-events-none -z-10" viewBox="0 0 400 400" preserveAspectRatio="none">
        <circle cx="100" cy="80" r="80" fill="#c4b5fd"/>
        <circle cx="200" cy="60" r="90" fill="#ec4899"/>
        <circle cx="280" cy="150" r="100" fill="#e9d5ff"/>
      </svg>

      {/* Header Section */}
      <section className="border-b border-gray-200 py-12 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl font-bold mb-2 text-black">Terms & Privacy</h1>
          <p className="text-gray-600 font-light">Understand how we protect your rights and data</p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="border-b border-gray-200 sticky top-0 z-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('terms')}
              className={`py-4 font-medium text-sm transition-all duration-300 border-b-2 ${
                activeTab === 'terms'
                  ? 'text-black border-purple-600'
                  : 'text-gray-600 border-transparent hover:text-black'
              }`}
            >
              Terms of Service
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`py-4 font-medium text-sm transition-all duration-300 border-b-2 ${
                activeTab === 'privacy'
                  ? 'text-black border-purple-600'
                  : 'text-gray-600 border-transparent hover:text-black'
              }`}
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 py-16 relative z-10 bg-white">
        {activeTab === 'terms' && (
          <div className="space-y-8 relative z-10">
            <div>
              <h2 className="font-serif text-2xl font-bold text-black mb-4">Terms of Service</h2>
              <p className="text-gray-600 font-light">Last updated: March 2, 2026</p>
            </div>

            {[
              {
                title: '1. Acceptance of Terms',
                content: 'By accessing and using the Godly Women platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
              },
              {
                title: '2. Use License',
                content: 'Permission is granted to temporarily download one copy of the materials (information or software) on Godly Women for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:\n\n• Modify or copy the materials\n• Use the materials for any commercial purpose or for any public display\n• Attempt to decompile or reverse engineer any software contained on the platform\n• Remove any copyright or other proprietary notations from the materials\n• Transfer the materials to another person or "mirror" the materials on any other server'
              },
              {
                title: '3. Disclaimer',
                content: 'The materials on Godly Women are provided on an "as is" basis. Godly Women makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.'
              },
              {
                title: '4. Limitations',
                content: 'In no event shall Godly Women or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Godly Women.'
              },
              {
                title: '5. Accuracy of Materials',
                content: 'The materials appearing on Godly Women could include technical, typographical, or photographic errors. Godly Women does not warrant that any of the materials on Godly Women are accurate, complete, or current. We may make changes to the materials contained on Godly Women at any time without notice.'
              },
              {
                title: '6. Materials and Content',
                content: 'Godly Women does not control the content posted on this website by users. You are responsible for the content you post. By posting, you grant Godly Women a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute such content. You warrant that you own or have the necessary rights to the content you submit.'
              },
              {
                title: '7. Community Guidelines',
                content: 'Users agree to refrain from:\n\n• Posting illegal content\n• Harassment, hate speech, or discrimination\n• Spam or advertising\n• Violating others\' privacy or intellectual property rights\n• Any conduct that disrupts the community\n\nViolations may result in account suspension or termination.'
              },
              {
                title: '8. Limitation of Liability',
                content: 'In no case shall Godly Women, its directors, officers, or agents be liable to you for any indirect, incidental, special, consequential, or punitive damages resulting from any aspect of your use of or inability to use the platform.'
              },
              {
                title: '9. Modifications',
                content: 'Godly Women may revise these terms of service for Godly Women at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.'
              },
              {
                title: '10. Governing Law',
                content: 'These conditions and terms are governed by and construed in accordance with the laws of the jurisdiction in which Godly Women operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.'
              },
            ].map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-black mb-3">{section.title}</h3>
                <p className="text-gray-700 font-light whitespace-pre-wrap leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-8 relative z-10">
            <div>
              <h2 className="font-serif text-2xl font-bold text-black mb-4">Privacy Policy</h2>
              <p className="text-gray-600 font-light">Last updated: March 2, 2026</p>
            </div>

            {[
              {
                title: '1. Introduction',
                content: 'Godly Women ("we", "our", or "us") operates the platform. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service and the choices you have associated with that data.'
              },
              {
                title: '2. Information Collection and Use',
                content: 'We collect several different types of information for various purposes to provide and improve our service to you.\n\nTypes of Data Collected:\n• Personal Data: Name, email address, phone number, profile information\n• Usage Data: Browser type, IP address, pages visited, time and date of visits\n• Cookies and Similar Tracking Technologies: For security and user experience'
              },
              {
                title: '3. Use of Data',
                content: 'Godly Women uses the collected data for various purposes:\n\n• To provide and maintain our service\n• To notify you about changes to our service\n• To provide customer care and support\n• To gather analysis or valuable information to improve our service\n• To monitor the usage of our service\n• To detect, prevent, and address technical issues'
              },
              {
                title: '4. Security of Data',
                content: 'The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.'
              },
              {
                title: '5. Third-Party Services',
                content: 'Our service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party\'s site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.'
              },
              {
                title: '6. Children\'s Privacy',
                content: 'Our service does not address anyone under the age of 13 ("Children"). We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us immediately.'
              },
              {
                title: '7. Communication Preferences',
                content: 'You have the right to control what types of communications you receive from us. You can manage your preferences through your account settings. You can opt-out of promotional emails at any time by clicking the unsubscribe link in the email.'
              },
              {
                title: '8. Your Rights',
                content: 'Depending on your location, you may have certain rights regarding your personal data:\n\n• Right to access: You can request a copy of your personal data\n• Right to rectification: You can correct inaccurate data\n• Right to erasure: You can request deletion of your data\n• Right to restrict processing: You can limit how we use your data\n• Right to data portability: You can request your data in a portable format'
              },
              {
                title: '9. Changes to This Privacy Policy',
                content: 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this policy.'
              },
              {
                title: '10. Contact Us',
                content: 'If you have any questions about this Privacy Policy, please contact us at:\n\nEmail: privacy@godlywomen.com\nPhone: +1 (555) 123-4567\nAddress: Godly Women Community'
              },
            ].map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-black mb-3">{section.title}</h3>
                <p className="text-gray-700 font-light whitespace-pre-wrap leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer CTA */}
      <section className="px-6 py-16 relative z-10 bg-white">
        <div className="rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white py-16 px-6 max-w-4xl mx-auto text-center hover:shadow-lg transition-all">
          <h2 className="font-serif text-3xl font-bold mb-4">Questions?</h2>
          <p className="text-purple-50 mb-8 font-light">
            Get in touch with our support team if you have any questions about our terms or privacy practices.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full font-medium hover:bg-purple-50 transition"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
}
