import { Skeleton } from './Skeleton';
import styles from './LoadingGrid.module.css';

interface LoadingGridProps {
  count?: number;
  itemsPerRow?: number;
  height?: string;
  width?: string;
}

export const LoadingGrid = ({
  count = 12,
  itemsPerRow = 3,
  height = '100px',
  width = '100%'
}: LoadingGridProps) => {
  return (
    <div className={styles.grid} style={{ 
      gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`
    }}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={styles.item}>
          <Skeleton style={{ height, width }} />
        </div>
      ))}
    </div>
  );
};