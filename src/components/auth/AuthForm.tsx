import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AuthFormProps {
  errorMessage?: string;
}

export const AuthForm = ({ errorMessage }: AuthFormProps) => {
  return (
    <div className="w-full max-w-md space-y-4 bg-background rounded-lg shadow-lg p-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Welcome to Unity Fleet</h1>
        <p className="text-muted-foreground">Sign in to your account or create a new one</p>
      </div>
      
      {errorMessage && (
        <Alert variant="destructive">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <SupabaseAuth 
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#1a365d',
                brandAccent: '#00f0ff',
              }
            }
          }
        }}
        providers={[]}
      />
    </div>
  );
};