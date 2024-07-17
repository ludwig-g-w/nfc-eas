import {
  AlertCircle,
  CheckCircle,
  LucideIcon,
  XCircle,
  Check,
  Sun,
  Moon,
} from "lucide-react-native";
import { cssInterop } from "nativewind";

function interopIcon(icon: LucideIcon) {
  cssInterop(icon, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
}

interopIcon(AlertCircle);
interopIcon(CheckCircle);
interopIcon(XCircle);
interopIcon(Check);
interopIcon(Sun);
interopIcon(Moon);

export { AlertCircle, CheckCircle, XCircle, Check, Sun, Moon };
