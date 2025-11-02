import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4" role="main">
      <div className="text-center space-y-6 animate-fade-in max-w-md">
        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <Search className="h-10 w-10 text-primary" aria-hidden="true" />
          </div>
          <h1 className="text-6xl font-bold text-primary" aria-label="Error 404">404</h1>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-foreground">
            {t('common.pageNotFound') || 'Page not found'}
          </h2>
          <p className="text-muted-foreground">
            {t('common.pageNotFoundDescription') || "The page you're looking for doesn't exist or has been moved."}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link to="/dashboard">
            <Button className="w-full sm:w-auto">
              <Home className="mr-2 h-4 w-4" aria-hidden="true" />
              {t('common.backToDashboard') || 'Back to Dashboard'}
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" className="w-full sm:w-auto">
              {t('auth.login') || 'Login'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
