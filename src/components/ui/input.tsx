
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    // Debug log pour diagnostiquer les problèmes
    console.log('Input component render:', { type, props });
    
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
        // S'assurer que les événements sont bien gérés
        onFocus={(e) => {
          console.log('Input onFocus:', e.target.id);
          if (props.onFocus) {
            props.onFocus(e);
          }
        }}
        onChange={(e) => {
          console.log('Input onChange:', e.target.value);
          if (props.onChange) {
            props.onChange(e);
          }
        }}
        onBlur={(e) => {
          console.log('Input onBlur:', e.target.id);
          if (props.onBlur) {
            props.onBlur(e);
          }
        }}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
