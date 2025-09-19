"use client";
import './testimonial.css';
import '../about_global.css';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useQuery } from "@tanstack/react-query";


const fetchTestimonial = async () => {
  const res = await fetch("/frontend/ActionApi/Testimonial");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await res.json();
  return data?.testimonial || [];
};

const fetchTestimonial_head = async () => {
  const res = await fetch("/frontend/ActionApi/TestimonialHead");
  if (!res.ok) throw new Error("Network response was not ok");
  
  const data = await res.json();
  console.log("data",data);
  return data?.test_head || [];
  
};


const Testimonial = () => {
    const { data: testimonial = [], isLoading, isError } = useQuery({
      queryKey: ["testimonial"],
      queryFn: fetchTestimonial,
    });

     const { data: testimonialtitle = [], isLoading: loadingTitle, isError: errorTitle } = useQuery({
    queryKey: ["testimonialtitle"],
    queryFn: fetchTestimonial_head,
  });
console.log(testimonialtitle,"titles");
  
     if (isLoading) return <div suppressHydrationWarning>Loading testimonial info...</div>;
    if (isError) return <div suppressHydrationWarning>Failed to load testimonial info.</div>;
   if (!testimonial?.length) {
  return <div suppressHydrationWarning>No testimonial info found.</div>;
}


  return (
    <div className="side-space-plr pt pb testimonial-section">
      <div className="row m-0 p-0">
        {testimonialtitle.map((item,index)=>(

        
        <div className="col-12 p-0 mb text-center d-flex flex-column justify-align-center align-items-center"key={index}>
          <h6>{item.test_subheading}</h6>
          <h2>{item.test_heading}</h2>
          <p>
           {item.test_heading_des}
          </p>
        </div>
        ))}
      </div>

      <div className="row m-0 p-0">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          pagination={{ clickable: true }}
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 5 },
            640: { slidesPerView: 2, spaceBetween: 10 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
          }}
        >
          {testimonial.map((item, index) => (
            <SwiperSlide key={item.id || index}>
              <div className="items testimonial-card">
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fa-solid fa-star"></i>
                  ))}
                </div>

                <p>{item.t_description}</p>

                <div className="testimonial-content">
                  <div className="testimonial-author-img">
                    <Image 
                      src={item.t_image_path} 
                      width={64} 
                      height={64} 
                      alt={item.t_name} 
                      unoptimized 
                    />
                  </div>
                  <div className="testimonial-author-info">
                    <h4>{item.t_name}</h4>
                    <p>{item.t_profession}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
