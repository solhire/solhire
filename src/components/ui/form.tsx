import React from 'react';

export const Form = ({ children, ...props }: React.FormHTMLAttributes<HTMLFormElement>) => {
  return (
    <form {...props}>
      {children}
    </form>
  );
};

// Also export as default for compatibility with both import styles
export default Form;

export const FormField = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>;
export const FormItem = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>;
export const FormLabel = ({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => <label {...props}>{children}</label>;
export const FormControl = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>;
export const FormDescription = ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => <p {...props}>{children}</p>;
export const FormMessage = ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => <p {...props}>{children}</p>; 