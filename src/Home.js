import React from 'react';

import {
  Abbr,
  Address,
  Anchor,
  Article,
  Aside,
  Blockquote,
  Button,
  Caption,
  Code,
  Div,
  Em,
  Fieldset,
  Figure,
  Footer,
  Form,
  Header,
  Heading,
  Hgroup,
  Hr,
  Image,
  InputSubmit,
  InputText,
  Label,
  Legend,
  Link,
  Nav,
  OrderedList,
  Paragraph,
  Pre,
  Section,
  Small,
  Span,
  Strong,
  Sub,
  Summary,
  Sup,
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
      <Heading level="3">Abbr</Heading>
      <Abbr>Abbr</Abbr>
      <br />
      <Code>
        &lt;Abbr&gt;Abbr&lt;/Abbr&gt;
      </Code>
    </Section>
    <Section>
      <Heading level="3">Address</Heading>
      <Address>Address</Address>
      <br />
      <Code>
        &lt;Address&gt;Address&lt;/Address&gt;
      </Code>
    </Section>
    <Section>
      <Heading level="3">Sub</Heading>
      <Sub>Sub</Sub>
      <br />
      <Code>
        &lt;Sub&gt;Sub&lt;/Sub&gt;
      </Code>
    </Section>
    <Section>
      <Heading level="3">Sup</Heading>
      <Sup>Sup</Sup>
      <br />
      <Code>
        &lt;Sup&gt;Sup&lt;/Sup&gt;
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
      <Button disabled={true}>Button</Button>
      <br />
      <Code>
        &lt;Button&gt;Button&lt;/Button&gt;<br />
        &lt;Button disabled=&#x7B;true&#x7D;&gt;Button&lt;/Button&gt;
      </Code>
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
    <Section>
      <Heading level="3">Fieldset</Heading>
      <Fieldset>Fieldset</Fieldset>
      <Fieldset disabled={true}>Fieldset</Fieldset>
      <br />
      <Code>
        &lt;Fieldset&gt;Fieldset&lt;/Fieldset&gt;<br />
        &lt;Fieldset disabled=&#x7B;true&#x7D;&gt;Fieldset&lt;/Fieldset&gt;
      </Code>
    </Section>
    <Section>
      <Heading level="3">Blockquote</Heading>
      <Blockquote>Blockquote</Blockquote>
      <br />
      <Code>
        &lt;Blockquote&gt;Blockquote&lt;/Blockquote&gt;
      </Code>
    </Section>
    <Section>
      <Heading level="3">Caption</Heading>
      <Caption>Caption</Caption>
      <br />
      <Code>
        &lt;Caption&gt;Caption&lt;/Caption&gt;
      </Code>
    </Section>
    <Section>
      <Heading level="3">Figure</Heading>
      <Figure>Figure</Figure>
      <br />
      <Code>
        &lt;Figure&gt;Figure&lt;/Figure&gt;
      </Code>
    </Section>
    <Section>
      <Heading level="3">Header</Heading>
      <Header>Header</Header>
      <br />
      <Code>
        &lt;Header&gt;Header&lt;/Header&gt;
      </Code>
    </Section>
    <Section>
      <Heading level="3">Footer</Heading>
      <Footer>Footer</Footer>
      <br />
      <Code>
        &lt;Footer&gt;Footer&lt;/Footer&gt;
      </Code>
    </Section>
    <Section>
      <Heading level="3">Hgroup</Heading>
      <Hgroup>
        <Heading level="1">Heading 1</Heading>
        <Heading level="2">Heading 2</Heading>
        <Heading level="3">Heading 3</Heading>
      </Hgroup>
      <br />
      <Code>
        &#x3C;Hgroup&#x3E;<br />
        &nbsp;&nbsp;&#x3C;Heading level=&#x22;1&#x22;&#x3E;Heading 1&#x3C;/Heading&#x3E;<br />
        &nbsp;&nbsp;&#x3C;Heading level=&#x22;2&#x22;&#x3E;Heading 2&#x3C;/Heading&#x3E;<br />
        &nbsp;&nbsp;&#x3C;Heading level=&#x22;3&#x22;&#x3E;Heading 3&#x3C;/Heading&#x3E;<br />
        &#x3C;/Hgroup&#x3E;
      </Code>
    </Section>
    <Section>
      <Heading level="3">Hr</Heading>
      <Hr />
      <br />
      <Code>
        &lt;Hr /&gt;
      </Code>
    </Section>
    <Section>
      <Heading level="3">Form</Heading>
      <Form>Form</Form>
      <br />
      <Code>
        &lt;Form&gt;Form&lt;/Form&gt;
      </Code>
    </Section>
    <Section>
      <Heading level="3">Pre</Heading>
      <Pre>Pre</Pre>
      <br />
      <Code>
        &lt;Pre&gt;Pre&lt;/Pre&gt;
      </Code>
    </Section>
    <Section>
      <Heading level="3">Summary</Heading>
      <Summary>Summary</Summary>
      <br />
      <Code>
        &lt;Summary&gt;Summary&lt;/Summary&gt;
      </Code>
    </Section>
  </Article>
</Div>;

export default Home;
