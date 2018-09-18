import React from 'react';

import { Div, Heading, Link, Nav, UnorderedList } from 'dropship-components';

import Home from "./Home";

const App = () =>
<Div>
  <Div>
    <Nav>
    <Heading level="1">Dropship</Heading>
    <UnorderedList items={[
      <Link href="#getting-started">Getting Started</Link>,
      <Link href="#components">Components</Link>,
      <Link href="#utilities">Utilities</Link>,
      ]} />
    </Nav>
    <Div>
      <Home />
    </Div>
  </Div>
</Div>;

export default App;
