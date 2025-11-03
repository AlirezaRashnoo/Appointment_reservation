import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css'
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation , Autoplay} from 'swiper/modules';

function Slider(prop) {
    return (
      <div className='mb-10'>
          <Swiper
            slidesPerView={1.5}
            spaceBetween={12}
            breakpoints= {{
              500: {
                slidesPerView:2
              },
              640: {
                slidesPerView:2.5
              },
              768:{
                slidesPerView:3
              },
              1024: {
                slidesPerView:5
              },
              1280: {
                slidesPerView:6
              }
            }}
            navigation={prop.navigation}
            modules={[Pagination, Navigation]}
            >
            
            {/* {dataBox.slice(11,24).map(item=>(
              <SwiperSlide key={dataBox.id}>
                <Boxes {...item}></Boxes>
              </SwiperSlide>
            ))} */}
            {prop.children}

            
           </Swiper>
           
      </div>
       
     );
}

export default Slider;


