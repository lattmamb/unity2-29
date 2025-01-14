import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AuthForm } from "@/components/auth/AuthForm";
import { useAuthError } from "@/hooks/useAuthError";

const Auth = () => {
  const navigate = useNavigate();
  const { errorMessage } = useAuthError();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-accent flex items-center justify-center p-4">
      <AuthForm errorMessage={errorMessage} />
    </div>
  );
};

export default Auth;