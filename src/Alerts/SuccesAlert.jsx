/**
 * Success Alert Component
 * Professional alert dialogs using SweetAlert2
 * 
 * Usage:
 * import SuccessAlert from './SuccesAlert';
 * SuccessAlert({
 *   icon: 'success',
 *   title: 'Success!',
 *   message: 'Operation completed successfully',
 *   btnColor: '#4ECDC4'
 * });
 */

import React from 'react';
import Swal from 'sweetalert2';

const SuccessAlert = ({
  icon = 'success',
  title = 'Success',
  message = 'Operation completed successfully',
  btnColor = '#4ECDC4',
}) => {
  Swal.fire({
    title,
    text: message,
    icon,
    confirmButtonColor: btnColor,
    customClass: {
      container: 'custom-alert-container',
      popup: 'custom-alert-popup',
      title: 'custom-alert-title',
      confirmButton: 'custom-alert-button',
    },
    allowOutsideClick: true,
    allowEscapeKey: true,
  });
};

export default SuccessAlert;
