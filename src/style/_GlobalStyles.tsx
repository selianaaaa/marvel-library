import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:400,500,700&display=swap');

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
