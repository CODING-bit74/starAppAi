import { getCaseStudies } from "@/app/actions/case-studies";
import { CaseStudiesClient } from "./CaseStudiesClient";

export async function CaseStudies() {
    const studies = await getCaseStudies();
    return <CaseStudiesClient studies={studies} />;
}
