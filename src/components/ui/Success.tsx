import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

// Custom CSS animations for Tailwind v4
const successStyles = `
  @keyframes checkmark-draw {
    0% {
      stroke-dasharray: 0, 100;
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dasharray: 100, 0;
      stroke-dashoffset: 0;
    }
  }
  
  @keyframes circle-draw {
    0% {
      stroke-dasharray: 0, 150;
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dasharray: 150, 0;
      stroke-dashoffset: 0;
    }
  }
  
  @keyframes bounce-success {
    0% {
      transform: scale(0) rotate(-45deg);
      opacity: 0;
    }
    50% {
      transform: scale(1.2) rotate(-22.5deg);
      opacity: 0.8;
    }
    100% {
      transform: scale(1) rotate(0deg);
      opacity: 1;
    }
  }
  
  @keyframes pulse-success {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.8;
    }
  }
  
  @keyframes celebrate {
    0%, 100% {
      transform: scale(1) rotate(0deg);
    }
    25% {
      transform: scale(1.1) rotate(-5deg);
    }
    75% {
      transform: scale(1.1) rotate(5deg);
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
  
  @keyframes slide-in-right {
    0% {
      opacity: 0;
      transform: translateX(20px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 5px currentColor;
    }
    50% {
      box-shadow: 0 0 20px currentColor;
    }
  }
  
  @keyframes confetti {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(-100px) rotate(720deg);
      opacity: 0;
    }
  }
  
  .animate-checkmark-draw {
    animation: checkmark-draw 0.6s ease-out forwards;
  }
  
  .animate-circle-draw {
    animation: circle-draw 0.4s ease-out forwards;
  }
  
  .animate-bounce-success {
    animation: bounce-success 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  
  .animate-pulse-success {
    animation: pulse-success 2s ease-in-out infinite;
  }
  
  .animate-celebrate {
    animation: celebrate 0.6s ease-in-out;
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.5s ease-out forwards;
  }
  
  .animate-slide-in-right {
    animation: slide-in-right 0.5s ease-out forwards;
  }
  
  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }
  
  .animate-confetti {
    animation: confetti 1s ease-out forwards;
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
  
  .animate-delay-400 {
    animation-delay: 400ms;
  }
`

// Inject styles into document head
if (typeof document !== 'undefined') {
  const styleId = 'success-animations'
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = successStyles
    document.head.appendChild(style)
  }
}

// Success component variants
const successVariants = cva(
  "inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "text-green-600",
        outline: "border border-green-600 text-green-600 bg-background",
        filled: "bg-green-600 text-white",
        ghost: "text-green-600 hover:bg-green-50",
        soft: "bg-green-50 text-green-600",
        glow: "text-green-600 animate-glow",
      },
      size: {
        sm: "w-4 h-4",
        default: "w-6 h-6",
        lg: "w-8 h-8",
        xl: "w-12 h-12",
      },
      animation: {
        none: "",
        bounce: "animate-bounce-success",
        pulse: "animate-pulse-success",
        celebrate: "animate-celebrate",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "bounce",
    },
  }
)

// Checkmark Icon Component with Circle
const CheckmarkIcon: React.FC<{ 
  className?: string; 
  strokeWidth?: number;
  showCircle?: boolean;
  circleVariant?: "outline" | "filled" | "none";
}> = ({ 
  className, 
  strokeWidth = 2.5,
  showCircle = true,
  circleVariant = "outline"
}) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={strokeWidth}
  >
    {showCircle && circleVariant !== "none" && (
      <circle
        cx="12"
        cy="12"
        r="10"
        fill={circleVariant === "filled" ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={circleVariant === "filled" ? 0 : strokeWidth}
        className="animate-circle-draw"
        style={{
          strokeDasharray: '150',
          strokeDashoffset: '150'
        }}
        opacity={circleVariant === "filled" ? 0.1 : 1}
      />
    )}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 13l4 4L19 7"
      className="animate-checkmark-draw animate-delay-200"
      style={{
        strokeDasharray: '100',
        strokeDashoffset: '100'
      }}
    />
  </svg>
)

