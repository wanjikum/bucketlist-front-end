import styled from "styled-components";

import media from "../../utils/media";
import { DARK_GREY, BLACK, WHITE_GREY, BLUE } from "../../utils/colors";

const Button = styled.button`
  align-items: center;
  background: ${BLUE};
  border-radius: 0.5rem;
  color: ${WHITE_GREY};
  display: flex;
  justify-content: center;
  height: 3.5rem;
  width: 100%;
  font-size: 1.5rem;

  ${media.small`
    border-radius: 1rem;
  `};

  &:hover {
    background: ${BLACK};
    cursor: ${props => (props.disabled ? "cursor" : "pointer")};
    transition: all 0.3s ease;
  }

  &:active {
    background: ${DARK_GREY};
    outline: none;
  }

  &:disabled {
    opacity: 0.7;
    box-shadow: none;
  }

  &:focus {
    outline: none;
  }
`;

export default Button;
