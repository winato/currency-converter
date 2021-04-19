import { createGlobalStyle } from 'styled-components';

const AppStyles = createGlobalStyle`
  body {
    text-align: center;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-family: 'Roboto';
    color: #121212;
    background-color: #fafafa;
  }

  * {
    box-sizing: border-box;
  }
`

export default AppStyles;
