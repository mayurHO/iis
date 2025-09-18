"use client";
import './banner.css';
import '../about_global.css';
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";



const fetchBanner = async () => {
  const res = await fetch("/frontend/ActionApi/Banner");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await res.json();
  console.log("Fetched banner:", data);

 
  return data?.banner || [];
};

const ABanner =() =>{
      const { data: banner = [], isLoading, isError } = useQuery({
    queryKey: ["banner"],
    queryFn: fetchBanner,
  });
  const {banners}=banner;
  
   if (isLoading) return <div suppressHydrationWarning>Loading banner info...</div>;
  if (isError) return <div suppressHydrationWarning>Failed to load banner info.</div>;
  if (!banners?.length) return <div suppressHydrationWarning>No banner info found.</div>;
  

    
    return(
        <>
         {banners?.map((item,index)=>(
        <div className="side-space-plr about-banner pt pb" key={index}>
            
                <div className='about-overlay'></div>
                 <h1>{item.baner_name}</h1>
                 <div className="d-flex flex-row justify-content-center align-items-center"><Link href={'#'}>Home</Link><i className="fa-solid fa-angles-right"></i><Link href={'#'}>About us</Link></div>
            
        </div> 
        ))}
        </>
    );
};
export default ABanner;