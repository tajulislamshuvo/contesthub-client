import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import { toast } from 'react-toastify';
import { IoMdEyeOff } from 'react-icons/io';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  }


  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const { signInUser, handleForgetPass } = useAuth();
  const handleLogin = (data) => {
    signInUser(data.email, data.password).then((result) => {

      toast.success('Login successfull')
      navigate(location?.state || '/')

    }).catch(err => {
      toast.error('Password is incorrect')
      console.log(err)
    })
  }


  // forget password
  const handleResetPass = () => {
    const email = getValues('email');

    if (!email) {
      toast.error('Please enter your email first');
      return;
    }

    handleForgetPass(email)
      .then(() => {

        toast('Check Your Email');
      }).catch((error) => {
        // console.log(error);
        toast.error(error.message)
      })
  }


  return (
    <div>
      <div className="flex justify-center min-h-[calc(100vh-200px)] items-center p-6">
        <div className='card bg-base-100 w-full mx-auto max-w-sm shadow-2xl py-5'>
          <h3 className='text-3xl font-bold text-center'>Welcome back</h3>
          <p className='text-center'>Please login</p>
          <div className='card-body'>
            <form onSubmit={handleSubmit(handleLogin)}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                {errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>}


                <label className="label">Password</label>
                <div className='relative'>
                  <input type={click ? 'text' : 'password'} {...register('password', { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ })} className="input" placeholder="Password" />

                  <div onClick={handleClick} className='absolute top-4 right-7 cursor-pointer'>
                    {
                      click ? <IoMdEyeOff size={15} /> : <MdOutlineRemoveRedEye size={15}></MdOutlineRemoveRedEye>
                    }

                  </div>
                </div>
                {errors.password?.type === 'requires' && <p className='text-red-500'>Password is required</p>}
                {errors.password?.type === 'pattern' && <p className='text-red-500'>Password must have with at least 8 charecter, at least one uppercase , at least one lowercase at least one number , and at least
                  one special characters </p>}



                <div><button type='button' onClick={handleResetPass} className="link link-hover">Forgot password?</button></div>
                <button className="btn btn-neutral mt-4">Login</button>
              </fieldset>
              <p>New to contestHub? <Link state={location.state} className='text-red-400' to='/register'>Register</Link></p>
            </form>
            <SocialLogin></SocialLogin>
          </div>
        </div>

      </div>
    </div >
  );
};

export default Login;