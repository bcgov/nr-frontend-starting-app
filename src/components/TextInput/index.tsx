import React from 'react';

interface InputProps {
  id: string,
  isValid?: boolean,
  size?: string,
  feedback?: string,
  blur?: any
}

const TextInput = ({
  id, isValid, size = 'form-control ', feedback = '', blur = 'undefined'
}: InputProps) => {
  let valid = '';

  if (isValid !== undefined) {
    valid = isValid ? 'is-valid' : 'is-invalid';
  }

  const inputClasses = size + valid;

  return (
    <>
      <input type="text" id={id} className={inputClasses} onBlur={blur} />
      <div className={isValid ? 'valid-feedback' : 'invalid-feedback'}>{ feedback }</div>
    </>
  );
};

export default TextInput;
