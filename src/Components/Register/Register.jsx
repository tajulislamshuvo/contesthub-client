import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import { IoMdEyeOff } from 'react-icons/io';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleClick = () => {
    setClick(!click);
  }


  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser, setUser, updateUser } = useAuth();

  const handleRegistration = (data) => {
    registerUser(data.email, data.password)
      .then(result => {

        const userInfo = {
          email: data.email,
          displayName: data.name,
          photoUrl: data.photo,
          password: data.password
        }
        axiosSecure.post('/users', userInfo)
          .then(res => {
            if (res.data.insertedId) {
              console.log('user created successfully in database')
            }
          })
        const user1 = result.user
        updateUser({ displayName: data.name, photoURL: data.photo }).then(() => {
          setUser({ ...user1, displayName: data.name, photoURL: data.photo });
        }).catch((err) => {
          console.log(err.message);
          setUser(user1)

        })
        toast.success('Registered Successfully');
        navigate(location.state || '/')

      }).catch(error => {
        toast.error(error.message)
        console.log(error)
      })
  }

  return (
    <div className="flex justify-center min-h-[calc(100vh-200px)] items-center p-4">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h2 className="font-semibold text-2xl text-center">
            Register your account
          </h2>
          <form onSubmit={handleSubmit(handleRegistration)}>
            <fieldset className="fieldset">

              <label className="label">Name</label>
              <input type="text" {...register('name', { required: true })} className="input" placeholder="Your Name" />
              {errors.name?.type === 'required' && <p className='text-red-500'>Name is required</p>}


              <label className="label">Photo URL</label>
              <input type="text" {...register('photo')} className="input" placeholder="Your photo url" />



              <label className="label">Email</label>
              <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
              {errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>}

              {/* password */}
              <label className="label">Password</label>
              <div className='relative'>
                <input type={click ? 'text' : 'password'} {...register('password', { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ })} className="input" placeholder="Password" />
                <div onClick={handleClick} className='absolute top-4 right-7 cursor-pointer'>
                  {
                    click ? <IoMdEyeOff size={15} /> : <MdOutlineRemoveRedEye size={15}></MdOutlineRemoveRedEye>
                  }

                </div>
              </div>


              {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}

              {errors.password?.type === 'pattern' && <p className='text-red-500'>Password must have with at least 8 charecter, at least one uppercase , at least one lowercase at least one number , and at least
                one special characters </p>}


              <div><a className="link link-hover">Forgot password?</a></div>
              <button className="btn btn-neutral mt-4">Register</button>

              <SocialLogin></SocialLogin>
              <p className="font-semibold text-center pt-5">
                Allready Have An Account ?{" "}
                <Link className="text-secondary" to="/login">
                  Login
                </Link>
              </p>

            </fieldset>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Register;