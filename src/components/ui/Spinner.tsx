import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

// Custom CSS animations for Tailwind v4
const spinnerStyles = `
  @keyframes spin-slow {
    to {
      transform: rotate(360deg);
    }
  }
  
  @keyframes spin-fast {
    to {
      transform: rotate(360deg);
    }
  }
  
  @keyframes pulse-scale {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.7;
    }
  }
  
  @keyframes bounce-scale {
    0%, 20% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    80%, 100% {
      transform: scale(1);
    }
  }
  
  @keyframes bars-scale {
    0%, 40%, 100% {
      transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1);
    }
  }
  
  .animate-spin-slow {
    animation: spin-slow 2s linear infinite;
  }
  
  .animate-spin-fast {
    animation: spin-fast 0.5s linear infinite;
  }
  
  .animate-pulse-scale {
    animation: pulse-scale 1.5s ease-in-out infinite;
  }
  
  .animate-bounce-scale {
    animation: bounce-scale 1.4s ease-in-out infinite both;
  }
  
  .animate-bars-scale {
    animation: bars-scale 1.2s ease-in-out infinite;
  }
`

// Inject styles into document head
if (typeof document !== 'undefined') {
  const styleId = 'spinner-animations'
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = spinnerStyles
    document.head.appendChild(style)
  }
}

// Spinner variants using class-variance-authority
const spinnerVariants = cva(
  "animate-spin",
  {
    variants: {
      variant: {
        default: "border-2 border-current border-t-transparent rounded-full",
        dots: "flex space-x-1",
        pulse: "rounded-full bg-current",
        bars: "flex space-x-1",
        ring: "border-2 border-current/20 border-t-current rounded-full",
      },
      size: {
        sm: "w-4 h-4",
        default: "w-6 h-6",
        lg: "w-8 h-8",
        xl: "w-12 h-12",
      },
      speed: {
        slow: "animate-spin-slow",
        default: "animate-spin",
        fast: "animate-spin-fast",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      speed: "default",
    },
  }
)

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  /**
   * Show loading text alongside spinner
   */
  label?: string
  /**
   * Screen reader text for accessibility
   */
  srText?: string
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, variant, size, speed, label, srText = "Loading", ...props }, ref) => {
    const renderSpinner = () => {
      switch (variant) {
        case "dots":
          return (
            <div className={cn(spinnerVariants({ variant, size, speed }), className)}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "bg-current rounded-full animate-bounce-scale",
                    size === "sm" && "w-1 h-1",
                    size === "default" && "w-1.5 h-1.5",
                    size === "lg" && "w-2 h-2",
                    size === "xl" && "w-3 h-3"
                  )}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          )

        case "pulse":
          return (
            <div
              className={cn(
                "animate-pulse-scale",
                size === "sm" && "w-4 h-4",
                size === "default" && "w-6 h-6",
                size === "lg" && "w-8 h-8",
                size === "xl" && "w-12 h-12",
                className
              )}
            />
          )

        case "bars":
          return (
            <div className={cn(spinnerVariants({ variant, size }), className)}>
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "bg-current animate-bars-scale",
                    size === "sm" && "w-0.5 h-4",
                    size === "default" && "w-1 h-6",
                    size === "lg" && "w-1.5 h-8",
                    size === "xl" && "w-2 h-12"
                  )}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          )

        case "ring":
          return (
            <div className={cn(spinnerVariants({ variant, size, speed }), className)} />
          )

        default:
          return (
            <div className={cn(spinnerVariants({ variant, size, speed }), className)} />
          )
      }
    }

    return (
      <div
        ref={ref}
        role="status"
        aria-label={srText}
        className={cn("inline-flex items-center gap-2", className)}
        {...props}
      >
        {renderSpinner()}
        {label && (
          <span className="text-sm font-medium text-muted-foreground">
            {label}
          </span>
        )}
        <span className="sr-only">{srText}</span>
      </div>
    )
  }
)
Spinner.displayName = "Spinner"

// Loading Button Component
export interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  loadingText?: string
  spinnerSize?: "sm" | "default" | "lg"
  spinnerVariant?: "default" | "dots" | "pulse" | "bars" | "ring"
}

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    {
      className,
      loading = false,
      loadingText,
      spinnerSize = "sm",
      spinnerVariant = "default",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={loading || disabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          "bg-primary text-primary-foreground hover:bg-primary/90",
          "h-10 px-4 py-2",
          className
        )}
        {...props}
      >
        {loading && (
          <Spinner
            variant={spinnerVariant}
            size={spinnerSize}
            className="text-current"
          />
        )}
        {loading ? loadingText || "Loading..." : children}
      </button>
    )
  }
)
LoadingButton.displayName = "LoadingButton"

// Full Page Loading Component
export interface PageLoaderProps {
  variant?: "default" | "dots" | "pulse" | "bars" | "ring"
  size?: "sm" | "default" | "lg" | "xl"
  text?: string
  overlay?: boolean
}

const PageLoader: React.FC<PageLoaderProps> = ({
  variant = "default",
  size = "lg",
  text = "Loading...",
  overlay = true,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        overlay && "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
      )}
    >
      <Spinner variant={variant} size={size} />
      {text && (
        <p className="text-sm font-medium text-muted-foreground">{text}</p>
      )}
    </div>
  )
}

// Export all components
export { Spinner, LoadingButton, PageLoader, spinnerVariants }

// Usage Examples:
/*
// Basic spinner
<Spinner />

// Different variants
<Spinner variant="dots" />
<Spinner variant="pulse" />
<Spinner variant="bars" />
<Spinner variant="ring" />

// Different sizes
<Spinner size="sm" />
<Spinner size="lg" />
<Spinner size="xl" />

// With label
<Spinner label="Loading data..." />

// Loading button
<LoadingButton loading={isLoading} loadingText="Saving...">
  Save Changes
</LoadingButton>

// Full page loader
<PageLoader text="Please wait..." variant="dots" />

// Custom styling
<Spinner className="text-blue-500" variant="ring" size="lg" />
*/

// Note: All animations are included in this file for Tailwind v4 compatibility
// No additional Tailwind config needed!