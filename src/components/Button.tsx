import { MouseEventHandler, ReactNode } from 'react';
import './styles/button.scss';

type TButtonProps = {
  children: ReactNode;
  type?: 'button' | 'submit';
  clickEvent?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  selected?: boolean;
};

export default function Button({ children, type = 'button', clickEvent = () => {}, disabled = false, selected = false }: TButtonProps) {
  return (
    <button className={selected ? 'button-selected' : 'button'} type={type} onClick={clickEvent} disabled={disabled}>
      {children}
    </button>
  );
}
