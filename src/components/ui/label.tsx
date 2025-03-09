import React from 'react';

export const Label = ({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label {...props}>
      {/* Label implementation */}
      {children}
    </label>
  );
};

// Also export as default for compatibility with both import styles
export default Label; 