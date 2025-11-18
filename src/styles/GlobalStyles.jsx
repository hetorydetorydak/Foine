import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Times New Roman', serif;
  }

  body {
    background-color: #f4f6f8;
    color: #fff;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
