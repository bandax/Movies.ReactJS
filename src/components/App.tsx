import * as React from "react";
import './App.scss';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { ErrorBoundary } from './Error/ErrorBoundary';

export const App = () => (
  <div className="app">  
    <ErrorBoundary>
      <Header />           
      <Footer />
    </ErrorBoundary>      
</div>
);
