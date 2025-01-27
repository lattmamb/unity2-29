import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-accent flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4 bg-background rounded-lg shadow-lg p-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Welcome to Unity Fleet</h1>
          <p className="text-muted-foreground">Experience the future of mobility</p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
        >
          Continue to Homepage
        </button>
      </div>
    </div>
  );
};

export default Auth;