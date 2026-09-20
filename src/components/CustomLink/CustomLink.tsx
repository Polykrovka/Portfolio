import { Anchor } from '@mantine/core';
import type { ReactNode } from 'react';

type CustomLinkProps = {
  href: string;
  className: string;
  children?: ReactNode;
};

export function CustomLink({ href, className, children }: CustomLinkProps) {
  return (
    <Anchor className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </Anchor>
  );
}
