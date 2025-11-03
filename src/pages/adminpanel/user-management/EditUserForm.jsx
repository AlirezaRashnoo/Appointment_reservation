import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';

const users = [
  { id: 1, name: 'علی رضایی', role: 'dentist', phone: '09123456789', bio: 'متخصص ایمپلنت' },
  { id: 2, name: 'مریم احمدی', role: 'patient', phone: '09351234567', bio: 'بیمار جدید' },
];

export default function EditUserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = users.find((u) => u.id === parseInt(id));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
    },
  });

  const onSubmit = (data) => {
    console.log('اطلاعات جدید:', data);
    alert('اطلاعات با موفقیت ذخیره شد');
    navigate(`/admin/users/${id}`);
  };

  if (!user) {
    return <div className="p-6 text-center text-red-600">کاربر یافت نشد.</div>;
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">ویرایش اطلاعات کاربر</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl shadow-md p-6 space-y-4 max-w-xl mx-auto"
      >
        <div>
          <label className="block mb-1 font-medium text-gray-700">نام</label>
          <input
            {...register('name', { required: 'نام الزامی است' })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">شماره تماس</label>
          <input
            {...register('phone', {
              required: 'شماره تماس الزامی است',
              pattern: {
                value: /^09\d{9}$/,
                message: 'شماره معتبر نیست',
              },
            })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">بیوگرافی</label>
          <textarea
            {...register('bio')}
            rows={3}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          ذخیره تغییرات
        </button>
      </form>
    </div>
  );
}
