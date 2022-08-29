import styled from 'styled-components';

const HeaderTitle = styled.div`
  font-family: "Noto Sans", Verdana, Arial, sans-serif;
  font-weight: bold;
  visibility: hidden;

  @media screen and (max-width: 640px) {
    font-size: calc(3px + 2.2vw);
    visibility: visible;
  }

  @media screen and (min-width: 640px) and (max-width: 899px) {
    font-size: calc(7px + 2.2vw);
    visibility: visible;
  }

  @media screen and (min-width: 900px) {
    font-size: 1.5em;
    visibility: visible;
  }
`;

export default HeaderTitle;
