import * as React from "react";
import './App.scss';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { Message } from './Message/Message';

export const App = () => (
  <div className="app">        
    <Header />        
    <Message />
    <Footer />
</div>
);
