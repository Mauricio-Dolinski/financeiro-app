import { Suspense } from "react";
import { useLoaderData, useOutlet, Await } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import { AuthProvider } from "../hooks/useAuth";

const AuthLayout = () => {
  const outlet = useOutlet();

  const { userPromise } = useLoaderData();

  return (
    <Suspense fallback={<LinearProgress />}>
      <Await
        resolve={userPromise}
        errorElement={<Alert severity="error">Erro: Acesso Negado!</Alert>}
        children={(user) => (
          <AuthProvider userData={user}>{outlet}</AuthProvider>
        )}
      />
    </Suspense>
  );
};

export default AuthLayout