import * as React from "react";
import "./App.scss";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { ErrorBoundary } from "./Error/ErrorBoundary";
import { SubHeader } from "./SubHeader/SubHeader";

import ResultsMovie from "./ResultsMovie/ResultsMovie";
import movies from "../data/movies.json";

const App: React.FunctionComponent = () => (
  <div className="app">
    <ErrorBoundary>
      <Header />
      <SubHeader />
      <ResultsMovie counter={1} />
      <Footer />
    </ErrorBoundary>
  </div>
);

export { App };
