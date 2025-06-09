import * as React from 'react';
import { AlertTriangle } from 'lucide-react';
import styles from './Alert.module.css';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive';
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.alert} ${variant === 'destructive' ? styles.destructive : styles.default} ${className}`}
        {...props}
      >
        <div className={styles.content}>
          <AlertTriangle className={`${styles.icon} ${variant === 'destructive' ? styles.destructiveIcon : styles.defaultIcon}`} />
          <div className={styles.children}>
            {children}
          </div>
        </div>
      </div>
    );
  }
);

interface AlertDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {}

export const AlertDescription = React.forwardRef<HTMLDivElement, AlertDescriptionProps>(
  ({ className, ...props }, ref) => {
  return (
      <div
        ref={ref}
        className={`${styles.description} ${className}`}
        {...props}
      />
    );
  }
);

Alert.displayName = 'Alert';
AlertDescription.displayName = 'AlertDescription';
