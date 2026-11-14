import { AboutCard } from "@/components/cards/about-card";
import { EducationCard } from "@/components/cards/education-card";
import { ExperienceCard } from "@/components/cards/experience-card";
import { IdentityCard } from "@/components/cards/identity-card";
import { ProjectsCard } from "@/components/cards/projects-card";
import { TechCard } from "@/components/cards/tech-card";
import { Contact } from "@/components/sections/contact";
import { Projects } from "@/components/sections/projects";

export default function Home() {
  return (
    <>
      <div id="top" className="bento-wrap">
        <div className="bento container-page">
          <IdentityCard />
          <AboutCard />
          <ExperienceCard />
          <TechCard />
          <ProjectsCard />
          <EducationCard />
        </div>
      </div>

      <div className="container-page">
        <Projects />
      </div>

      <Contact />
    </>
  );
}
