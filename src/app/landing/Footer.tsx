import ResumeCraftBrand from '@/shared/components/common/ResumeCraftBrand';

const REPO_URL = 'https://github.com/Varadarajan-M/resume-craft';
const AUTHOR1_URL = 'https://github.com/Varadarajan-M';
const AUTHOR2_URL = 'https://github.com/AjaySrinivas333';

const ExternalLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="underline hover:text-foreground transition-colors"
  >
    {children}
  </a>
);

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-2 items-center sm:items-start">
            <ResumeCraftBrand className="text-lg" />
            <p className="text-sm text-muted-foreground text-center max-w-md sm:max-w-lvh sm:text-left">
              Crafted with ❤️ by{' '}
              <ExternalLink href={AUTHOR1_URL}>Varadarajan</ExternalLink> and{' '}
              <ExternalLink href={AUTHOR2_URL}>Ajay</ExternalLink>.
              <span>
                {' '}
                The source code is available on{' '}
                <ExternalLink href={REPO_URL}>GitHub</ExternalLink>.
              </span>
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ResumeCraft. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
