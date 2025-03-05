import { MouseEventHandler, ReactNode } from 'react';
import './styles/Button.scss';

export default function Button({ children, eventHandler }: { children: ReactNode; eventHandler: MouseEventHandler<HTMLButtonElement> }) {
  return <button onClick={eventHandler}>{children}</button>;
}
