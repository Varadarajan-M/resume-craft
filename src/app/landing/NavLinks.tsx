'use client';

import { cn } from '@/shared/lib/utils';
import Link from 'next/link';

const links = [
  {
    href: '#templates',
    label: 'Templates',
  },
  {
    href: '#pricing',
    label: 'Pricing',
  },

  {
    href: 'https://github.com/Varadarajan-M/resume-craft',
    label: 'GitHub',
  },
];

const NavLinks = () => {
  return (
    <>
      {links.map((link) => (
        <Link
          target={link.href.startsWith('http') ? '_blank' : '_self'}
          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          key={link.href}
          href={link.href}
          className={cn(
            `hidden sm:inline-flex text-sm hover:text-foreground/70 transition-colors`
          )}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
};

export default NavLinks;
