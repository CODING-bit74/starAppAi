import { getHeroCards } from "@/app/actions/hero";
import { HeroClient } from "@/components/HeroClient";

export async function Hero() {
    const cards = await getHeroCards();

    return <HeroClient cards={cards} />;
}
