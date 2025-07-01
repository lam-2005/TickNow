import { useContext, createContext } from "react";
import { toast } from "react-toastify";
type ToastContextType = {
  toastTextSuccess: string;
  createToastSuccess: (text: string) => void;
  toastTextError: string;
  createToastError: (text: string) => void;
};
const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const createToastSuccess = (text: string) => {
    toast.success(text);
  };

  const createToastError = (text: string) => {
    toast.error(text);
  };

  return (
    <ToastContext.Provider
      value={{
        toastTextSuccess: "",
        createToastSuccess,
        toastTextError: "",
        createToastError,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
