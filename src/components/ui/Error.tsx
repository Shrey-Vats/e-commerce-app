import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

// Custom CSS animations for Tailwind v4
const failedStyles = `
  @keyframes shake {
    0%, 100% {
      transform: translateX(0);
    }
    10%, 30%, 50%, 70%, 90% {
      transform: translateX(-2px);
    }
    20%, 40%, 60%, 80% {
      transform: translateX(2px);
    }
  }
  
  @keyframes bounce-in {
    0% {
      transform: scale(0) rotate(0deg);
      opacity: 0;
    }
    50% {
      transform: scale(1.2) rotate(180deg);
      opacity: 0.8;
    }
    100% {
      transform: scale(1) rotate(360deg);
      opacity: 1;
    }
  }
  
  @keyframes draw-cross {
    0% {
      stroke-dasharray: 0, 100;
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dasharray: 100, 0;
      stroke-dashoffset: 0;
    }
  }
  
  @keyframes pulse-error {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.8;
    }
  }
  
  @keyframes fade-in-up {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-shake {
    animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97);
  }
  
  .animate-bounce-in {
    animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  
  .animate-draw-cross {
    animation: draw-cross 0.8s ease-out forwards;
  }
  
  .animate-pulse-error {
    animation: pulse-error 2s ease-in-out infinite;
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.5s ease-out forwards;
  }
  
  .animate-delay-100 {
    animation-delay: 100ms;
  }
  
  .animate-delay-200 {
    animation-delay: 200ms;
  }
  
  .animate-delay-300 {
    animation-delay: 300ms;
  }
`

// Inject styles into document head
if (typeof document !== 'undefined') {
  const styleId = 'failed-animations'
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = failedStyles
    document.head.appendChild(style)
  }
}

// Failed component variants
const failedVariants = cva(
  "inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "text-destructive",
        outline: "border border-destructive text-destructive bg-background",
        filled: "bg-destructive text-destructive-foreground",
        ghost: "text-destructive hover:bg-destructive/10",
        soft: "bg-destructive/10 text-destructive",
      },
      size: {
        sm: "w-4 h-4",
        default: "w-6 h-6",
        lg: "w-8 h-8",
        xl: "w-12 h-12",
      },
      animation: {
        none: "",
        shake: "animate-shake",
        bounce: "animate-bounce-in",
        pulse: "animate-pulse-error",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "bounce",
    },
  }
)

// Cross/X Icon Component
const CrossIcon: React.FC<{ className?: string; strokeWidth?: number }> = ({ 
  className, 
  strokeWidth = 2 
}) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
      className="animate-draw-cross"
      style={{
        strokeDasharray: '100',
        strokeDashoffset: '100'
      }}
    />
  </svg>
)

export interface FailedIconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof failedVariants> {
  /**
   * Custom cross icon stroke width
   */
  strokeWidth?: number
  /**
   * Screen reader text for accessibility
   */
  srText?: string
}

const FailedIcon = React.forwardRef<HTMLDivElement, FailedIconProps>(
  ({ className, variant, size, animation, strokeWidth = 2, srText = "Failed", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="img"
        aria-label={srText}
        className={cn(failedVariants({ variant, size, animation }), className)}
        {...props}
      >
        <CrossIcon strokeWidth={strokeWidth} className="w-full h-full" />
        <span className="sr-only">{srText}</span>
      </div>
    )
  }
)
FailedIcon.displayName = "FailedIcon"

// Error Button Component
export interface ErrorButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  error?: boolean
  errorText?: string
  iconSize?: "sm" | "default" | "lg"
  iconVariant?: "default" | "outline" | "filled" | "ghost" | "soft"
}

const ErrorButton = React.forwardRef<HTMLButtonElement, ErrorButtonProps>(
  (
    {
      className,
      error = false,
      errorText,
      iconSize = "sm",
      iconVariant = "default",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={error || disabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          error 
            ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
            : "bg-primary text-primary-foreground hover:bg-primary/90",
          "h-10 px-4 py-2",
          className
        )}
        {...props}
      >
        {error && (
          <FailedIcon
            variant={iconVariant}
            size={iconSize}
            className="text-current"
          />
        )}
        {error ? errorText || "Error" : children}
      </button>
    )
  }
)
ErrorButton.displayName = "ErrorButton"

// Error Alert Component
export interface ErrorAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  variant?: "default" | "outline" | "filled" | "soft"
  size?: "sm" | "default" | "lg"
  showIcon?: boolean
  onDismiss?: () => void
  dismissible?: boolean
}

