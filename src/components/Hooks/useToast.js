// src/hooks/useToast.js
import { toast } from 'react-hot-toast';

export const useToast = () => {
  const showSuccess = (message) => {
    toast.success(message);
  };

  const showError = (message) => {
    toast.error(message);
  };
  
  const showLoading = (message) => {
    return toast.loading(message);
  };

  const dismissToast = (toastId) => {
    toast.dismiss(toastId);
  };
  
  const showToast = (message) => {
    toast(message);
  };

  return { showSuccess, showError, showLoading, dismissToast, showToast };
};