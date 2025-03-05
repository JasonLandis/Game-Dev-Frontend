import { MouseEventHandler, ReactNode } from 'react';
import './styles/Button.scss';

type TButtonProps = {
  children: ReactNode,
  clickEvent?: MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit',
  disabled: boolean
}

export default function Button({ children, clickEvent, type, disabled }: TButtonProps) {
  return <button type={type} onClick={clickEvent} disabled={disabled}>{children}</button>;
}
