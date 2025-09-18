'use client'
import './client.css';
import '../about_global.css';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useQuery } from "@tanstack/react-query";


const fetchClient = async () => {
  const res = await fetch("/frontend/ActionApi/Client");

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await res.json();
  console.log("Fetched about:", data);

 
  return data?.client || [];
};
 
const Client = () => {
      const { data: client = [], isLoading, isError } = useQuery({
        queryKey: ["client"],
        queryFn: fetchClient,
      });
    
       if (isLoading) return <div suppressHydrationWarning>Loading client info...</div>;
      if (isError) return <div suppressHydrationWarning>Failed to load client info.</div>;
      if (!client?.length) return <div suppressHydrationWarning>No client info found.</div>;
    

    return (
        <div className='side-space-plr Client-section pt-50 pb-50'>
            <Swiper
                spaceBetween={10}
                slidesPerView={6}
                loop={true}
                autoplay={{ delay: 9000, disableOnInteraction: false }}
                // modules={[Autoplay]}
                breakpoints={{
                    320: { slidesPerView: 2, spaceBetween: 10 },
                    640: { slidesPerView: 3, spaceBetween: 15 },
                    1024: { slidesPerView: 6, spaceBetween: 10 },
                }}
            >
                {client.map(clients => (
                    <SwiperSlide key={clients.id}>
                        <div className='client-card'>
                            <Image 
                                src={clients.image_path} 
                                width={137} 
                                height={137} 
                                alt={clients.name || "Client image"} 
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Client;
