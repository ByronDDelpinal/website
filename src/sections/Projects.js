import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, Flex } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import { CardContainer, Card } from '../components/Card';
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

const ProjectCardContainer = styled(CardContainer)`
  width: 100%;

  > div {
    width: 100%;
  }
`;

const ProjectCardContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  transition: transform 2s;
  transform-style: preserve-3d;
`;

const ProjectCard = styled(Card)`
  height: 200px;
  position: relative;

  &:hover {
    cursor: pointer;
  }

  &:hover ${ProjectCardContent} {
    transform: rotateY(180deg);
    transition: transform 1s;
  }
`;

const ProjectCardFront = styled(Card)`
  backface-visibility: hidden;
  height: 200px;
  position: absolute;
  width: 100%;
`;

const ProjectCardBack = styled(Card)`
  backface-visibility: hidden;
  height: 200px;
  position: absolute;
  transform: rotateY(180deg);
  width: 100%;
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
  technologies,
  type,
  startDate,
  endDate,
  logo,
}) => (
  <ProjectCard p={0}>
    <ProjectCardContent>
      <ProjectCardFront>
        <Flex style={{ height: CARD_HEIGHT }}>
          <TextContainer>
            <span>
              <CompanyName my={2} pb={1}>
                {name}
              </CompanyName>
            </span>
            <JobTitle width={[1]}>{title}</JobTitle>
            <Text width={[1]} style={{ overflow: 'auto' }}>
              {description}
            </Text>
          </TextContainer>

          <ImageContainer style={{height: '200px'}}>
            <ProjectImage src={logo.image.src} alt={logo.title} />
            <ProjectTag>
              <ImageSubtitle
                bg="primary"
                color="white"
                y="bottom"
                x="right"
                round
              >
                {type}
              </ImageSubtitle>
              <Hide query={MEDIA_QUERY_SMALL}>
                <ImageSubtitle
                  bg="backgroundDark"
                  y="top"
                  x="left"
                >
                  {startDate + (endDate ? ` - ${endDate}` : ' - present')}
                </ImageSubtitle>
              </Hide>
            </ProjectTag>
          </ImageContainer>
        </Flex>
      </ProjectCardFront>
      <ProjectCardBack>
        <CompanyName mb={1} ml={10} mt={18} pb={1}>
          Technologies
        </CompanyName>
        <ul style={{'margin-top': '0'}}>
          {technologies.map(technology => (
            <li style={{'line-height': '1.5'}}>{technology}</li>
          ))}
        </ul>
      </ProjectCardBack>
    </ProjectCardContent>
  </ProjectCard>
);

Project.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  technologies: PropTypes.arrayOf(PropTypes.string),
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
              technologies
              description
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
        <ProjectCardContainer minWidth="350px">
          {contentfulAbout.projects.map((p, i) => (
            <Fade bottom delay={i * 200} key={p.id} width="100%">
              <Project {...p} />
            </Fade>
          ))}
        </ProjectCardContainer>
      )}
    />
  </Section.Container>
);

export default Projects;
