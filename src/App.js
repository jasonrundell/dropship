import React from 'react';

import { Layout, Card, Heading, Image, Paragraph } from 'dropship';

//import imageURL from './dropship.png'; // http://avatars.adorable.io
const dropshipLogo = 'https://api.adorable.io/avatars/285/dropship.png';

import './App.scss';

const App = () =>
  <Layout cssClass="Layout">
    <Image src={dropshipLogo} alt="Dropship's logo" />
    <Heading priority="1" cssClass="color__prime">Dropship</Heading>
    <Card cssClass="Layout">
      <Heading priority="2" cssClass="color__alt">A boilerplate dropshop project!</Heading>
      <Paragraph>GitHub: <a href="https://github.com/jasonrundell/dropship-demo">https://github.com/jasonrundell/dropship-demo</a></Paragraph>
    </Card>
  </Layout>;

export default App;
