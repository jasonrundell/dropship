import React from 'react';

import { Heading, Link, Nav, UnorderedList } from 'dropship-components';

import Home from "./Home";

import './App.scss';

const App = () => 
<div className="App">
  <div className="row">
    <Nav cssClass="App__nav--container">
    <Heading priority="1" cssClass="color__prime">Dropship</Heading>
    <UnorderedList cssClass="Nav__list--primary" items={[
      <Link href="#getting-started">Getting Started</Link>,
      <Link href="#components">Components</Link>,
      <Link href="#utilities">Utilities</Link>,
      ]} />
    </Nav>
    <div className="App__main--container">
      <Home /> 
    </div>
  </div>
</div>;

export default App;
