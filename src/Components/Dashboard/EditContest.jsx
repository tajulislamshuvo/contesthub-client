import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../Spinner/Spinner';

const EditContest = () => {
  const { id } = useParams();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);



  const { data: contest, isLoading } = useQuery({
    queryKey: ['contest', id, 'edit'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      return res.data;
    }
  })


  useEffect(() => {
    if (contest) {
      setStartDate(new Date(contest.startTime));
      setEndDate(new Date(contest.endTime));
    }
  }, [contest]);


  const handleEditContest = async (data) => {
    try {
      let photoURL = null;

      // ✅ Upload image only if selected
      if (data.photo && data.photo.length > 0) {
        const formData = new FormData();
        formData.append('image', data.photo[0]);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
        const imgRes = await axios.post(image_API_URL, formData);

        photoURL = imgRes.data.data.url;
      }

      // ✅ Build update object
      const contestEditedData = {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        prize: Number(data.prize),
        instruction: data.instruction,
        type: data.type,
        startTime: startDate || contest.startTime,
        endTime: endDate || contest.endTime,
        status: 'pending',
        updatedAt: new Date(),
        image: `${photoURL ? photoURL : contest.image}`
      };

      // ✅ Only add image if uploaded
      if (photoURL) {
        contestEditedData.image = photoURL;
      }

      const res = await axiosSecure.patch(
        `/contests/edit/${id}`,
        contestEditedData
      );

      if (res.data.modifiedCount) {
        toast.success('Contest edited successfully');
        navigate('/dashboard/my-contest')
      }
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    }
  };


  if (isLoading) {
    return <Spinner></Spinner>
  }



  return (
    <div>
      <h2 className='text-3xl mb-2.5 font-bold text-center'>Edit your contest</h2>

      <div className='card bg-base-100 w-full max-w-4xl mx-auto shadow-xl py-5'>
        <form onSubmit={handleSubmit(handleEditContest)} className='card-body'>
          <fieldset className="fieldset">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Left Column */}
              <div className="space-y-4">
                {/* Creator email */}


                {/* Contest name */}
                <div>
                  <label className="label">Contest name</label>
                  <input
                    defaultValue={contest.name}
                    type="text"
                    {...register('name')}
                    className="input input-bordered w-full"
                    placeholder="Contest name"
                  />

                </div>

                {/* Image */}
                <div>
                  <label className="label">Image</label>
                  <input
                    type="file"

                    {...register('photo')}
                    className="file-input file-input-bordered w-full"
                  />

                </div>

                {/* Entry fee */}
                <div>
                  <label className="label">Entry fee</label>
                  <input
                    defaultValue={contest.price}
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
                    defaultValue={contest.prize}
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
                    defaultValue={contest.type}
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
                    defaultValue={contest.description}
                    {...register('description')}
                    className="textarea textarea-bordered w-full h-32"
                    placeholder="Description"
                  ></textarea>

                </div>

                {/* Task instruction */}
                <div>
                  <label className="label">Task instruction</label>
                  <textarea
                    defaultValue={contest.instruction}
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
                Edit Contest
              </button>
            </div>
          </fieldset>
        </form>
      </div>

    </div>
  );
};

export default EditContest;