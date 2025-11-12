import { Card } from '@/shared/components/ui/card';

import { CheckCircle2, Download, Palette, Play, Zap } from 'lucide-react';

import {
  AnimatedCard,
  AnimatedFeatureCard,
  AnimatedSection,
} from './MotionComponents';

import FadeInChildren from '@/shared/components/animated/FadeIn';
import AuthGuard from '@/shared/components/common/AuthGuard';
import { Button } from '@/shared/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section
      id="#"
      className="relative overflow-hidden pt-32 pb-10 sm:pt-40 sm:pb-20"
    >
      <div className="absolute inset-0 -z-10 mesh-background">
        <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-muted/40 blur-[120px]" />
        <div className="absolute top-20 right-1/4 h-[500px] w-[500px] rounded-full bg-muted/20 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.05),rgba(255,255,255,0))]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInChildren
          duration={0.2}
          childrenDelay={0.05}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm font-medium text-foreground border border-border">
              <Sparkles className="h-4 w-4" />
              AI-Powered Resume Builder
            </span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Craft Your Perfect Resume in{' '}
            <span className="bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to bg-clip-text text-transparent">
              Minutes
            </span>
          </h1>

          <p className="mb-10 text-lg text-muted-foreground text-balance sm:text-xl leading-relaxed">
            Create professional, ATS-friendly resumes with our intuitive
            builder. Choose from beautiful templates, get AI-powered
            suggestions, and land your dream job.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <AuthGuard
              signedOutContent={<CreateYourResumeButton />}
              signedInContent={
                <Link href="/">
                  <CreateYourResumeButton />
                </Link>
              }
            />

            <Link href="#templates">
              <ViewTemplatesButton />
            </Link>
          </div>
        </FadeInChildren>
      </div>
    </section>
  );
}

export const CreateYourResumeButton = () => (
  <Button
    size="lg"
    className="w-fit sm:w-auto bg-foreground text-background hover:bg-foreground/90 text-sm tracking-tight px-8"
  >
    Create Your Resume
    <ArrowRight className="ml-2 h-5 w-5" />
  </Button>
);

export const ViewTemplatesButton = () => (
  <Button
    size="lg"
    variant="outline"
    className="w-fit sm:w-auto text-sm tracking-tight px-8 bg-transparent"
  >
    View Templates
  </Button>
);

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Content',
    description:
      'Generate professional resume content with intelligent suggestions tailored to your experience.',
  },
  {
    icon: Palette,
    title: 'Beautiful Templates',
    description:
      'Choose from professionally designed templates that make your resume stand out.',
  },
  {
    icon: Zap,
    title: 'Real-Time Preview',
    description:
      'See your changes instantly with our live preview editor as you build your resume.',
  },
  {
    icon: Download,
    title: 'Instant Download',
    description:
      'Download your resume as PDF or share to other platforms with just a click.',
  },
];

export function VideoSection() {
  return (
    <section className="py-10 relative dot-pattern">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto max-w-5xl">
          <AnimatedCard
            className="relative overflow-hidden border-2 border-border/50 bg-card/50 backdrop-blur-sm p-2 sm:py-3 sm:p-6"
            delay={0.2}
          >
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted/30">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted/80 to-muted/40">
                <div className="text-center">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-foreground/10 backdrop-blur-sm border border-foreground/20 mb-4 hover:bg-foreground/20 transition-colors cursor-pointer group">
                    <Play
                      className="h-10 w-10 text-foreground group-hover:scale-110 transition-transform"
                      fill="currentColor"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Click to watch demo
                  </p>
                </div>
              </div>

              <div className="relative pb-[64.86486486486486%] h-24">
                <iframe
                  src="https://www.loom.com/embed/0f9dc5af6fbc48a8852c406e5f133047"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
            </div>

            <div className="text-center my-7">
              <h2 className="text-lg font-bold tracking-tight sm:text-2xl mb-4 text-balance">
                See ResumeCraft in Action
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground text-balance max-w-2xl mx-auto">
                Watch our quick demo to see how easy it is to create beautiful,
                professional resumes with our intuitive builder and powerful
                features.
              </p>
            </div>
          </AnimatedCard>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-muted/20 via-muted/40 to-muted/20 blur-3xl" />
        </AnimatedSection>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-32 relative mesh-background">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.03),rgba(255,255,255,0))]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
            Everything You Need to Stand Out
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            Powerful features designed to help you create the perfect resume
          </p>
        </AnimatedSection>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <AnimatedFeatureCard
              key={index}
              index={index}
              className="group relative overflow-hidden p-6 hover:shadow-lg transition-all duration-300 border-border/50 hover:border-foreground/20 bg-card/50 backdrop-blur-sm md:h-[250px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                  <feature.icon className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </AnimatedFeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export const StartBuildingButton = () => (
  <Button
    size="lg"
    className="w-full sm:w-auto bg-foreground text-background hover:bg-foreground/90 text-base px-8"
  >
    Start Building Now
    <ArrowRight className="ml-2 h-5 w-5" />
  </Button>
);

export function CTASection() {
  return (
    <section
      id="pricing"
      className="relative py-20 sm:py-32 overflow-hidden mesh-background"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-muted/40 blur-[100px]" />
        <div className="absolute bottom-20 right-1/3 h-[400px] w-[400px] rounded-full bg-muted/20 blur-[80px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),rgba(255,255,255,0))]" />
      </div>

      <AnimatedSection className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="relative overflow-hidden border-border bg-card/50 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-transparent" />
          <div className="relative p-8 sm:p-12 lg:p-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
              Ready to Build Your Perfect Resume?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
              Join thousands of professionals who have landed their dream jobs
              with ResumeCraft
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <AuthGuard
                signedOutContent={<StartBuildingButton />}
                signedInContent={
                  <Link href="/">
                    <StartBuildingButton />
                  </Link>
                }
              />
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-foreground" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-foreground" />
                Free templates
              </div>
            </div>
          </div>
        </Card>
      </AnimatedSection>
    </section>
  );
}
