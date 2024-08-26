import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import ApiUrl from '../config/ApiUrl';
import Toast from '../Alerts/Toast';
import { useAuth } from './../Auth/AuthLayout';
import { useNavigate } from 'react-router-dom';

function Settings() {
  const { id , role } = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : {id : "" , role : ""};
  const [AdminChecked, setAdminChecked] = useState(role === "admin" ? true : false);
  const {logout} = useAuth();
  const navigate = useNavigate();
  if(role !== "admin"){
    const showModel = () => {
      Swal.fire({
        title: "Submit The Secret Code",
        input: "text",
        inputAttributes: {
          autocapitalize: "off"
        },
        confirmButtonColor: "#3b82f6",
        showCancelButton: true,
        confirmButtonText: "Submit",
        showLoaderOnConfirm: true,
        preConfirm: async (inputValue) => {
          try {
            const secretCode = process.env.REACT_APP_SECRET_CODE;
            if (inputValue === secretCode) {
              const res = await ApiUrl.post(`/user/makeadmin/${id}`);
              // Handle success
              if(res.status === 200 || res.status === 201){
                setAdminChecked(true);
              }
              Swal.fire({
                icon: "success",
                title: "Done",
                text: "You have been made an admin",
              });
              localStorage.setItem("user", JSON.stringify({ ...JSON.parse(localStorage.getItem("user")), role: "admin" }));
            } else {
              throw new Error("Invalid secret code");
            }
          } catch (error) {

            setAdminChecked(false);
            Swal.showValidationMessage(`
              Request failed: ${error.response?.data || error.message}
            `);
          }
        },
        
        allowOutsideClick: () => !Swal.isLoading()
      });
    };
    if(AdminChecked === true){    
    showModel();
  }
  }

  if(role === "admin"){
    // Are you want to remove the admin privilege
    const showModel = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to remove admin privilege?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, remove it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await ApiUrl.put(`/user/removeadmin/${id}`);
            if (res.status === 200 || res.status === 201) {
              setAdminChecked(false);
            }
            localStorage.setItem("user", JSON.stringify({ ...JSON.parse(localStorage.getItem("user")), role: "user" }));
            Toast("success", res?.data?.message || 'Admin privilege removed successfully');
          } catch (error) {
            setAdminChecked(true);
            Toast("error", error?.response?.data?.message || 'Something went wrong');
          }
        }
      });
    }
    if(AdminChecked === false) {
      showModel();
    }
  }

  return (
    <>
    <div className='w-full h-[60vh]'>
    <div className='w-[85%] mx-auto bg-gray-100 rounded-lg shadow-sm border-[2px] pb-4 my-10'>
      <h1 className='text-2xl text-primary py-4 text-center uppercase'>Settings</h1>
      <hr className='border shadow-b-lg'/>
      <SwitchButton operation={'Admin'} helperText={role === "admin" ?  "Your Account Already An Admin":'Make yourself an admin'} isChecked={AdminChecked} setIsChecked={setAdminChecked} role={role}/>
    </div>
    </div>

    </>
  )
}
const SwitchButton = ({ operation , isChecked , setIsChecked , helperText , role}) => {

  const toggleSwitch = () => {
    setIsChecked(prev => !prev);
  };

  return (
    <div className='w-full flex justify-between items-center mt-4 px-8'>
      <section>
        <h1>
        {operation}
        </h1>
        <p className='text-sm text-gray-600'>{helperText}</p>
      </section>
      <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" onClick={toggleSwitch} checked={isChecked}/>
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300  dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
      </label>

    </div>
  );
};

export default Settings