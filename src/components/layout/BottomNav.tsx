import { Home, Calendar, BookOpen, BarChart3, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export const BottomNav = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { icon: Home, label: t('nav.dashboard'), path: '/dashboard', ariaLabel: 'Navigate to Dashboard' },
    { icon: Calendar, label: t('nav.calendar'), path: '/calendar', ariaLabel: 'Navigate to Calendar' },
    { icon: BookOpen, label: t('nav.journal'), path: '/journal', ariaLabel: 'Navigate to Journal' },
    { icon: BarChart3, label: t('nav.insights'), path: '/insights', ariaLabel: 'Navigate to Insights' },
    { icon: User, label: t('nav.profile'), path: '/profile', ariaLabel: 'Navigate to Profile' },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-area-bottom md:hidden"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-md mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {navItems.map(({ icon: Icon, label, path, ariaLabel }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                aria-label={ariaLabel}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex flex-col items-center justify-center flex-1 h-full smooth-transition',
                  'hover:bg-muted/50 rounded-lg min-w-[44px] min-h-[44px]',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <Icon 
                  className={cn(
                    'h-6 w-6 mb-1 smooth-transition',
                    isActive && 'scale-110'
                  )} 
                  aria-hidden="true"
                />
                <span className="text-xs font-medium">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
