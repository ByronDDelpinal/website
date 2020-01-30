
import React, { Fragment } from 'react';
import { Heading, Text } from 'rebass';
import styled from 'styled-components';
import Section from '../Section';
import Triangle from '../Triangle';

const Background = () => (
  <div>
    <Triangle
      color="primaryDark"
      height={['35vh', '80vh']}
      opacity='0.3'
      width={['95vw', '60vw']}
    />

    <Triangle
      color="secondary"
      height={['38vh', '80vh']}
      width={['50vw', '35vw']}
    />

    <Triangle
      color="primaryDark"
      height={['25vh', '35vh']}
      invertX
      width={['75vw', '60vw']}
    />

    <Triangle
      color="tertiaryDark"
      height={['20vh', '20vh']}
      invertX
      invertY
      opacity='0.3'
      width={['100vw', '100vw']}
    />
  </div>
);

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.5;
  margin: 0 auto;
  padding: 10px;
  width: 100%;
  width: calc(50%);

  > div {
    padding: 10px 0;
  }
`;

const Landing = () => (
  <Section.Container id="design-patterns" Background={Background}>
    <Fragment>
      <Heading
        textAlign="center"
        as="h1"
        color="primary"
        fontSize={[5, 6, 8]}
        mb={[3, 4, 5]}
      >
        {'Let\'s talk about design patterns'}
      </Heading>
      <TextContainer>
        <Text>
          Have you ever run into an issue that you just know someone has solved before? A situation where you stop yourself mid-function-declaration and say “What am I doing? Why reinvent the wheel here?” and then find that a Stack Overflow search quickly serves up the copy-pasta you ordered? In the world of software architecture, we call that copy-pasta a “design pattern”. Design patterns are architectural solutions to common problems. They’re solutions that have come from years of developers solving the same problem different ways and agreeing on a solution.
        </Text>
        <Text>
          The trick here is to remember what each pattern is intended (and not intended) to be used for and to learn how to weigh its pros and cons. Implementing the wrong pattern in the wrong situation tends to make things complicated.
        </Text>
      </TextContainer>
    </Fragment>
  </Section.Container>
);

export default Landing;

