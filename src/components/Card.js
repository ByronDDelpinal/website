import styled from 'styled-components';
import { Card as CardRebass } from 'rebass';

export const CardContainer = styled.div`
  display: grid;
  grid-gap: 30px;

  grid-template-columns: repeat(
    auto-fill,
    minmax(${props => props.minWidth}, 1fr)
  );
  justify-items: center;

  @media only screen and (max-width: 400px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
`;

export const Card = styled(CardRebass).attrs({
  bg: 'white',
  boxShadow: 0,
  borderRadius: 8,
})`
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};
  height: 100%;
  position: relative;
  top: 0;
  transition: all 0.25s;

  &:hover {
    top: -10px;
    box-shadow: 0 12px 16px rgba(0, 0, 0, 0.2);
  }
`;

export default Card;
