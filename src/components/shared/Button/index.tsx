import React from 'react';
import { StyledButton } from './styles';

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | React.ReactNode;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  secondary?: boolean;
}

const Button: React.FC<IButtonProps> = ({ children, disabled, onClick }, ...rest) => {
  return <StyledButton disabled={disabled} onClick={onClick} {...rest}>{children}</StyledButton>;
};

export default Button;
