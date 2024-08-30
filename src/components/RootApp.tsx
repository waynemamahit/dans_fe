import { ReactNode, StrictMode } from 'react';

export default function RootApp({ children }: { children: ReactNode }) {
  return <StrictMode>{children}</StrictMode>;
}
