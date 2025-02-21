import { ToastProvider, ToastViewport } from "./ToastProvider"
import { Toast } from "./Toast"
import { ToastAction } from "./ToastAction"
import { ToastClose } from "./ToastClose"
import { ToastTitle } from "./ToastTitle"
import { ToastDescription } from "./ToastDescription"

export type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>
export type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
