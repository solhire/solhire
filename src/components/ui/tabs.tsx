import React from 'react';

export const Tabs = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props}>
      {children}
    </div>
  );
};

// Also export as default for compatibility with both import styles
export default Tabs;

export const TabsList = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>;
export const TabsTrigger = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props}>{children}</button>;
export const TabsContent = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>; 