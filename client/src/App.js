import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const RedirectRoute = lazy(() => import("components/utils/RedirectRoute"));
const ProtectedRoute = lazy(() => import("components/utils/ProtectedRoute"));

const HomePage = lazy(() => import("components/pages/HomePage"));
const SigninPage = lazy(() => import("components/pages/SigninPage"));
const SignupPage = lazy(() => import("components/pages/SignupPage"));
const VerifyPage = lazy(() => import("components/pages/VerifyPage"));

const ProtectedTest = lazy(() => import("components/pages/ProtectedTest"));
const NotFound = lazy(() => import("components/utils/NotFound"));

const Layout = lazy(() => import("components/Layout"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>loading</div>}>
        <Layout>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/signup" exact component={SignupPage} />
            <Route path="/signin" exact component={SigninPage} />
            <Route path="/verify/:hash" exact component={VerifyPage} />
            <ProtectedRoute path="/protected" component={ProtectedTest} />
            <RedirectRoute path="/signin" component={SigninPage} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
}
