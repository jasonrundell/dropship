import React from 'react';

import { Card, Heading, Image, Layout, Link, Paragraph, UnorderedList, OrderedList } from 'dropship-components';

//import imageURL from './dropship.png'; // http://avatars.adorable.io
const dropshipLogo = 'https://api.adorable.io/avatars/285/dropship.png';

import './App.scss';

const dropshipGithubLink = 'https://github.com/jasonrundell/dropship';
const dropshipDemoGithubLink = 'https://github.com/jasonrundell/dropship-demo';

const goToDropshipDemoGithub = (event) => {
  event.preventDefault();
  location.href = dropshipDemoGithubLink;
}

const goToDropshipGithub = (event) => {
  event.preventDefault();
  location.href = dropshipGithubLink;
}

const App = () => 
<Layout cssClass="Layout">
  <Image src={dropshipLogo} alt="Dropship's logo" />
  <Heading priority="1" cssClass="color__prime">Dropship</Heading>
  <Card cssClass="Card">
    <Heading priority="2" cssClass="color__alt">A boilerplate dropshop project!</Heading>
    <Paragraph>Links:</Paragraph>
    <Paragraph>Dropship GitHub: <Link cssClass="color__alt" href={dropshipGithubLink} onClick={goToDropshipGithub}>{dropshipGithubLink}</Link></Paragraph>
    <Paragraph>Dropship Demo GitHub: <Link cssClass="color__alt" href={dropshipDemoGithubLink} onClick={goToDropshipDemoGithub}>{dropshipDemoGithubLink}</Link></Paragraph>
    <UnorderedList items={['One','Two','Three']} />
    <OrderedList items={['One','Two','Three']} />
  </Card>
</Layout>;

export default App;
