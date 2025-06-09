import * as React from "react";
import styles from './Select.module.css';

const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => (
  <select
    className={`${styles.select} ${className}`}
    ref={ref}
    {...props}
  />
));
Select.displayName = "Select";

export { Select };
