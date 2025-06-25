import type { JSX } from "preact";

import styles from "./ExampleButton.module.scss";

export interface ExampleButtonProps
  extends JSX.HTMLAttributes<HTMLButtonElement> {
  children?: JSX.Element | JSX.Element[] | string | number;
}

export function ExampleButton({ children, ...props }: ExampleButtonProps) {
  return (
    <button className={styles["example-button"]} {...props}>
      {children}
    </button>
  );
}
