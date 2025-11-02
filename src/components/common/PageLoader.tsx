import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

interface PageLoaderProps {
  variant?: 'dashboard' | 'list' | 'grid' | 'detail';
}

export const PageLoader = ({ variant = 'list' }: PageLoaderProps) => {
  if (variant === 'dashboard') {
    return (
      <div className="p-6 space-y-6 animate-fade-in">
        <Skeleton className="h-12 w-64" />
        <div className="grid gap-4">
          <Card className="p-6">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-32 w-full" />
          </Card>
          <Card className="p-6">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-48 w-full" />
          </Card>
        </div>
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className="p-6 space-y-6 animate-fade-in">
        <Skeleton className="h-12 w-64" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-6 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-4" />
              <Skeleton className="h-10 w-full" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'detail') {
    return (
      <div className="p-6 space-y-6 animate-fade-in">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <Card className="p-6 space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-12 w-full" />
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4 animate-fade-in">
      <Skeleton className="h-12 w-64" />
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
