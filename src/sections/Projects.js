import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, Flex, Box } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import { CardContainer, Card } from '../components/Card';
import SocialLink from '../components/SocialLink';
import Triangle from '../components/Triangle';
import ImageSubtitle from '../components/ImageSubtitle';
import Hide from '../components/Hide';

const Background = () => (
  <div>
    <Triangle
      color="primaryDark"
      height={['80vh', '80vh']}
      width={['100vw', '100vw']}
      invertX
    />

    <Triangle
      color="backgroundDark"
      height={['50vh', '20vh']}
      invertX
      width={['50vw', '50vw']}
    />

    <Triangle
      color="secondary"
      invertX
      invertY
      height={['25vh', '40vh']}
      width={['75vw', '60vw']}
    />

    <Triangle
      color="backgroundDark"
      height={['25vh', '20vh']}
      invertY
      width={['100vw', '100vw']}
    />
  </div>
);

const CARD_HEIGHT = '200px';

const MEDIA_QUERY_SMALL = '@media (max-width: 400px)';

const ProjectCard = styled(Card)`
  position: relative;
  height: 200px;
`;

const ProjectCardFront = styled(Card)`
  backface-visibility: hidden;
  height: 100%;
  transform-style: preserve-3d;
  width: 100%;

  &:hover {
    transform: rotateY( 180deg );
    transition: transform 0.5s;
  }
`;

const ProjectCardBack = styled(Card)`
  backface-visibility: hidden;
  height: 100%;
  transform-style: preserve-3d;
  width: 100%;

  &:hover {
    transform: rotateY( 180deg );
    transition: transform 0.5s;
  }
`;

const CompanyName = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  display: table;
  border-bottom: ${props => props.theme.colors.primary} 5px solid;
`;

const JobTitle = styled(Text)`
  margin-bottom: 5px;
  font-weight: bold;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  width: calc(100% - ${CARD_HEIGHT});

  ${MEDIA_QUERY_SMALL} {
    width: calc(100% - (${CARD_HEIGHT} / 2));
  }
`;

const ImageContainer = styled.div`
  margin: auto;
  width: ${CARD_HEIGHT};

  ${MEDIA_QUERY_SMALL} {
    width: calc(${CARD_HEIGHT} / 2);
  }
`;

const ProjectImage = styled(Image)`
  width: ${CARD_HEIGHT};
  height: ${CARD_HEIGHT};
  padding: 40px;
  margin-top: 0px;

  ${MEDIA_QUERY_SMALL} {
    height: calc(${CARD_HEIGHT} / 2);
    width: calc(${CARD_HEIGHT} / 2);
    margin-top: calc(${CARD_HEIGHT} / 4);
    padding: 10px;
  }
`;

const ProjectTag = styled.div`
  position: relative;
  height: ${CARD_HEIGHT};
  top: calc(
    -${CARD_HEIGHT} - 3.5px
  ); /*don't know why I have to add 3.5px here ... */

  ${MEDIA_QUERY_SMALL} {
    top: calc(-${CARD_HEIGHT} - 3.5px + (${CARD_HEIGHT} / 4));
  }
`;

const Project = ({
  name,
  title,
  description,
  projectUrl,
  repositoryUrl,
  type,
  startDate,
  endDate,
  logo,
}) => (
  <ProjectCard p={0}>
    <ProjectCardFront>
      <Flex style={{ height: CARD_HEIGHT }}>
        <TextContainer>
          <span>
            <CompanyName my={2} pb={1}>
              {name}
            </CompanyName>
          </span>
          <JobTitle width={[1]}>
            {title}
          </JobTitle>
          <Text width={[1]} style={{ overflow: 'auto' }}>
            {description}
          </Text>
        </TextContainer>

        <ImageContainer>
          <ProjectImage src={logo.image.src} alt={logo.title} />
          <ProjectTag>
            <Flex
              style={{
                float: 'right',
              }}
            >
              {repositoryUrl
                ? (
                  <Box mx={1} fontSize={5}>
                    <SocialLink
                      name="Check repository"
                      fontAwesomeIcon="github"
                      url={repositoryUrl}
                    />
                  </Box>
                )
                : null
              }
              <Box mx={1} fontSize={5}>
                <SocialLink
                  name="See project"
                  fontAwesomeIcon="globe"
                  url={projectUrl}
                />
              </Box>
            </Flex>
            <ImageSubtitle bg="primary" color="white" y="bottom" x="right" round>
              {type}
            </ImageSubtitle>
            <Hide query={MEDIA_QUERY_SMALL}>
              <ImageSubtitle bg="backgroundDark">{ startDate + (endDate ? ` - ${endDate}` : ' - present')}</ImageSubtitle>
            </Hide>
          </ProjectTag>
        </ImageContainer>
      </Flex>
    </ProjectCardFront>
  </ProjectCard>
);

Project.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  projectUrl: PropTypes.string.isRequired,
  repositoryUrl: PropTypes.string,
  type: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string,
  logo: PropTypes.shape({
    image: PropTypes.shape({
      src: PropTypes.string,
    }),
    title: PropTypes.string,
  }).isRequired,
};

const Projects = () => (
  <Section.Container id="projects" Background={Background}>
    <Section.Header name="Projects" icon="💻" label="notebook" />
    <StaticQuery
      query={graphql`
        query ProjectsQuery {
          contentfulAbout {
            projects {
              id
              name
              title
              description
              projectUrl
              startDate(formatString: "MM//YYYY")
              endDate(formatString: "MM//YYYY")
              type
              logo {
                title
                image: resize(width: 200, quality: 100) {
                  src
                }
              }
            }
          }
        }
      `}
      render={({ contentfulAbout }) => (
        <CardContainer minWidth="350px">
          {contentfulAbout.projects.map((p, i) => (
            <Fade bottom delay={i * 200} key={p.id}>
              <Project {...p} />
            </Fade>
          ))}
        </CardContainer>
      )}
    />
  </Section.Container>
);

export default Projects;
