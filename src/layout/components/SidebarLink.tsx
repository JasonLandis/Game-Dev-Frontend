import { ReactNode } from 'react';
import '../styles/sidebarlink.scss';

type TSidebarLinkProps = {
    children: ReactNode
}

export default function SidebarLink({ children }: TSidebarLinkProps) {
  return (
    <div className="sidebarlink">
        {children}
    </div>
  );
}
