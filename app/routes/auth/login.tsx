import { redirect, useLoaderData } from "react-router";

import Button from "~/components/button";
import { authApi } from "~/api/endpoints";
import { isTokenSet, setAccessToken } from "~/lib/auth";
import { describeOAuthError } from "~/lib/errorHandler";
import "~/styles/login.scss";

import type { Route } from "./+types/login";

const logo = "/vox.png";

export async function clientLoader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const accessToken = url.searchParams.get("accessToken");
  const error = url.searchParams.get("error");
  const errorDescription = url.searchParams.get("error_description");

  if (accessToken) {
    setAccessToken(accessToken);
    return redirect("/");
  }

  if (isTokenSet()) {
    return redirect("/");
  }

  if (error) {
    return { error: describeOAuthError(error, errorDescription ?? undefined) };
  }

  return { error: null };
}

const Login = () => {
  const loaderData = useLoaderData<typeof clientLoader>();
  const authError = loaderData?.error ?? null;

  const handleLogin = () => {
    window.location.href = authApi.authorize();
  };

  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="logo" />
        <h1 className="header">Vox</h1>
      </div>

      <div className="login-card">
        <h2 className="login-card-title">Sign in to continue</h2>

        {authError && (
          <div className="login-error-banner">
            <p className="login-error-text">{authError}</p>
          </div>
        )}

        <div className="btn-wrapper">
          <Button onClick={handleLogin} withIcon>
            Continue with X
          </Button>
        </div>

        <div className="login-divider">
          <div className="login-divider-line"></div>
          <div className="login-divider-line"></div>
        </div>

        <div className="login-info">
          <p className="login-info-text">
            By signing in, you authorize this app to access your X account and
            generate tweets based on your preferences.
          </p>
        </div>
      </div>

      <div className="login-footer">
        <p className="login-footer-text">
          New to Vox? Your account will be created automatically.
        </p>
      </div>
    </div>
  );
};

export default Login;
