import styled from 'styled-components';

const FooterLink = styled.a`
  font-size: 0.813em;
  font-weight: normal;
  color: #fff;
  border-right: 1px solid #4b5e7e;
  padding-left: 5px;
  padding-right: 5px;
  text-decoration: none;

  &:hover
  {
    color: #fff;
    text-decoration: underline;
  }

  &:focus
  {
    outline: 4px solid #3B99FC;
    outline-offset: 1px;
  }
`;

export default FooterLink;
