import { ClerkProvider } from '@clerk/clerk-react';
import { ReactNode, StrictMode } from 'react';

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Auth Publishable Key');
}

export default function RootApp({ children }: { children: ReactNode }) {
  return (
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>{children}</ClerkProvider>
    </StrictMode>
  );
}
