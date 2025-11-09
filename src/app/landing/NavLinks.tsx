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
];

const NavLinks = () => {
  return (
    <>
      {links.map((link) => (
        <Link
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
