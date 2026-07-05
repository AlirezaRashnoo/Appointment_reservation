
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import VipCart from "@/component/VipCart";
import Header from "@/component/Header";
import Button from "@/component/Button";
import { FaCircleUser } from "react-icons/fa6";
import Footer from "@/component/Footer";
import MenuMobile from "@/component/MenuMobile";
import { useState, useMemo } from "react";

const api = axios.create({
  baseURL: 'https://dentist-reyn.onrender.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const DentistSkeleton = () => (
  <VipCart>
    <div className="animate-pulse">
      <div className="flex items-center gap-x-5 px-3 pt-2 mb-4">
        <div className="relative w-[115px] h-[115px] flex-shrink-0">
          <div className="absolute inset-0 w-full h-full bg-gray-200 rounded-full"></div>
          <div className="absolute inset-0 w-[70%] h-[70%] m-auto bg-gray-300 rounded-full"></div>
        </div>
        <div className="text-center flex-1">
          <div className="h-4 bg-gray-200 rounded w-24 mb-3 mx-auto"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-20 mx-auto"></div>
            <div className="h-3 bg-gray-200 rounded w-28 mx-auto"></div>
          </div>
        </div>
      </div>
      <div className="relative -bottom-6 bg-gray-100 h-14 p-4">
        <div className="flex items-center justify-between">
          <div className="h-3 bg-gray-200 rounded w-32"></div>
          <div className="h-8 bg-gray-200 rounded-xl w-20"></div>
        </div>
      </div>
    </div>
  </VipCart>
);

const ErrorState = ({ error, onRetry }) => (
  <div className="text-center py-12 px-4">
    <div className="bg-red-50 rounded-2xl p-8 max-w-md mx-auto">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 className="text-lg font-medium text-red-800 mb-2">خطا در دریافت اطلاعات</h3>
      <p className="text-sm text-red-600 mb-4">
        {error?.response?.data?.message || error?.message || 'خطای ناشناخته'}
      </p>
      <Button 
        onClick={onRetry}
        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
      >
        تلاش مجدد
      </Button>
    </div>
  </div>
);

const fetchDentists = async () => {
  try {
    const response = await api.get('/api/v1/dentist/all?limit=10&page=1&orderBy=averageRating');
    return response.data;
  } catch (error) {
    console.error('Error fetching dentists:', error);
    throw error;
  }
};

const formatDentistName = (dentist) => {
  if (dentist.firstName || dentist.lastName) {
    return `${dentist.firstName || ''} ${dentist.lastName || ''}`.trim();
  }
  return 'دندانپزشک';
};

const formatSpecialty = (dentist) => {
  return dentist.specialization || dentist.occupation || 'عمومی';
};

export default function AllDentist() {
  const [retryCount, setRetryCount] = useState(0);

  const { 
    data, 
    isLoading, 
    isError, 
    error, 
    refetch,
    isFetching 
  } = useQuery({
    queryKey: ['dentists'],
    queryFn: fetchDentists,
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000, 
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    onError: (err) => {
      console.error('Query error:', err);
    },
  });

  const dentists = useMemo(() => {
    return data?.data?.dentists || [];
  }, [data]);

  const totalCount = useMemo(() => {
    return data?.data?.total || 0;
  }, [data]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    refetch();
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="mb-96 mt-32 font-DanaMedium">
          <div className="container">
            <div className="my-[30px]">
              <div className="flex items-center gap-x-2">
                <div className="w-[30px] h-9 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-4 bg-gray-200 animate-pulse w-32 rounded"></div>
              </div>
              <div className="h-3 bg-gray-200 animate-pulse w-20 mt-2 rounded"></div>
            </div>
            <div className="space-y-3 md:grid md:grid-cols-2 md:gap-x-2 xl:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <DentistSkeleton key={index} />
              ))}
            </div>
          </div>
          <Footer />
        </div>
        <MenuMobile />
      </>
    );
  }

  // خطا
  if (isError) {
    return (
      <>
        <Header />
        <div className="mb-96 mt-32 font-DanaMedium">
          <div className="container">
            <ErrorState error={error} onRetry={handleRetry} />
          </div>
          <Footer />
        </div>
        <MenuMobile />
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="mb-96 mt-32 font-DanaMedium">
        <div className="container">
          {/* هدر صفحه */}
          <div className="my-[30px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <img 
                  src="../images/Tooth_image.png" 
                  alt="Tooth" 
                  className="w-[30px] h-9"
                  loading="lazy"
                />
                <p className="text-sm">لیست دندان پزشکان</p>
              </div>
              
           
            </div>
            <p className="text-[11px] text-gray-400 pt-2">
              {new Intl.NumberFormat('fa-IR').format(totalCount)} دندانپزشک
              {isFetching && <span className="mr-2 text-blue-600">(در حال به‌روزرسانی...)</span>}
            </p>
          </div>

          {dentists.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <p className="text-gray-500">هیچ دندانپزشکی یافت نشد</p>
            </div>
          ) : (
            <div className="space-y-8 grid md:grid-cols-2 md:gap-x-2 xl:grid-cols-3">
              {dentists.map((dentist) => (
                <VipCart key={dentist.userId}>
                  <a href={`/dentist/${dentist.userId}`}>
                    <div className="flex items-center gap-x-5 px-3 pt-2 mb-4">
                      {dentist?.avatar ? (
                        <div className="relative w-[115px] h-[115px] flex-shrink-0">
                          <img
                            src="./images/dentist_box_backgroundImag.svg"
                            alt="background"
                            className="absolute inset-0 w-full h-full object-cover rounded-full"
                          />
                          <img
                            src={dentist.avatar}
                            alt={formatDentistName(dentist)}
                            className="absolute inset-0 w-[70%] h-[70%] m-auto rounded-full object-cover border-2 border-white shadow"
                            loading="lazy"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      ) : (
                        <div className="relative w-[115px] h-[115px] flex-shrink-0">
                          <img
                            src="./images/dentist_box_backgroundImag.svg"
                            alt="background"
                            className="absolute inset-0 w-full h-full object-cover rounded-full"
                          />
                          <FaCircleUser className="absolute inset-0 w-[70%] h-[70%] m-auto fill-gray-400" />
                        </div>
                      )}
                      
                      <div className="text-center flex-1">
                        <p className="text-[13px] mb-1.5 font-medium">
                          {formatDentistName(dentist)}
                        </p>
                        <div className="space-y-2 text-xs text-gray-500">
                          <p>{formatSpecialty(dentist)}</p>
                          {dentist.ratingCount && (
                            <p className="flex items-center justify-center gap-1">
                              <span>⭐</span>
                              <span>{dentist.averageRating?.toFixed(1)}</span>
                              <span className="text-gray-400">({dentist.ratingCount} نظر)</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 h-16 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 fill-gray-400">
                            <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                          </svg>
                          <p className="text-[11px] text-gray-600">
                            {dentist.address || 'آدرس ثبت نشده'}
                          </p>
                        </div>
                        <Button className="flex items-center justify-center bg-blue-600 text-white px-2 h-8 rounded-xl text-sm hover:bg-blue-700 transition-colors">
                          دریافت نوبت
                        </Button>
                      </div>
                    </div>
                  </a>
                </VipCart>
              ))}
            </div>
          )}
        </div>
        <Footer />
      </div>
      <MenuMobile />
    </>
  );
}