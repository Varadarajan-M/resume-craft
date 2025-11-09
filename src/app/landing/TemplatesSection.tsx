import AuthGuard from "@/shared/components/common/AuthGuard";
import { Button } from "@/shared/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { AnimatedSection, AnimatedTemplateCard } from "./MotionComponents";

const templates = ["Clean Minimal", "Standard"];

export const UseTemplateButton = () => {
  return (
    <Button
      variant="outline"
      className="
                bg-transparent 
                text-white 
                border-white 
                font-semibold 
                px-4 py-2 rounded-lg border-2
                transition-all duration-300
                hover:bg-white 
                hover:text-gray-900
                dark:hover:bg-gray-900
                dark:hover:text-white 
            "
    >
      Use Template
    </Button>
  );
};

export default function TemplatesSection() {
  return (
    <section
      id="templates"
      className="py-20 sm:py-32 bg-muted/30 relative dot-pattern"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_50%,rgba(120,119,198,0.03),rgba(255,255,255,0))]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
            Professional Templates
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            Choose from our collection of ATS-friendly, professionally designed
            templates
          </p>
        </AnimatedSection>

        <div className="flex flex-row flex-wrap justify-center gap-8">
          {templates.map((template, index) => {
            const templateRedirectUrl =
              "/builder?new=true&templateId=" +
              template.replace(" ", "-").toLowerCase();

            return (
              <AnimatedTemplateCard
                key={index}
                index={index}
                className="group relative overflow-hidden border-border/50 hover:border-foreground/20 transition-all duration-300 bg-card/50 backdrop-blur-sm"
              >
                <div
                  className="
                                        absolute inset-0 top-0 bottom-[92px] lg:bottom-[88px] 
                                        flex items-center justify-center 
                                        opacity-0 group-hover:opacity-100 
                                        transition-opacity duration-300 z-20 
                                        bg-black/0 group-hover:bg-black/40
                                    "
                >
                  <AuthGuard
                    redirectUrl={templateRedirectUrl}
                    signedOutContent={<UseTemplateButton />}
                    signedInContent={
                      <Link href={templateRedirectUrl}>
                        <UseTemplateButton />
                      </Link>
                    }
                  />
                </div>

                <Image
                  src={`/templates/${template
                    .replace(" ", "-")
                    .toLowerCase()}.webp`}
                  alt={`${template} Template`}
                  width={400}
                  height={533}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02] relative z-10"
                  loading="lazy"
                />
                <div className="p-4 relative z-10">
                  <h3 className="font-semibold mb-1">{template}</h3>
                  <p className="text-sm text-muted-foreground">
                    Professional and clean design
                  </p>
                </div>
              </AnimatedTemplateCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
