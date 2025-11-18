// styles/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Brawler:wght@400;500;600;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Brawler', serif;
  }

  body {
    background-color: #f4f6f8;
    color: #222;
    padding-top: 70px; /* Account for fixed AppBar */
    font-weight: 400;
    line-height: 1.6;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  html {
    scroll-behavior: smooth;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
  }

  button {
    font-family: 'Brawler', serif;
    font-weight: 600;
  }

  input, textarea {
    font-family: 'Brawler', serif;
  }
`;

export default GlobalStyle;