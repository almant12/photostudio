import { createContext, useState, useContext, ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react"; // Example icon from lucide-react

interface AlertContextProps {
  showAlert: (message: string) => void;
  hideAlert: () => void;
  alertMessage: string;
  isVisible: boolean;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (message: string) => {
    setAlertMessage(message);
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Hide after 3 seconds
  };

  const hideAlert = () => {
    setIsVisible(false);
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert, alertMessage, isVisible }}>
      {children}
    </AlertContext.Provider>
  );
};
