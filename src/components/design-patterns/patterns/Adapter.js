import React from 'react';
import { Box, Image, Text, Flex } from 'rebass';
import Fade from 'react-reveal/Fade';
import Section from '../../Section';
import Triangle from '../../Triangle';
import PatternImage from '../../../../media/composite.png';

const Background = () => (
  <div>
    <Triangle
      color="secondaryLight"
      height={['50vh', '20vh']}
      width={['50vw', '50vw']}
      invertY
    />

    <Triangle
      color="primaryDark"
      height={['20vh', '40vh']}
      width={['75vw', '70vw']}
      invertX
    />

    <Triangle
      color="tertiaryDark"
      height={['25vh', '20vh']}
      opacity='0.3'
      width={['100vw', '100vw']}
    />
  </div>
);

const AdapterPattern = () => (
  <Section.Container id="adapter" Background={Background}>
    <Section.Header name="Adapter Pattern" />
    <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
      <Box width={[1, 1, 4 / 6]} px={[1, 2, 4]}>
        <Fade bottom>
          <Text width={[1]}>
            The composite pattern is used to create tree-like structures of components that can be reused easily. The trunk, our main “Page” component, is the overall parent. It has three direct children: Sidebar, Main Content, and Footer. Sidebar and Main Content both have two children of their own, even sharing the same Title component underneath them both. Blog Post, the second child of Main Content, also has children underneath it. The Footer is a child component with no children underneath it. This is the versatility of the composite pattern.
          </Text>
        </Fade>
      </Box>

      <Box
        width={[1, 1, 2 / 6]}
        style={{ maxWidth: '300px', margin: 'auto' }}
      >
        <Fade right>
          <Image
            src={PatternImage}
            alt='Architecture Diagram of the Composite Pattern'
            mt={[4, 4, 0]}
            ml={[0, 0, 1]}
          />
        </Fade>
      </Box>
    </Flex>
  </Section.Container>
);

export default AdapterPattern;
