import styled from "styled-components";
import { Link } from "react-router-dom";

import {
  COOL_GREY,
  DARK_GREY,
  SILVER_GREY,
  WHITE,
  BLACK
} from "../../utils/colors";

const CustomButtonLink = styled(Link)`
  align-items: center;
  background: ${WHITE};
  border-radius: 0.5rem;
  color: ${BLACK};
  display: flex;
  justify-content: center;
  height: 3.5rem;
  width: 100%;
  font-size: 1.5rem;

  &:hover {
    background: ${SILVER_GREY};
    cursor: ${props => (props.disabled ? "cursor" : "pointer")};
    transition: all 0.3s ease;
  }

  &:active {
    background: ${DARK_GREY};
    outline: none;
  }

  &:disabled {
    background-color: ${SILVER_GREY};
    color: ${COOL_GREY};
    box-shadow: none;
  }
`;

export default CustomButtonLink;
