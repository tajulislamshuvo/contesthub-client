import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';


const AddContest = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { register, handleSubmit, reset, formState: { errors }, } = useForm();
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    if (user?.email) {
      reset({
        creatorEmail: user.email,
      });
    }
  }, [user, reset]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleAddContest = (data) => {
    console.log(data, startDate, endDate);
    const profileImg = data.photo[0];
    const formData = new FormData();
    formData.append('image', profileImg);
    const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

    axios.post(image_API_URL, formData)
      .then(res => {
        console.log('after image upload ', res.data.data.url);
        const photoURL = res.data.data.url;

        const contestData = {
          name: data.name,
          image: photoURL,
          description: data.description,
          creatorEmail: data.creatorEmail,
          price: Number(data.price),
          prize: Number(data.prize),
          instruction: data.instruction,
          type: data.type,
          startTime: startDate,
          endTime: endDate,
          status: 'pending',
          createdAt: new Date(),
          participantsCount: Number(0),
        }
        axiosSecure.post('/contests', contestData)
          .then(res => {
            if (res.data.insertedId) {
              reset();
              toast.success('Contest added successfully');
              navigate('/dashboard/my-contest')

            }
          }).catch(err => {
            toast.error(err.message);
          })

        console.log(contestData);

      }).catch(err => {
        console.log(err.message)
      })

  }
  return (
    <div>
      <h2 className='text-3xl mb-2.5 font-bold text-center'>Add your contest</h2>





      <div className='card bg-base-100 w-full max-w-4xl mx-auto shadow-xl py-5'>
        <form className='card-body' onSubmit={handleSubmit(handleAddContest)}>
          <fieldset className="fieldset">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Left Column */}
              <div className="space-y-4">
                {/* Creator email */}
                <div>
                  <label className="label">Creator email</label>
                  <input
                    // defaultValue={user?.email || ''}
                    // value={user?.email || ''}
                    type="email"
                    {...register('creatorEmail')}
                    className="input input-bordered w-full"
                    placeholder="Creator email"

                  />
                </div>

                {/* Contest name */}
                <div>
                  <label className="label">Contest name</label>
                  <input
                    type="text"
                    {...register('name', { required: true })}
                    className="input input-bordered w-full"
                    placeholder="Contest name"
                  />
                  {errors.name?.type === 'required' && <p className='text-red-500 text-sm mt-1'>Contest name is required</p>}
                </div>

                {/* Image */}
                <div>
                  <label className="label">Image</label>
                  <input
                    type="file"
                    {...register('photo', { required: true })}
                    className="file-input file-input-bordered w-full"
                  />
                  {errors.photo?.type === 'required' && <p className='text-red-500 text-sm mt-1'>Image is required</p>}
                </div>

                {/* Entry fee */}
                <div>
                  <label className="label">Entry fee</label>
                  <input
                    type="number"
                    {...register('price')}
                    className="input input-bordered w-full"
                    placeholder="Entry fee"
                  />
                </div>

                {/* Prize money */}
                <div>
                  <label className="label">Prize money</label>
                  <input
                    type="number"
                    {...register('prize')}
                    className="input input-bordered w-full"
                    placeholder="Prize money"
                  />
                </div>

                {/* Contest type */}
                <div>
                  <label className="label">Contest type</label>
                  <input
                    type="text"
                    {...register('type')}
                    className="input input-bordered w-full"
                    placeholder="Contest type"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Task description */}
                <div>
                  <label className="label">Task description</label>
                  <textarea
                    {...register('description', { required: true })}
                    className="textarea textarea-bordered w-full h-32"
                    placeholder="Description"
                  ></textarea>
                  {errors.description?.type === 'required' && <p className='text-red-500 text-sm mt-1'>Description is required</p>}
                </div>

                {/* Task instruction */}
                <div>
                  <label className="label">Task instruction</label>
                  <textarea
                    {...register('instruction')}
                    className="textarea textarea-bordered w-full h-32"
                    placeholder="Task instruction"
                  ></textarea>
                </div>

                {/* Start time */}
                <div>
                  <label className="label mr-1.5">Start time</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="input input-bordered w-full px-4 py-2 cursor-pointer"
                    showTimeSelect
                    // timeFormat="HH:mm"
                    dateFormat="Pp"
                    placeholderText="Select start date and time"
                  />
                </div>

                {/* End time */}
                <div>
                  <label className="label mr-1.5">End time</label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    className="input input-bordered w-full px-4 py-2 cursor-pointer"
                    showTimeSelect
                    // timeFormat="HH:mm"
                    dateFormat="Pp"
                    placeholderText="Select end date and time"
                  />
                </div>
              </div>
            </div>

            {/* Submit button - full width, centered */}
            <div className="mt-8 text-center">
              <button type="submit" className='btn btn-primary btn-wide'>
                Create Contest
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default AddContest;