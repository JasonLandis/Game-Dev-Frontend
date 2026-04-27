import { MouseEventHandler, ReactNode } from 'react';
import './styles/button.scss';

type TButtonProps = {
  children: ReactNode;
  type?: 'button' | 'submit';
  clickEvent?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  active?: boolean;
};

export default function Button({ children, type = 'button', clickEvent = () => {}, disabled = false, active = false }: TButtonProps) {
  return (
    <button className={`button ${active ? 'active' : ''}`} type={type} onClick={clickEvent} disabled={disabled}>
      {children}
    </button>
  );
}
