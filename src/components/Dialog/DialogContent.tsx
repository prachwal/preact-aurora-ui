import styles from './Dialog.module.scss';
import type { DialogContentProps } from './types';

function clsx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function DialogContent({
  children,
  scrollable = true,
  className,
  style,
}: DialogContentProps) {
  return (
    <div className={clsx(styles.content, scrollable && styles.scrollable, className)} style={style}>
      {children}
    </div>
  );
}
