import React from 'react';

import {
  Abbr,
  Address,
  Anchor,
  Article,
  Aside,
  Button,
  Code,
  Div,
  Em,
  Footer,
  Form,
  Heading,
  Hgroup,
  Image,
  InputSubmit,
  InputText,
  Label,
  Link,
  Nav,
  OrderedList,
  Paragraph,
  Section,
  Small,
  Span,
  Strong,
  UnorderedList
 } from 'dropship-components';

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
<Div>
  <Article>
    <Heading level="1">Dropship</Heading>
    <Section>
      <Heading level="2">Getting Started</Heading>
    </Section>
    <Section>
      <Heading level="2">Components</Heading>
    </Section>
    <Section>
      <Heading level="2">Typography</Heading>
      This is body text. The base font-size is determined by the users pre-defined preferences within the browser, usually 16px.
      <Section>
        <Heading level="3">Paragraph</Heading>
        <Paragraph>This is a paragraph.</Paragraph>
        <Code>&lt;Paragraph&gt;This is a paragraph.&lt;/Paragraph&gt;</Code>
      </Section>
      <Section>
        <Heading level="3">Headings</Heading>
        <Heading level="1">Heading 1</Heading>
        <Heading level="2">Heading 2</Heading>
        <Heading level="3">Heading 3</Heading>
        <Heading level="4">Heading 4</Heading>
        <Heading level="5">Heading 5</Heading>
        <Heading level="6">Heading 6</Heading>
        <Code>
          &lt;Heading level="1"&gt;Heading 1&lt;/Heading&gt;<br />
          &lt;Heading level="1"&gt;Heading 2&lt;/Heading&gt;<br />
          &lt;Heading level="1"&gt;Heading 3&lt;/Heading&gt;<br />
          &lt;Heading level="1"&gt;Heading 4&lt;/Heading&gt;<br />
          &lt;Heading level="1"&gt;Heading 5&lt;/Heading&gt;<br />
          &lt;Heading level="1"&gt;Heading 6&lt;/Heading&gt;
        </Code>
      </Section>
    </Section>
    <Section>
      <Heading level="3">Unordered List</Heading>
      <UnorderedList items={['One','Two','Three']} />
      <Code>
        &#x3C;UnorderedList items=&#x7B;&#x5B;&#x27;One&#x27;,&#x27;Two&#x27;,&#x27;Three&#x27;&#x5D;&#x7D; /&#x3E;
      </Code>
    </Section>
    <Section>
      <Heading level="3">Ordered List</Heading>
      <OrderedList items={['One','Two','Three']} />
      <Code>
        &#x3C;OrderedList items=&#x7B;&#x5B;&#x27;One&#x27;,&#x27;Two&#x27;,&#x27;Three&#x27;&#x5D;&#x7D; /&#x3E;
      </Code>
    </Section>
    <Section>
      <Heading level="3">Anchor</Heading>
      <Anchor href={dropshipGithubLink} onClick={goToDropshipGithub}>{dropshipGithubLink}</Anchor>
      <Code>&lt;Anchor href={dropshipGithubLink} onClick={goToDropshipGithub}&gt;{dropshipGithubLink}&lt;/Anchor&gt;</Code>
    </Section>
    <Section>
      <Heading level="3">Button</Heading>
      <Button>Button</Button>
      <br />
      <Code>&lt;Button&gt;Button&lt;/Button&gt;</Code>
    </Section>
    <Section>
      <Heading level="3">Image</Heading>
      <Image src="https://placeimg.com/200/150/arch" alt="Placeholder image" />
      <br />
      <Code>
        &lt;Image src="https://placeimg.com/200/150/arch" alt="Placeholder image" /&gt;
      </Code>
    </Section>
    <Section>
      <Heading level="3">Div</Heading>
      <Div>
        <Paragraph>Paragraph within Div</Paragraph>
      </Div>
      <Code>
        &lt;Div&gt;<br />
        &nbsp;&nbsp;&lt;Paragraph&gt;Paragraph within Div&lt;/Paragraph&gt;<br />
        &lt;/Div&gt;
      </Code>
    </Section>
    <Section>
      <Heading level="3">Small</Heading>
      <Small>Small</Small>
      <br />
      <Code>
        &lt;Small&gt;Small&lt;/Small&gt;
      </Code>
    </Section>
    <Section>
      <Heading level="3">Strong</Heading>
      <Strong>Strong</Strong>
      <br />
      <Code>
        &lt;Strong&gt;Strong&lt;/Strong&gt;
      </Code>
    </Section>
    <Section>
      <Heading level="3">Span</Heading>
      <Span>Span</Span>
      <br />
      <Code>
        &lt;Span&gt;Span&lt;/Span&gt;
      </Code>
    </Section>
    <Section>
      <Heading level="3">Em</Heading>
      <Em>Em</Em>
      <br />
      <Code>
        &lt;Em&gt;Em&lt;/Em&gt;
      </Code>
    </Section>
    <Section>
      <Heading level="3">Aside</Heading>
      <Aside>Aside</Aside>
      <br />
      <Code>
        &lt;Aside&gt;Aside&lt;/Aside&gt;
      </Code>
    </Section>
  </Article>
</Div>;

export default Home;
