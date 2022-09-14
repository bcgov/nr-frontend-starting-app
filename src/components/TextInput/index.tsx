import React from 'react';

interface InputProps {
  id: string,
  isValid?: boolean,
  size?: string,
  feedback?: string,
  blur?: any
}

const TextInput = ({
  id,
  isValid,
  size = 'form-control ',
  feedback = '',
  blur = 'undefined'
}: InputProps) => {
  let valid = '';

  if (typeof isValid === 'boolean') {
    valid = isValid ? 'is-valid' : 'is-invalid';
  }

  const inputClasses = `${size} ${valid}`;

  return (
    <>
      <input data-testid="input-element" type="text" id={id} className={inputClasses} onChange={blur} value={inputValue} />
      <div data-testid="feedback-element" className={isValid ? 'valid-feedback' : 'invalid-feedback'}>{ feedback }</div>
    </>
  );
};

export default TextInput;