export interface SuccessIconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof successVariants> {
  /**
   * Custom checkmark stroke width
   */
  strokeWidth?: number
  /**
   * Show circle around checkmark
   */
  showCircle?: boolean
  /**
   * Circle style variant
   */
  circleVariant?: "outline" | "filled" | "none"
  /**
   * Screen reader text for accessibility
   */
  srText?: string
}

const SuccessIcon = React.forwardRef<HTMLDivElement, SuccessIconProps>(
  ({ 
    className, 
    variant, 
    size, 
    animation, 
    strokeWidth = 2.5, 
    showCircle = true,
    circleVariant = "outline",
    srText = "Success", 
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        role="img"
        aria-label={srText}
        className={cn(successVariants({ variant, size, animation }), className)}
        {...props}
      >
        <CheckmarkIcon 
          strokeWidth={strokeWidth} 
          showCircle={showCircle}
          circleVariant={circleVariant}
          className="w-full h-full" 
        />
        <span className="sr-only">{srText}</span>
      </div>
    )
  }
)
SuccessIcon.displayName = "SuccessIcon"

// Success Button Component
export interface SuccessButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  success?: boolean
  successText?: string
  iconSize?: "sm" | "default" | "lg"
  iconVariant?: "default" | "outline" | "filled" | "ghost" | "soft"
  showIcon?: boolean
}

const SuccessButton = React.forwardRef<HTMLButtonElement, SuccessButtonProps>(
  (
    {
      className,
      success = false,
      successText,
      iconSize = "sm",
      iconVariant = "default",
      showIcon = true,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          success 
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-primary text-primary-foreground hover:bg-primary/90",
          "h-10 px-4 py-2",
          className
        )}
        {...props}
      >
        {success && showIcon && (
          <SuccessIcon
            variant={iconVariant}
            size={iconSize}
            animation="bounce"
            className="text-current"
          />
        )}
        {success ? successText || "Success!" : children}
      </button>
    )
  }
)
SuccessButton.displayName = "SuccessButton"

// Success Alert Component
export interface SuccessAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  variant?: "default" | "outline" | "filled" | "soft"
  size?: "sm" | "default" | "lg"
  showIcon?: boolean
  onDismiss?: () => void
  dismissible?: boolean
  autoClose?: number
}

const SuccessAlert = React.forwardRef<HTMLDivElement, SuccessAlertProps>(
  (
    {
      className,
      title = "Success",
      description,
      variant = "soft",
      size = "default",
      showIcon = true,
      onDismiss,
      dismissible = false,
      autoClose,
      ...props
    },
    ref
  ) => {
    React.useEffect(() => {
      if (autoClose && onDismiss) {
        const timer = setTimeout(onDismiss, autoClose)
        return () => clearTimeout(timer)
      }
    }, [autoClose, onDismiss])

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative rounded-lg border p-4 animate-slide-in-right",
          variant === "default" && "border-green-200 text-green-800 bg-green-50",
          variant === "outline" && "border-green-600 text-green-600 bg-background",
          variant === "filled" && "border-green-600 bg-green-600 text-white",
          variant === "soft" && "border-green-200 bg-green-50 text-green-800",
          size === "sm" && "p-3 text-sm",
          size === "lg" && "p-6 text-lg",
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-3">
          {showIcon && (
            <SuccessIcon
              variant={variant === "filled" ? "ghost" : variant}
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
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    )
  }
)
SuccessAlert.displayName = "SuccessAlert"

// Success State Component
export interface SuccessStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  size?: "sm" | "default" | "lg"
  showIcon?: boolean
  showConfetti?: boolean
}

