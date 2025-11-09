import FadeInChildren from '@/shared/components/animated/FadeIn';
import AuthGuard from '@/shared/components/common/AuthGuard';
import ResumeCraftBrand from '@/shared/components/common/ResumeCraftBrand';
import { ThemeSwitch } from '@/shared/components/common/ThemeSwitcher';
import { Button } from '@/shared/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import { MotionNav } from './MotionComponents';
import NavLinks from './NavLinks';

export function Navigation() {
  return (
    <MotionNav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <ResumeCraftBrand className="text-sm sm:text-xl" />
          </div>

          <FadeInChildren
            asProp="div"
            className="flex flex-row items-center gap-4"
          >
            <div className="flex gap-8 items-center">
              <ThemeSwitch />
              <NavLinks />
              <AuthGuard
                signedInContent={<UserButton />}
                signedOutContent={
                  <Button className="text-xs sm:text-sm">Get Started</Button>
                }
              />
            </div>
          </FadeInChildren>
        </div>
      </div>
    </MotionNav>
  );
}
