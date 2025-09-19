"use client";
import './teacher.css';
import '../about_global.css';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useQuery } from "@tanstack/react-query";

const fetchTeacher = async () => {
  const res = await fetch("/frontend/ActionApi/Teacher");
  if (!res.ok) throw new Error("Network response was not ok");
  const data = await res.json();
  return data?.teacher || [];
};

const fetchTeacher_head = async () => {
  const res = await fetch("/frontend/ActionApi/TeacherHead");
  if (!res.ok) throw new Error("Network response was not ok");
  
  const data = await res.json();
  console.log("data",data);
  return data?.teacher_head || [];
  
};

const Teacher = () => {
  
  const { data: teacher = [], isLoading: loadingTeacher, isError: errorTeacher } = useQuery({
    queryKey: ["teacher"],
    queryFn: fetchTeacher,
  });

  const { data: teachertitle = [], isLoading: loadingTitle, isError: errorTitle } = useQuery({
    queryKey: ["teachertitle"],
    queryFn: fetchTeacher_head,
  });
console.log(teachertitle,"titles");


  return (
    <div className="side-space-plr teacher-section pt pb">
      <div className="row m-0 p-0">
        {teachertitle.map((item1, index) => (
          <div className="col-12 p-0 mb text-center d-flex flex-column align-items-center" key={index}>
            <h6>{item1.teacher_subheading}</h6>
            <h2>{item1.teacher_heading}</h2>
            <p>{item1.teacher_heading_des}</p>
          </div>
        ))}
      </div>

      <div className="row m-0 p-0 teacher-row">
        {teacher.map((item, index) => (
          <div className="col-md-3 teacher-col-1" key={index}>
            <div className="team-item">
              <div className='team-img'>
                <Image src={item.teacher_image_path} width={245} height={302} alt={item.teacher_name} />
              </div>
              <div className='team-social'>
                {item.facebook_link && <a href={item.facebook_link}><i className="fa-brands fa-facebook-f"></i></a>}
                {item.whatsapp_link && <a href={item.whatsapp_link}><i className="fa-brands fa-whatsapp"></i></a>}
                {item.linkedin_link && <a href={item.linkedin_link}><i className="fa-brands fa-linkedin-in"></i></a>}
                {item.youtube_link && <a href={item.youtube_link}><i className="fa-brands fa-youtube"></i></a>}
              </div>
              <div className='team-content'>
                <div className='team-bio'>
                  <h5>{item.teacher_name}</h5>
                  <span>{item.teacher_profession}</span>
                </div>
              </div>
              <span className='team-social-btn'>
                <i className="fa-solid fa-share-nodes"></i>
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mobile-teacher-slider d-block d-md-none">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 15 },
            1024: { slidesPerView: 3, spaceBetween: 10 },
          }}
        >
          {teacher.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="team-item">
                <div className="team-img">
                  <Image src={item.teacher_image_path} width={245} height={302} alt={item.teacher_name} />
                </div>
                <div className="team-social">
                  {item.facebook_link && <a href={item.facebook_link}><i className="fa-brands fa-facebook-f"></i></a>}
                  {item.whatsapp_link && <a href={item.whatsapp_link}><i className="fa-brands fa-whatsapp"></i></a>}
                  {item.linkedin_link && <a href={item.linkedin_link}><i className="fa-brands fa-linkedin-in"></i></a>}
                  {item.youtube_link && <a href={item.youtube_link}><i className="fa-brands fa-youtube"></i></a>}
                </div>
                <div className="team-content">
                  <div className="team-bio">
                    <h5>{item.teacher_name}</h5>
                    <span>{item.teacher_profession}</span>
                  </div>
                </div>
                <span className="team-social-btn">
                  <i className="fa-solid fa-share-nodes"></i>
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Teacher;
