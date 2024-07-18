import React from 'react';
import './3d-card.css'; // Import the CSS for 3D effect

export const CardContainer = ({ children, className }) => (
  <div className={`card-container ${className}`}>
    {children}
  </div>
);

export const CardBody = ({ children, className }) => (
  <div className={`card-body ${className}`}>
    {children}
  </div>
);

export const CardItem = ({ children, translateZ, rotateX, rotateZ, as: Component = 'div', className }) => (
  <Component
    className={`card-item ${className}`}
    style={{
      transform: `translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`,
    }}
  >
    {children}
  </Component>
);
