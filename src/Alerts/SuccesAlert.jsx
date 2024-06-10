import React from 'react'
import Swal from 'sweetalert2'
function SuccesAlert({icon , title , message , btnColor}) {
  Swal.fire({
    title: title,
    text: message,
    icon: icon,
    confirmButtonColor: btnColor
  });
}

export default SuccesAlert