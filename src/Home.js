import React from 'react';

import { Article, Card, Code, Button, Heading, Image, Link, Paragraph, Section, UnorderedList, OrderedList } from 'dropship-components';

import './Home.scss';

//import imageURL from './dropship.png'; // http://avatars.adorable.io
//const dropshipLogo = 'https://api.adorable.io/avatars/285/dropship.png';

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

const Home = () =>
<div className="Home__container">
  <Article>
    <Section>
      <Heading priority="2" cssClass="color__prime">Getting Started</Heading>
    </Section>
    <Section>
      <Heading priority="2" cssClass="color__prime">Components</Heading>
    </Section>
    <Section>
      <Heading priority="3" cssClass="color__prime">Paragraph</Heading>
      <Paragraph>Here is a paragraph</Paragraph>
      <Code>&lt;Paragraph&gt;Here is a paragraph&lt;/Paragraph&gt;</Code>
    </Section>
    <Section>
      <Heading priority="3" cssClass="color__prime">Unordered List</Heading>
      <UnorderedList items={['One','Two','Three']} />
      <Code>&lt;UnorderedList items={['One','Two','Three']} /&gt;</Code>
    </Section>
    <Section>
      <Heading priority="3" cssClass="color__prime">Ordered List</Heading>
      <OrderedList items={['One','Two','Three']} />
      <Code>&lt;OrderedList items={['One','Two','Three']} /&gt;</Code>
    </Section>
    <Section>
      <Heading priority="3" cssClass="color__prime">Button</Heading>
      <Button cssClass="button">Button</Button>
      <Code>&lt;Button cssClass="button"&gt;Button&lt;/Button&gt;</Code>
    </Section>
    <Section>
      <Heading priority="3" cssClass="color__prime">Link</Heading>
      <Link cssClass="color__alt" href={dropshipGithubLink} onClick={goToDropshipGithub}>{dropshipGithubLink}</Link>
      <Code>&lt;Link cssClass="color__alt" href={dropshipGithubLink} onClick={goToDropshipGithub}&gt;{dropshipGithubLink}&lt;/Link&gt;</Code>
    </Section>
    <Section>
      <Heading priority="3" cssClass="color__prime">Headings</Heading>
      <Heading priority="1">Heading 1</Heading>
      <Heading priority="2">Heading 2</Heading>
      <Heading priority="3">Heading 3</Heading>
      <Heading priority="4">Heading 4</Heading>
      <Heading priority="5">Heading 5</Heading>
      <Heading priority="6">Heading 6</Heading>
      <Code>
        &lt;Heading priority="1"&gt;Heading 1&lt;/Heading&gt;<br />
        &lt;Heading priority="1"&gt;Heading 2&lt;/Heading&gt;<br />
        &lt;Heading priority="1"&gt;Heading 3&lt;/Heading&gt;<br />
        &lt;Heading priority="1"&gt;Heading 4&lt;/Heading&gt;<br />
        &lt;Heading priority="1"&gt;Heading 5&lt;/Heading&gt;<br />
        &lt;Heading priority="1"&gt;Heading 6&lt;/Heading&gt;
      </Code>
    </Section>
    <Section>
      <Heading priority="3" cssClass="color__prime">Image</Heading>
      <Image src="https://placeimg.com/200/150/arch" alt="Placeholder image" />
      <Code>
        &lt;Image src="https://placeimg.com/200/150/arch" alt="Placeholder image" /&gt;
      </Code>
    </Section>
    <Section>
      <Heading priority="3" cssClass="color__prime">Card</Heading>
      <Card cssClass="Card">
        <Paragraph>Paragraph within Card</Paragraph>
      </Card>
      <Code>
        &lt;Card cssClass="Card"&gt;<br />
        &nbsp;&nbsp;&lt;Paragraph&gt;Paragraph within Card&lt;/Paragraph&gt;<br />
        &lt;/Card&gt;
      </Code>
    </Section>
  </Article>
</div>;

export default Home;
