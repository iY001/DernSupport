/**
 * Toast Notification Component
 * Modern, professional toast notifications using SweetAlert2
 * 
 * Usage:
 * import Toast from './Toast';
 * Toast('success', 'Operation completed successfully!');
 * Toast('error', 'An error occurred');
 */

import React from 'react';
import Swal from 'sweetalert2';

const Toast = (icon = 'info', title = 'Notification') => {
  const toastConfig = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
    customClass: {
      container: 'custom-toast-container',
      popup: 'custom-toast-popup',
      title: 'custom-toast-title',
    },
  });

  return toastConfig.fire({
    icon,
    title,
  });
};

export default Toast;
