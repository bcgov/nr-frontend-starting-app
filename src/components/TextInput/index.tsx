import React, { ChangeEventHandler, KeyboardEventHandler } from 'react';

interface InputProps {
  id: string,
  isValid?: boolean,
  size?: string,
  feedback?: string,
  onChangeHandler?: ChangeEventHandler<HTMLInputElement>,
  inputValue?: string,
  onKeyDownHandler?: KeyboardEventHandler<HTMLInputElement>,
  disabled?: boolean,
  readonly?: boolean
}

const TextInput = ({
  id,
  isValid,
  size = 'form-control',
  feedback = '',
  onChangeHandler,
  inputValue = '',
  onKeyDownHandler,
  disabled = false,
  readonly = false
}: InputProps) => {
  let valid = '';

  if (typeof isValid === 'boolean') {
    valid = isValid ? 'is-valid' : 'is-invalid';
  }

  const inputClasses = `${size} ${valid}`;
  const divClassName = isValid ? 'valid-feedback' : 'invalid-feedback';

  return (
    <>
      <input
        data-testid="input-element"
        type="text"
        id={id}
        className={inputClasses}
        onChange={onChangeHandler}
        value={inputValue}
        onKeyDown={onKeyDownHandler}
        disabled={disabled}
        readOnly={readonly}
      />
      <div
        data-testid="feedback-element"
        className={divClassName}
      >
        { feedback }
      </div>
    </>
  );
};

export default TextInput;
