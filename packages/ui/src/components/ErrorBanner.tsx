import styles from './ErrorBanner.module.css';

interface ErrorBannerProps {
  message: string;
  onRetry: () => void;
  onDismiss: () => void;
}

export const ErrorBanner = ({ message, onRetry, onDismiss }: ErrorBannerProps) => {
  return (
    <div className={styles.banner}>
      <p className={styles.message}>{message}</p>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={onRetry}>Retry</button>
        <button className={styles.button} onClick={onDismiss}>Dismiss</button>
      </div>
    </div>
  );
};