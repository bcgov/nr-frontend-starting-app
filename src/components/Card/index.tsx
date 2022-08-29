import React from 'react';

interface CardProps {
  title: string,
  text: string,
  children?: React.ReactNode,
  // data-test?: string
}

const Card = ({ title, text, children }: CardProps) => (
  <div className="card">
    <h4 className="card-header">{ title }</h4>
    <div className="card-body">
      <p className="card-text">{ text }</p>
    </div>
    <div className="card-footer">
      {children}
    </div>
  </div>
);

export default Card;
