import { useEffect } from "react";
import styles from "./Alert.module.sass";

interface AlertProps {
  message: string;
  type: "success" | "warning" | "error";
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.alert} ${styles[type]}`} onClick={onClose}>
      {message}
    </div>
  );
};

export default Alert;
