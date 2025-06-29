import { Button } from '../Button/Button';

import styles from './Dialog.module.scss';
import type { DialogActionsProps } from './types';

function clsx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function DialogActions({ actions, className, children }: DialogActionsProps) {
  if (children) {
    return <div className={clsx(styles.actions, className)}>{children}</div>;
  }

  if (!actions || actions.length === 0) {
    return null;
  }

  return (
    <div className={clsx(styles.actions, className)}>
      {actions.map((action, index) => (
        <Button
          key={index}
          variant={action.variant || 'text'}
          onClick={action.onClick}
          disabled={action.disabled}
          autoFocus={action.autoFocus}
          className={action.destructive ? 'destructive' : undefined}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}
