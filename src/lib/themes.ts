export type ThemeMode = "light" | "dark" | "system";

export const themes = {
  light: {
    background: "bg-white",
    text: "text-gray-900",
    border: "border-gray-200",
    input: "bg-white border-gray-300",
    primary: {
      background: "bg-blue-600",
      text: "text-white",
      hover: "hover:bg-blue-700",
    },
    secondary: {
      background: "bg-gray-100",
      text: "text-gray-900",
      hover: "hover:bg-gray-200",
    },
    destructive: {
      background: "bg-red-600",
      text: "text-white",
      hover: "hover:bg-red-700",
    },
  },
  dark: {
    background: "bg-gray-900",
    text: "text-gray-100",
    border: "border-gray-700",
    input: "bg-gray-800 border-gray-600",
    primary: {
      background: "bg-blue-600",
      text: "text-white",
      hover: "hover:bg-blue-700",
    },
    secondary: {
      background: "bg-gray-800",
      text: "text-gray-100",
      hover: "hover:bg-gray-700",
    },
    destructive: {
      background: "bg-red-600",
      text: "text-white",
      hover: "hover:bg-red-700",
    },
  },
};
