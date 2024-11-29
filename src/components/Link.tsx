import React from 'react';

interface LinkProps {
  to: string;
  children: React.ReactNode;
  external?: boolean;
}

export const Link: React.FC<LinkProps> = ({ to, children, external = false }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (!external) {
      e.preventDefault();
      window.history.pushState({}, '', to);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <a
      href={to}
      className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};

