import { MouseEventHandler, ReactNode } from 'react';
import './styles/button.scss';

type TButtonProps = {
  children: ReactNode;
  type?: 'button' | 'submit';
  clickEvent?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export default function Button({ children, type = 'button', clickEvent = () => {}, disabled = false }: TButtonProps) {
  return (
    <button className="button" type={type} onClick={clickEvent} disabled={disabled}>
      {children}
    </button>
  );
}
