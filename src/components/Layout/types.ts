// Layout.types.ts (opcjonalny plik typów, jeśli projekt będzie rozbudowywany)
import type { ComponentChildren, JSX } from "preact";

export interface LayoutProps {
  children: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  direction?: "horizontal" | "vertical";
  fullHeight?: boolean;
}
