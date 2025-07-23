import React from "react";
import { VariantProps } from "class-variance-authority";
import { cardVariants } from "../../lib/variants";
import { cn } from "../../lib/utils";

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

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
