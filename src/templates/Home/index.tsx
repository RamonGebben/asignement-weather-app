import { Button } from '~/atoms/Button';
import { Code } from '~/atoms/Code';
import { InlineLink } from '~/atoms/InlineLink';
import { Logo } from '~/atoms/Logo';
import { Actions } from './components/Actions';
import { Intro } from './components/Intro';
import { Main } from './components/Main';
import { Page } from './components/Page';

export const Home = () => {
  return (
    <Page>
      <Main>
        <Logo
          $src="/next.svg"
          $width={100}
          $height={20}
          aria-label="Next.js logo"
        />
        <Intro
          title={
            <>
              To get started, edit the <Code>page.tsx</Code> file.
            </>
          }
          lead={
            <>
              Looking for a starting point or more instructions? Head over to{' '}
              <InlineLink
                href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Templates
              </InlineLink>{' '}
              or the{' '}
              <InlineLink
                href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learning
              </InlineLink>{' '}
              center.
            </>
          }
        />
        <Actions>
          <Button
            $variant="primary"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Logo
              $src="/vercel.svg"
              $width={16}
              $height={14}
              aria-label="Vercel logomark"
            />
            Deploy Now
          </Button>
          <Button
            $variant="secondary"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </Button>
        </Actions>
      </Main>
    </Page>
  );
};
