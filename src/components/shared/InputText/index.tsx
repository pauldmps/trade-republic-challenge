import React from 'react';
import { StyledInput } from './styles';

interface IInputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const InputText: React.FC<IInputTextProps> = (
  { value, onChange, placeholder },
  ...rest
) => {
  return (
    <StyledInput
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      {...rest}
    />
  );
};

export default InputText;
