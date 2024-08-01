import { css } from 'lit';

export default css`
  :host {
    display: block;
    padding: 16px;
    max-width: 600px;
    margin: 0 auto;
  }

  header {
    display: flex;
  }

  header > * {
    width: 50%;
  }

  .btnGroup {
    display: flex;
    margin-left: 10px;
    justify-content: end;
    gap: 5px;
  }

  main {
    margin-top: 1em;
  }

  .note-container {
    max-height: calc(100vh - 200px);
    overflow-y: auto;
  }

  .note-container > * {
    margin-top: 0.5em;
    position: relative;
  }
`;
