import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

// Animation for advanced ripple effect
const rippleAnimation = keyframes`
  to {
    transform: translate(-50%, -50%) scale(20);
    opacity: 0;
  }
`;

// Styled components
const CardContainer = styled.div`
  position: relative;
  width: 300px;
  height: 200px;
  background: ${props => props.bgColor || '#fff'};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  margin: 20px;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  padding: 20px;
  color: ${props => props.textColor || '#333'};
`;

const LiquidLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.liquidColor || '#4a6cf7'};
  clip-path: circle(0% at 50% 50%);
  transition: clip-path ${props => props.animationDuration || '0.5s'} ease;
  z-index: 1;

  ${CardContainer}:hover & {
    clip-path: circle(${props => props.rippleSize || '75%'} at ${props => props.originX || '50%'} ${props => props.originY || '50%'});
  }
`;

const Ripple = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: ${props => props.rippleColor || 'rgba(74, 108, 247, 0.5)'};
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  animation: ${rippleAnimation} 1s ease-out;
  pointer-events: none;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
`;

const RippleCard = ({ 
  children, 
  mode = 'simple', // 'simple' or 'advanced'
  liquidColor = '#4a6cf7',
  rippleColor = 'rgba(74, 108, 247, 0.5)',
  bgColor = '#fff',
  textColor = '#333',
  animationDuration = '0.5s',
  rippleSize = '75%'
}) => {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [ripples, setRipples] = useState([]);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (mode === 'simple') {
      setCoords({ x, y });
    } else {
      const newRipple = { x, y, id: Date.now() };
      setRipples(prev => [...prev, newRipple]);
      
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 1000);
    }
  };

  const handleMouseLeave = () => {
    if (mode === 'simple') {
      setCoords({ x: -1, y: -1 });
    }
  };

  return (
    <CardContainer 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      bgColor={bgColor}
    >
      <Content textColor={textColor}>{children}</Content>
      
      {mode === 'simple' ? (
        <LiquidLayer 
          liquidColor={liquidColor}
          animationDuration={animationDuration}
          rippleSize={rippleSize}
          originX={coords.x !== -1 ? `${coords.x}px` : '50%'}
          originY={coords.y !== -1 ? `${coords.y}px` : '50%'}
        />
      ) : (
        ripples.map(ripple => (
          <Ripple 
            key={ripple.id}
            x={ripple.x}
            y={ripple.y}
            rippleColor={rippleColor}
          />
        ))
      )}
    </CardContainer>
  );
};

export default RippleCard;