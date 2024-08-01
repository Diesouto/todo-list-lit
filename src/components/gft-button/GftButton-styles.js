import { css } from 'lit';

export default css`
  :host {
    --bg-color: #007bff;
  }

  :host(:hover) {
    --bg-color: #0069da;
  }

  :host(.danger) {
    --bg-color: #e01212;
  }

  :host(.danger:hover) {
    --bg-color: #ba0e0e;
  }

  button {
    padding: 10px 20px;
    background-color: var(--bg-color);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;
