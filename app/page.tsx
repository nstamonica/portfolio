import { Deck } from "@/components/deck";
import { AboutPanel } from "@/components/panels/about";
import { ContactPanel } from "@/components/panels/contact";
import { ExperiencePanel } from "@/components/panels/experience";
import { IntroPanel } from "@/components/panels/intro";
import { ProjectsPanel } from "@/components/panels/projects";
import { TechPanel } from "@/components/panels/tech";

export default function Home() {
  return (
    <Deck>
      <IntroPanel />
      <ExperiencePanel />
      <ProjectsPanel />
      <TechPanel />
      <AboutPanel />
      <ContactPanel />
    </Deck>
  );
}
