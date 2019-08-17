import { css } from "styled-components";

const sizes = {
  large: 1280,
  medium: 1024,
  small: 768
};

const media = Object.keys(sizes).reduce((acc, screenSize) => {
  const fn = (...args) =>
    css`
      @media (min-width: ${sizes[screenSize] / 16}em) {
        ${css(...args)};
      }
    `;
  return Object.assign({}, acc, { [screenSize]: fn });
}, {});

export default media;
