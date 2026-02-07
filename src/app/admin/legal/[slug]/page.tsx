import { getLegalDoc, updateLegalDoc } from "@/app/actions/legal";
import { LegalEditorForm } from "@/components/admin/LegalEditorForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function AdminLegalEditPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const doc = await getLegalDoc(slug);

    // Default content migration (from previous static files)
    const defaults: Record<string, string> = {
        privacy: `
            <h1>Privacy Policy</h1>
            <p>Last updated: December 21, 2024</p>
            <h2>1. Introduction</h2>
            <p>StarApp.AI respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>
            <h2>2. Data We Collect</h2>
            <p>We collect Identity Data, Contact Data, Technical Data, and Usage Data. We do not collect any Special Categories of Personal Data about you.</p>
            <h2>3. How We Use Your Data</h2>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul>
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party).</li>
                <li>Where we need to comply with a legal or regulatory obligation.</li>
            </ul>
            <h2>4. Data Security</h2>
            <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.</p>
            <h2>5. Contact Us</h2>
            <p>If you have any questions about this privacy policy, please contact us at privacy@starapp.ai.</p>
        `,
        terms: `
            <h1>Terms of Service</h1>
            <p>Last updated: December 21, 2024</p>
            <h2>1. Agreement to Terms</h2>
            <p>By accessing our website, you agree to be bound by these Terms of Service and to verify read.</p>
            <h2>2. Intellectual Property Rights</h2>
            <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us.</p>
            <h2>3. User Representations</h2>
            <p>By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary.</p>
            <h2>4. Prohibited Activities</h2>
            <p>You may not access or use the Site for any purpose other than that for which we make the Site available.</p>
            <h2>5. Contact Us</h2>
            <p>In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at legal@starapp.ai.</p>
        `,
        cookies: `
            <h1>Cookie Policy</h1>
            <p>Last updated: December 21, 2024</p>
            <h2>1. What Are Cookies</h2>
            <p>As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience.</p>
            <h2>2. How We Use Cookies</h2>
            <p>We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.</p>
            <h2>3. Disabling Cookies</h2>
            <p>You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this).</p>
            <h2>4. The Cookies We Set</h2>
            <ul>
                <li><strong>Account related cookies:</strong> If you create an account with us then we will use cookies for the management of the signup process and general administration.</li>
                <li><strong>Login related cookies:</strong> We use cookies when you are logged in so that we can remember this fact.</li>
            </ul>
            <h2>5. More Information</h2>
            <p>Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren&apos;t sure whether you need or not it&apos;s usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.</p>
        `
    };

    const content = doc?.content || defaults[slug] || `<h1>${slug.charAt(0).toUpperCase() + slug.slice(1)}</h1><p>Add your content here...</p>`;

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="icon">
                    <Link href="/admin/legal">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold text-white capitalize">
                    Edit {slug.replace('-', ' ')}
                </h1>
            </div>

            <LegalEditorForm initialContent={content} slug={slug} action={updateLegalDoc} />
        </div>
    );
}
