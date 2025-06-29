import { useEffect, useRef } from 'preact/hooks';
import { createPortal } from 'preact/compat';

import type { DialogProps } from './types';
import { DialogHeader } from './DialogHeader';
import { DialogContent } from './DialogContent';
import { DialogActions } from './DialogActions';
import { useFocusTrap } from './useFocusTrap';
import { useDrag } from './useDrag';
import styles from './Dialog.module.scss';

export function Dialog(props: DialogProps) {
  const {
    open,
    onClose,
    type,
    size,
    title,
    subtitle,
    children,
    actions,
    draggable = false,
    resizable = false,
    modal = true,
    portal = true,
    variant,
    className,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    showCloseButton = true,
    icon,
    initialPosition,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    ...rest
  } = props;

  const dialogRef = useFocusTrap(open);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Handle body scroll lock
  useEffect(() => {
    if (open && modal) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open, modal]);

  // Drag functionality
  const { dragRef, style: dragStyle } = useDrag({
    enabled: draggable && type !== 'fullscreen',
    initialPosition,
  });

  // Handle overlay click
  const handleOverlayClick = (event: MouseEvent) => {
    if (closeOnOverlayClick && event.target === overlayRef.current && onClose) {
      onClose();
    }
  };

  // Handle escape key
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && closeOnEscape && onClose) {
      onClose();
    }
  };

  // Focus dialog when opened
  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [open]);

  if (!open) return null;

  const getDialogClasses = () => {
    const classes = [styles.dialog];

    if (open) {
      classes.push(styles.open);
    }

    if (type) {
      classes.push(styles[type]);
    }

    if (variant) {
      classes.push(styles[variant]);
    }

    if (size) {
      classes.push(styles[size]);
    }

    if (draggable && type !== 'fullscreen') {
      classes.push(styles.draggable);
    }

    if (resizable && type !== 'fullscreen') {
      classes.push(styles.resizable);
    }

    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  };

  const dialogElement = (
    <div
      ref={(el) => {
        // Set both refs to the same element
        if (dialogRef && dialogRef.current !== undefined) {
          dialogRef.current = el;
        }
        if (dragRef && dragRef.current !== undefined) {
          dragRef.current = el;
        }
      }}
      role="dialog"
      aria-modal={modal}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy || (title ? 'dialog-title' : undefined)}
      aria-describedby={ariaDescribedBy}
      tabIndex={-1}
      className={getDialogClasses()}
      style={dragStyle}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {/* Header */}
      {(title || icon || showCloseButton) && (
        <DialogHeader
          title={title}
          subtitle={subtitle}
          icon={icon}
          showCloseButton={showCloseButton}
          onClose={onClose}
          id={title ? 'dialog-title' : undefined}
        />
      )}

      {/* Content */}
      <DialogContent>{children}</DialogContent>

      {/* Actions */}
      {actions && actions.length > 0 && <DialogActions actions={actions} />}

      {/* Resize handle for resizable dialogs */}
      {resizable && type !== 'fullscreen' && (
        <div className={styles.resizeHandle} data-testid="resize-handle" />
      )}
    </div>
  );

  // For fullscreen dialogs, render directly without overlay
  if (type === 'fullscreen') {
    return dialogElement;
  }

  // For modal dialogs, render with overlay
  const overlayClasses = [styles.overlay];
  if (open) {
    overlayClasses.push(styles.open);
  }

  const dialogWithOverlay = modal ? (
    <div className={styles.overlayContainer}>
      <div ref={overlayRef} className={overlayClasses.join(' ')} onClick={handleOverlayClick} />
      {dialogElement}
    </div>
  ) : (
    dialogElement
  );

  // Render in portal if specified, otherwise render inline
  if (portal) {
    const portalTarget =
      typeof portal === 'string' ? document.getElementById(portal) || document.body : document.body;

    return createPortal(dialogWithOverlay, portalTarget);
  }

  return dialogWithOverlay;
}

// Export subcomponents for advanced usage
export { DialogHeader, DialogContent, DialogActions };