const SuccessState: React.FC<SuccessStateProps> = ({
  className,
  title = "Success!",
  description = "Your action was completed successfully.",
  actionLabel = "Continue",
  onAction,
  size = "default",
  showIcon = true,
  showConfetti = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center space-y-4 p-8 relative",
        size === "sm" && "space-y-3 p-6",
        size === "lg" && "space-y-6 p-12",
        className
      )}
      {...props}
    >
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "absolute w-2 h-2 rounded-full animate-confetti",
                i % 4 === 0 && "bg-green-500",
                i % 4 === 1 && "bg-blue-500",
                i % 4 === 2 && "bg-yellow-500",
                i % 4 === 3 && "bg-pink-500"
              )}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            />
          ))}
        </div>
      )}

      {showIcon && (
        <SuccessIcon
          variant="soft"
          size={size === "sm" ? "lg" : size === "lg" ? "xl" : "lg"}
          animation="celebrate"
          showCircle={true}
          circleVariant="filled"
        />
      )}
      
      <div className="space-y-2 animate-fade-in-up animate-delay-300">
        <h3 className={cn(
          "font-semibold text-green-700",
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
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-600 text-white hover:bg-green-700 h-10 px-4 py-2 animate-fade-in-up animate-delay-400"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

// Form Field Success Component
export interface FieldSuccessProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string
  show?: boolean
}

const FieldSuccess: React.FC<FieldSuccessProps> = ({
  className,
  message,
  show = true,
  ...props
}) => {
  if (!show || !message) return null

  return (
    <div
      role="status"
      className={cn(
        "flex items-center gap-1.5 text-sm text-green-600 animate-fade-in-up",
        className
      )}
      {...props}
    >
      <SuccessIcon 
        size="sm" 
        variant="default" 
        animation="bounce" 
        showCircle={false}
      />
      <span>{message}</span>
    </div>
  )
}

// Toast Success Component
export interface ToastSuccessProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  duration?: number
  onClose?: () => void
}

const ToastSuccess: React.FC<ToastSuccessProps> = ({
  className,
  title = "Success",
  description,
  duration = 4000,
  onClose,
  ...props
}) => {
  React.useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 max-w-sm rounded-lg border border-green-200 bg-white p-4 shadow-lg animate-slide-in-right",
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3">
        <SuccessIcon
          variant="soft"
          size="default"
          animation="bounce"
          className="mt-0.5 flex-shrink-0"
        />
        <div className="flex-1 space-y-1">
          <div className="font-semibold text-green-800 leading-none">
            {title}
          </div>
          {description && (
            <div className="text-sm text-green-700">
              {description}
            </div>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-green-600 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

// Export all components
export { 
  SuccessIcon, 
  SuccessButton, 
  SuccessAlert, 
  SuccessState, 
  FieldSuccess,
  ToastSuccess,
  CheckmarkIcon,
  successVariants 
}

// Usage Examples:
/*
// Basic success icon
<SuccessIcon />

// Different variants
<SuccessIcon variant="filled" />
<SuccessIcon variant="glow" />
<SuccessIcon variant="soft" showCircle={false} />

// Different sizes and animations
<SuccessIcon size="lg" animation="celebrate" />
<SuccessIcon size="xl" animation="pulse" />

// Success button
<SuccessButton success={isSuccess} successText="Saved Successfully">
  Save Changes
</SuccessButton>

// Success alert
<SuccessAlert
  title="Upload Complete"
  description="Your file has been uploaded successfully."
  dismissible
  onDismiss={() => setSuccess(false)}
  autoClose={5000}
/>

// Success state with confetti
<SuccessState
  title="Payment Complete!"
  description="Thank you for your purchase."
  actionLabel="Continue Shopping"
  onAction={() => navigate('/shop')}
  showConfetti={true}
/>

// Form field success
<FieldSuccess message="Email verified successfully" show={isValid} />

// Toast notification
<ToastSuccess
  title="Settings Saved"
  description="Your preferences have been updated."
  onClose={() => setShowToast(false)}
/>
*/

// Note: All animations are included in this file for Tailwind v4 compatibility
// No additional Tailwind config needed!