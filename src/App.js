import React from 'react';

import { Anchor, Div, Heading, Nav, UnorderedList } from 'dropship-components';

import Home from "./Home";

const App = () =>
<Div>
  <Nav>
    <Heading level="1">Dropship</Heading>
    <UnorderedList items={[
      <Anchor href="#getting-started">Getting Started</Anchor>,
      <Anchor href="#components">Components</Anchor>,
      <Anchor href="#utilities">Utilities</Anchor>,
    ]} />
  </Nav>
  <Home />
</Div>;

export default App;