const ErrorAlert = React.forwardRef<HTMLDivElement, ErrorAlertProps>(
  (
    {
      className,
      title = "Error",
      description,
      variant = "soft",
      size = "default",
      showIcon = true,
      onDismiss,
      dismissible = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative rounded-lg border p-4 animate-fade-in-up",
          variant === "default" && "border-destructive/50 text-destructive",
          variant === "outline" && "border-destructive text-destructive bg-background",
          variant === "filled" && "border-destructive bg-destructive text-destructive-foreground",
          variant === "soft" && "border-destructive/50 bg-destructive/10 text-destructive",
          size === "sm" && "p-3 text-sm",
          size === "lg" && "p-6 text-lg",
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-3">
          {showIcon && (
            <FailedIcon
              variant={variant === "filled" ? "default" : variant}
              size={size === "sm" ? "sm" : size === "lg" ? "lg" : "default"}
              animation="bounce"
              className="mt-0.5 flex-shrink-0"
            />
          )}
          <div className="flex-1 space-y-1">
            <div className="font-semibold leading-none tracking-tight">
              {title}
            </div>
            {description && (
              <div className="text-sm opacity-90">
                {description}
              </div>
            )}
          </div>
          {dismissible && onDismiss && (
            <button
              onClick={onDismiss}
              className="opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Dismiss"
            >
              <CrossIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    )
  }
)
ErrorAlert.displayName = "ErrorAlert"

// Error State Component (for forms, pages, etc.)
export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  size?: "sm" | "default" | "lg"
  showIcon?: boolean
}

const ErrorState: React.FC<ErrorStateProps> = ({
  className,
  title = "Something went wrong",
  description = "An error occurred while processing your request.",
  actionLabel = "Try again",
  onAction,
  size = "default",
  showIcon = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center space-y-4 p-8",
        size === "sm" && "space-y-3 p-6",
        size === "lg" && "space-y-6 p-12",
        className
      )}
      {...props}
    >
      {showIcon && (
        <FailedIcon
          variant="soft"
          size={size === "sm" ? "lg" : size === "lg" ? "xl" : "lg"}
          animation="bounce"
        />
      )}
      <div className="space-y-2">
        <h3 className={cn(
          "font-semibold text-destructive",
          size === "sm" && "text-base",
          size === "default" && "text-lg",
          size === "lg" && "text-xl"
        )}>
          {title}
        </h3>
        {description && (
          <p className={cn(
            "text-muted-foreground max-w-sm",
            size === "sm" && "text-sm",
            size === "lg" && "text-base max-w-md"
          )}>
            {description}
          </p>
        )}
      </div>
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

// Form Field Error Component
export interface FieldErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string
  show?: boolean
}

const FieldError: React.FC<FieldErrorProps> = ({
  className,
  message,
  show = true,
  ...props
}) => {
  if (!show || !message) return null

  return (
    <div
      role="alert"
      className={cn(
        "flex items-center gap-1.5 text-sm text-destructive animate-fade-in-up animate-shake",
        className
      )}
      {...props}
    >
      <FailedIcon size="sm" variant="default" animation="none" />
      <span>{message}</span>
    </div>
  )
}

// Export all components
export { 
  FailedIcon, 
  ErrorButton, 
  ErrorAlert, 
  ErrorState, 
  FieldError, 
  CrossIcon,
  failedVariants 
}

// Usage Examples:
/*
// Basic failed icon
<FailedIcon />

// Different variants
<FailedIcon variant="filled" />
<FailedIcon variant="outline" />
<FailedIcon variant="soft" />

// Different sizes and animations
<FailedIcon size="lg" animation="shake" />
<FailedIcon size="xl" animation="pulse" />

// Error button
<ErrorButton error={hasError} errorText="Upload Failed">
  Upload File
</ErrorButton>

// Error alert
<ErrorAlert
  title="Upload Failed"
  description="The file could not be uploaded. Please try again."
  dismissible
  onDismiss={() => setError(null)}
/>

// Error state for pages
<ErrorState
  title="Page Not Found"
  description="The page you're looking for doesn't exist."
  actionLabel="Go Home"
  onAction={() => navigate('/')}
/>

// Form field error
<FieldError message="Email is required" show={!!errors.email} />
*/

// Note: All animations are included in this file for Tailwind v4 compatibility
// No additional Tailwind config needed!