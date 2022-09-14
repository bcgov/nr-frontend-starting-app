import React from 'react';

interface CardProps {
  title: string,
  text: string,
  children?: React.ReactNode
}

const Card = ({ title, text, children }: CardProps) => (
  <div className="card">
    <h4 data-testid="card-title" className="card-header">{ title }</h4>
    <div className="card-body">
      <p data-testid="card-text" className="card-text">{ text }</p>
    </div>
    <div data-testid="card-footer" className="card-footer">
      {children}
    </div>
  </div>
);

export default Card;
