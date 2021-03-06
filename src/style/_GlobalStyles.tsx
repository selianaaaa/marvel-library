import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`


  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto Condensed', sans-serif;
    outline: none;
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
