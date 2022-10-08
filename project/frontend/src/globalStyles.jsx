import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  #page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    ${'' /* overflow: hidden; */}
    font-size: 12px;

  }
  html, body {
    max-width: 100%;
    ${'' /* overflow-x: hidden; */}
    font-family: Montserrat;
}

${'' /* @font-face {
  font-family: 'Montserrat';
  src: local('Montserrat'), url(./fonts/Montserrat/Montserrat-VariableFont_wght.ttf) format('truetype');
} */}



  #root {
    flex-grow: 1;
    align-items: stretch;
    height: auto;
  }

  .nowrap {
    white-space: nowrap;
  }
`;

export default GlobalStyles;
