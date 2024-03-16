import { cn } from "@/lib/utils";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, left, right, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-9 w-full items-center gap-2 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        {left}
        <input
          type={type}
          ref={ref}
          className="h-full w-full focus:outline-none"
          {...props}
        />
        {right}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
