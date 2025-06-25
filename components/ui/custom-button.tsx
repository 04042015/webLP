import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const customButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        // Gradient variants - Updated dengan warna LangsaPost
        gradient:
          "bg-gradient-to-r from-langsapost-500 to-langsapost-600 text-white hover:from-langsapost-600 hover:to-langsapost-700 shadow-lg hover:shadow-xl",
        "gradient-success":
          "bg-gradient-to-r from-success-500 to-success-600 text-white hover:from-success-600 hover:to-success-700 shadow-lg hover:shadow-xl",
        "gradient-warning":
          "bg-gradient-to-r from-warning-500 to-warning-600 text-white hover:from-warning-600 hover:to-warning-700 shadow-lg hover:shadow-xl",
        "gradient-danger":
          "bg-gradient-to-r from-danger-500 to-danger-600 text-white hover:from-danger-600 hover:to-danger-700 shadow-lg hover:shadow-xl",

        // Neon variants - Updated dengan warna LangsaPost
        neon: "bg-langsapost-500 text-white border-2 border-langsapost-400 shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:shadow-[0_0_30px_rgba(239,68,68,0.8)] hover:bg-langsapost-600",
        "neon-accent":
          "bg-accent-500 text-white border-2 border-accent-400 shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:shadow-[0_0_30px_rgba(249,115,22,0.8)] hover:bg-accent-600",

        // Glass morphism
        glass: "bg-white/20 backdrop-blur-md border border-white/30 text-gray-800 hover:bg-white/30 shadow-lg",
        "glass-dark": "bg-black/20 backdrop-blur-md border border-white/20 text-white hover:bg-black/30 shadow-lg",

        // 3D effect - Updated dengan warna LangsaPost
        "3d": "bg-langsapost-500 text-white shadow-[0_6px_0_#b91c1c] hover:shadow-[0_4px_0_#b91c1c] hover:translate-y-[2px] active:shadow-[0_2px_0_#b91c1c] active:translate-y-[4px]",
        "3d-success":
          "bg-success-500 text-white shadow-[0_6px_0_#15803d] hover:shadow-[0_4px_0_#15803d] hover:translate-y-[2px] active:shadow-[0_2px_0_#15803d] active:translate-y-[4px]",

        // Rounded variants - Updated dengan warna LangsaPost
        pill: "bg-langsapost-500 text-white hover:bg-langsapost-600 rounded-full px-8",
        "pill-outline":
          "border-2 border-langsapost-500 text-langsapost-500 hover:bg-langsapost-500 hover:text-white rounded-full px-8",

        // Standard variants - Updated dengan warna LangsaPost
        default: "bg-langsapost-500 text-white hover:bg-langsapost-600",
        destructive: "bg-danger-500 text-white hover:bg-danger-600",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary-200 text-secondary-800 hover:bg-secondary-300",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-langsapost-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
      },
      shape: {
        default: "rounded-md",
        square: "rounded-none",
        rounded: "rounded-lg",
        pill: "rounded-full",
        circle: "rounded-full aspect-square",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
    },
  },
)

export interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof customButtonVariants> {
  asChild?: boolean
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, variant, size, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(customButtonVariants({ variant, size, shape, className }))} ref={ref} {...props} />
  },
)
CustomButton.displayName = "CustomButton"

export { CustomButton, customButtonVariants }
