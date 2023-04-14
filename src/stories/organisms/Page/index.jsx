import { Header } from '../Header'
import {
  Article,
  Container,
  Box,
  Section,
  Heading,
  Paragraph,
  Link
} from '../../atoms'

export const Page = () => {
  const [user, setUser] = React.useState()

  return (
    <Article>
      <Header
        user={user}
        onLogin={() => setUser({ name: 'Jane Doe' })}
        onLogout={() => setUser(undefined)}
        onCreateAccount={() => setUser({ name: 'Jane Doe' })}
      />
      <Container>
        <Box>
          <Section>
            <Heading level={2} label="Pages in Storybook" />
            <Paragraph>
              We recommend building UIs with a{' '}
              <Link
                href="https://componentdriven.org"
                target="_blank"
                rel="noopener noreferrer"
                label={<strong>component-driven</strong>}
              />{' '}
              process starting with atomic components and ending with pages.
            </Paragraph>
            <Paragraph>
              Render pages with mock data. This makes it easy to build and
              review page states without needing to navigate to them in your
              app. Here are some handy patterns for managing page data in
              Storybook:
            </Paragraph>
            <ul>
              <li>
                Use a higher-level connected component. Storybook helps you
                compose such data from the &quote;args&quote; of child component
                stories
              </li>
              <li>
                Assemble data in the page component from your services. You can
                mock these services out using Storybook.
              </li>
            </ul>
            <Paragraph>
              Get a guided tutorial on component-driven development at{' '}
              <Link
                href="https://storybook.js.org/tutorials/"
                target="_blank"
                rel="noopener noreferrer"
                label="Storybook tutorials"
              />
              . Read more in the{' '}
              <Link
                href="https://storybook.js.org/docs"
                target="_blank"
                rel="noopener noreferrer"
                label="docs"
              />
              .
            </Paragraph>
          </Section>
        </Box>
      </Container>
    </Article>
  )
}
