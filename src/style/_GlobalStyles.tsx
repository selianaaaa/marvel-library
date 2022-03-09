import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    font-smooth: always;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  html, body {
    width: 100%;
    height: 100%;
  }

  #root {
    position: relative;
    width: 100%;
    height: 100%;
  }

`;
