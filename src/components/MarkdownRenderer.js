import React from 'react';
import { SectionLink } from 'react-scroll-section';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import colors from '../../colors';

const StyledLink = styled.a`
  display: inline-block;
  transition: color 250ms, text-shadow 250ms;
  color: black;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  z-index: 3;

  &:after {
    position: absolute;
    z-index: -1;
    bottom: 1px;
    left: 50%;
    transform: translateX(-50%);
    content: '';
    width: 100%;
    height: 3px;
    background-color: ${props => props.theme.colors.primaryDark};
    transition: all 250ms;
  }

  &:hover {
    color: white;

    &::after {
      height: 110%;
      width: 110%;
    }
  }
`;

const MarkdownParagraph = styled.p`
  background: ${colors.background};
  line-height: 1.5;
  position: relative;
  z-index: 1;

  &:first-child {
    margin-top: 0em;
  }
`;

const MarkdownList = styled.ul`
  margin: 0;
`;

const MarkdownListItem = styled.li`
  margin: 1em 0;
  line-height: 2em;
`;

const MarkdownLink = ({ href, children }) => {
  const isInnerLink = href.startsWith('#');
  return isInnerLink ? (
    <SectionLink section={href.substring(1, href.length)}>
      {({ onClick }) => <StyledLink onClick={onClick}>{children}</StyledLink>}
    </SectionLink>
  ) : (
    <StyledLink href={href} target="_blank" rel="noreferrer">
      {children}
    </StyledLink>
  );
};

MarkdownLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default {
  paragraph: props => <MarkdownParagraph {...props} />,
  list: props => <MarkdownList {...props} />,
  listItem: props => <MarkdownListItem {...props} />,
  link: MarkdownLink,
};
