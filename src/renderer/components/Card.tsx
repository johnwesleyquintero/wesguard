import React from "react";
import { cardVariants } from "../../lib/variants";
import { cn } from "../../lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "flat";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => {
    const {
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledby,
      tabIndex,
      ...rest
    } = props;
    return (
      <div
        className={cn(cardVariants({ variant, className }))}
        ref={ref}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        tabIndex={tabIndex}
        {...rest}
      />
    );
  },
);
Card.displayName = "Card";

export { Card };
