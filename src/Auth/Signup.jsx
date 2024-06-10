import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthLayout'
import Toast from '../Alerts/Toast'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

function Signup() {
  const [formData, setFormData] = useState({})
  const { isAuthenticated, Signup } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if(isAuthenticated){
      navigate('/home')
    }
  }, [])
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      console.log(formData)
      Signup(formData)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      
      <div className='w-full h-screen flex lg:flex-row flex-col-reverse justify-between items-center'>
        <form onSubmit={handleSubmit} className='w-full h-full relative flex flex-col justify-center items-center' style={{ background: "linear-gradient(40deg, rgba(232,226,226,1)  35%, rgba(108,195,246,1) 92%)" }}>
          <section className='lg:min-w-[450px] md:w-1/2 w-full lg:h-[600px] md:h-[600px] h-full bg-white p-4 flex flex-col  items-center rounded-2xl box-shadow ring-4 ring-primary ring-opacity-45'>
            <div className='h-1/6 flex flex-col gap-5'>
              {/* <img src="assets/Logo.png" className='w-fit h-20 mx-auto' alt="logo" /> */}
              <h1 className='h-full flex flex-col justify-center text-3xl font-bold text-black'>
                Register
              </h1>
            </div>
            <div className='w-fit h-1/2 flex flex-col items-center gap-4 mt-8'>
              <InputComponent  label={"Username"} name={"name"} formData={formData} setFormData={setFormData} placeholder={"Enter your username"}/>
              <InputComponent  label={"Email"} name={"email"} formData={formData} setFormData={setFormData} placeholder={"Enter your email"}/>
              <InputComponent  label={"Password"} name={"password"} formData={formData} setFormData={setFormData} placeholder={"Enter your password"} show={true}/>
            </div>
            <div className='w-fit h-1/3 flex flex-col items-center gap-4 mt-8'>
              <hr />
              <button type='submit' className='lg:w-96 md:w-80 w-80 h-12 rounded-[4px] px-4 bg-white hover:bg-opacity-85 text-primary ring-2 ring-primary ring-opacity-30 hover:bg-primary hover:text-white font-semibold duration-300 '>Sign Up</button>
              <div>
                
                <Link to={"/signin"} className='flex w-full font-bold text-primary hover:underline hover:cursor-pointer'>Already Have An Account ?</Link>
              </div>
            </div>
          </section>
        </form>

      </div>
    </>
  )
}

const InputComponent = ({ label, name, formData, setFormData, placeholder, show = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className="relative h-16 w-full lg:min-w-[400px] md:min-w-[330px] min-w-[330px] shadow-b-xl">
        <input placeholder={placeholder}
          name={name}
          onChange={handleInputChange}
          type={show === true && !showPassword ? "password" : "text"}
          className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-primary focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
        {
          show === true &&
          <span className='absolute right-0 top-6 flex items-center text-sm gap-1 cursor-pointer shadow-b-xl' onClick={() => setShowPassword(!showPassword)}> {showPassword ? <IoMdEyeOff /> : <IoMdEye />}{showPassword ? "Hide" : "Show"}</span>
        }
        <label
          className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[13px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-primary after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-primary peer-focus:after:scale-x-100 peer-focus:after:border-primary peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          {label}
        </label>
      </div>
    </>
  )
}

export default Signup

