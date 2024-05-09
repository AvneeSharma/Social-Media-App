import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import TextInput from './TextInput';
import Loading from './Loading';
import CustomButton from './CustomButton';
import { UpdateProfile } from '../redux/userSlice';
import { handleFileUpload } from '../utils';
import { apiRequest } from '../utils';
import { UserLogin } from '../redux/userSlice';

const EditProfile = () => {

    const {user} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [errMsg, setErrMsg] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [picture , setPicture] = useState(null);

    const {register, handleSubmit, formState: {errors}} = useForm({ mode: onchange, defaultValues: {...user}});

    const onSubmit = async(data) => {
        setIsSubmitting(true);
        setErrMsg("");
        try {
            const uri = picture && (await handleFileUpload(picture));
            const {firstName, lastName, location, profession} = data;

            const res = await apiRequest({
                url: "/users/update-user",
                data: {
                    firstName,
                    lastName,
                    location,
                    profession,
                    //profileUrl: uri ? uri : user?.profileUrl
                },
                method: "PUT",
                token: user?.token
              });

              if(res?.status === "failed"){
                setErrMsg(res);
              } else {
                setErrMsg(res);
                const newUser = {token: res?.token, ...res?.user};
                dispatch(UserLogin(newUser));
                setTimeout(() => {
                    dispatch(UpdateProfile(false));
                }, 3000);
              }
              setIsSubmitting(false);

        } catch (error) {
            console.log(error);
            setIsSubmitting(false);
        }
    };

    const handleClose =() => {
        dispatch(UpdateProfile(false));
    };
    const handleSelect = (e) => {
        setPicture(e.target.files[0]);
    };

  return (
    <>
        <div className='fixed z-50 inset-0 overflow-y-auto'>
            <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                <div className='fixed inset-0 transition-opacity'>
                    <div className='absolute inset-0 bg-[#000] opacity-70'></div>
                </div>
                <span className='hidden sm:inline-block sm:align-middle sm:h-screen'></span>
                &#8203;

                <div className='inline-block align-bottom bg-primary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full' role='dialog' aria-modal="true" aria-labelledby='modal-headline'>
                    <div className='flex justify-between px-6 pt-5 pb-2'>
                        <label htmlFor='name' className='block font-medium text-xl text-ascent-1 text-left'>
                            Edit Profile
                        </label>

                        <button className='text-ascent-1' onClick={handleClose}>
                            <MdClose size={22} />
                        </button>
                    </div>

                    <form className='px-4 sm:px-6 flex flex-col gap-3 2xl:gap-6' onSubmit={handleSubmit(onSubmit)}>
                        <TextInput
                        name="firstName" placeholder="First Name" label="First Name" type="text" register={
                        register("firstName", {
                        required: "First Name is required"
                        })}
                        styles= "w-full"
                        error= {errors.firstName ? errors.firstName?.message: ""}
                        />

                        <TextInput
                        name="lastName" placeholder="Last Name" label="Last Name" type="text" register={
                        register("lastName", {
                        required: "Last Name is required"
                        })}
                        styles= "w-full"
                        error= {errors.lastName ? errors.lastName?.message: ""}
                        />

                        <TextInput
                        name="profession" placeholder="Profession" label="Profession" type="text" register={
                        register("profession", {
                        required: "Profession is required"
                        })}
                        styles= "w-full"
                        error= {errors.profession ? errors.profession?.message: ""}
                        />

                        <TextInput
                        name="location" placeholder="Location" label="Location" type="text" register={
                        register("location", {
                        required: "Location do not match"
                        })}
                        styles= "w-full"
                        error= {errors.location ? errors.location?.message: ""}
                        />

                        <label className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4' htmlFor='imgUpload'>
                            <input type='file' onChange={(e) => handleSelect(e)} className='' id='imgUpload' accept='.jpg, .png, .jpeg' />
                        </label>

                        {
                            errMsg?.message && (
                            <span role='alert' className={`text-sm ${errMsg?.status == 'failed' ? "text-[#f64949fe]" : 'text-[#2ba150fe]'} mt-0.5`}>
                                {errMsg?.message}
                            </span>
                        )}

                        <div className='py-5 sm:flex sm:flex-row-reverse border-t border-[#66666645]'>
                            {
                                isSubmitting ? <Loading /> : <CustomButton type="submit" containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`} title="Submit" />
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default EditProfile
