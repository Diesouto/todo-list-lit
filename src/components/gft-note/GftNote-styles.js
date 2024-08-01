import { css } from 'lit';

export default css`
  :host {
    display: flex;
    align-items: center;
    padding: 0.5em 1em;
    border: 1px solid black;
    background-color: white;
  }

  :host([selected]) {
    color: white;
    background-color: darkblue;
    border: 1px solid darkblue;
  }

  span {
    margin-left: 10px;
  }
`;
