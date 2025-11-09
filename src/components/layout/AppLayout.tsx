import { ReactNode } from 'react';
import { BottomNav } from './BottomNav';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-6">
      <main className="max-w-md md:max-w-4xl lg:max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};
