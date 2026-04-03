import CardGrid from "@/components/ui/CardGrid";
import HubCard from "@/components/ui/HubCard";

export default function TravelPage() {
  return (
    <main className="hub-page">
      <div className="hub-header">
        <h1>Travel</h1>
        <p className="hub-subtitle">Countries and places I&apos;ve explored</p>
      </div>

      <CardGrid>
        <HubCard
          href="/travel/travel-tips"
          title="Travel Tips"
          thumbnail="/assets/travel/travel%20tips.png"
        />
        <HubCard
          href="/travel/uzbekistan"
          title="Uzbekistan 🇺🇿"
          thumbnail="/assets/travel/uzbekistan.png"
        />
        <HubCard
          href="/travel/uk"
          title="United Kingdom 🇬🇧"
          thumbnail="/assets/travel/uk.png"
        />
        <HubCard
          href="/travel/turkey"
          title="Turkey 🇹🇷"
          thumbnail="/assets/travel/turkey.png"
        />
        <HubCard
          href="/travel/canada"
          title="Canada 🇨🇦"
          thumbnail="/assets/travel/canada.png"
        />
        <HubCard
          href="/travel/hungary"
          title="Hungary 🇭🇺"
          thumbnail="/assets/travel/hungary.png"
        />
        <HubCard
          href="/travel/france"
          title="France 🇫🇷"
          thumbnail="/assets/travel/france.png"
        />
        <HubCard
          href="/travel/belgium"
          title="Belgium 🇧🇪"
          thumbnail="/assets/travel/belgium.png"
        />
        <HubCard
          href="/travel/netherlands"
          title="Netherlands 🇳🇱"
          thumbnail="/assets/travel/netherlands.png"
        />
        <HubCard
          href="/travel/spain"
          title="Spain 🇪🇸"
          thumbnail="/assets/travel/spain.png"
        />
        <HubCard
          href="/travel/switzerland"
          title="Switzerland 🇨🇭"
          thumbnail="/assets/travel/switzerland.png"
        />
      </CardGrid>
    </main>
  );
}
