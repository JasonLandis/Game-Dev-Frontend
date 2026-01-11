import { ReactNode } from 'react';
import '../styles/navbarlink.scss';

type TNavbarLinkProps = {
  children: ReactNode;
};

export default function NavbarLink({ children }: TNavbarLinkProps) {
  return <div className="navbarlink">{children}</div>;
}
