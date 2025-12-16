// styles/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Playfair Display', serif;
  }

  body {
    background-color: #FDF6EF; /* Warm art gallery background */
    color: #3E2723; /* Rich brown text */
    padding-top: 70px; /* Account for fixed AppBar */
    font-weight: 400;
    line-height: 1.6;
    background-image: 
      radial-gradient(circle at 10% 20%, rgba(216, 27, 96, 0.05) 0%, transparent 20%),
      radial-gradient(circle at 90% 80%, rgba(255, 160, 0, 0.05) 0%, transparent 20%);
  }

  /* Dark mode body styles */
  body[data-theme="dark"] {
    background-color: #1E1E1E;
    color: #FFFFFF;
    background-image: 
      radial-gradient(circle at 10% 20%, rgba(216, 27, 96, 0.1) 0%, transparent 20%),
      radial-gradient(circle at 90% 80%, rgba(255, 213, 79, 0.1) 0%, transparent 20%);
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
    letter-spacing: 0.02em;
  }

  button {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
  }

  input, textarea {
    font-family: 'Lora', serif;
  }

  /* Gallery-specific styles */
  .artwork-card {
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    cursor: pointer;
    border-radius: 20px;
  }

  .artwork-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(93, 64, 55, 0.2) !important;
  }

  /* Dark mode artwork card */
  [data-theme="dark"] .artwork-card:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4) !important;
  }

  /* Custom scrollbar for art gallery feel */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(253, 246, 239, 0.5);
  }

  ::-webkit-scrollbar-thumb {
    background: #8D6E63;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #5D4037;
  }

  /* Dark mode scrollbar */
  [data-theme="dark"] ::-webkit-scrollbar-track {
    background: rgba(30, 30, 30, 0.5);
  }

  [data-theme="dark"] ::-webkit-scrollbar-thumb {
    background: #5D4037;
  }

  [data-theme="dark"] ::-webkit-scrollbar-thumb:hover {
    background: #D81B60;
  }
`;

export default GlobalStyle;