import React from 'react';

interface LabelProps {
  labelStr: string,
  forStr: string
}

const Label = ({ labelStr, forStr }: LabelProps) => (
  <label data-testid="label-element" className="control-label" htmlFor={forStr}>{ labelStr }</label>
);

export default Label;
