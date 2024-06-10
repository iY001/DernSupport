import React from 'react'
import Swal from 'sweetalert2'

function Toast(icon , title) {
  console.log(icon , title)

  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  return Toast.fire({
    icon: icon,
    title: title 
  });
}

export default Toast