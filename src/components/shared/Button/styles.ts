import styled from 'styled-components';
import { IButtonProps } from '.';

export const StyledButton = styled.button<IButtonProps>`
  order: 0;
  margin-left: 0;
  height: 4.4rem;
  width: auto;
  min-width: 12rem;
  border-radius: 2px;
  font-size: 1.8rem;
  outline: 2px solid transparent;
  outline-offset: 2px;
  background-color: rgba(0, 157, 255, 1);
  padding: 12px 16px;
  color: white;
  border: 0px white;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%);
  cursor: pointer;

  &:active {
    background-color: rgba(0, 125, 204, 1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;
