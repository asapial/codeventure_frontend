import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Centered, width-capped container used by every page's prose/section
 * content. The site-wide content boundary is `5xl` (~64 rem), while
 * intentionally narrow reading layouts can opt into `4xl`.
 *
 * Use this for any text column, card grid, or form area so reading width
 * stays predictable and centered.
 */
export type PageContainerSize = "4xl" | "5xl";

export interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  size?: PageContainerSize;
  as?: "div" | "section" | "main" | "article" | "header" | "footer";
}

const SIZE_CLASSES: Record<PageContainerSize, string> = {
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
};

export function PageContainer({
  children,
  className,
  size = "5xl",
  as: Tag = "div",
  ...rest
}: PageContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        SIZE_CLASSES[size],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
