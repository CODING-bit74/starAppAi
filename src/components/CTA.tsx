import { getCTA } from "@/app/actions/cta";
import { CTAClient } from "@/components/CTAClient";

export async function CTA() {
    const cta = await getCTA();

    return (
        <CTAClient
            title={cta.title}
            description={cta.description}
            buttonText={cta.buttonText}
            buttonLink={cta.buttonLink}
            secondaryButtonText={cta.secondaryButtonText}
            secondaryButtonLink={cta.secondaryButtonLink}
        />
    );
}
