'use client';

import './about.css';
import '../about_global.css';
import Link from 'next/link';
import { useQuery } from "@tanstack/react-query";


const fetchAbout = async () => {
  const res = await fetch("/frontend/ActionApi/About");

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await res.json();
  console.log("Fetched about:", data);

 
  return data?.about || [];
};

const About = () => {
  const { data: about = [], isLoading, isError } = useQuery({
    queryKey: ["about"],
    queryFn: fetchAbout,
  });
  console.log("✅ About data in component:", about);

   if (isLoading) return <div suppressHydrationWarning>Loading about info...</div>;
  if (isError) return <div suppressHydrationWarning>Failed to load about info.</div>;
  if (!about?.length) return <div suppressHydrationWarning>No about info found.</div>;

  return (
    <div className='side-space-plr about-second-section pt pb'>
      {about.map((item, index) => (
        <div className='row m-0 about-row' key={index}>

          {/* Left Column */}
          <div className='col-md-3 col-12 p-0 about-second-col1'>
            <img 
              src={item.about_image_1 || "/assets/fallback.jpg"} 
              alt='image' 
              width={266} 
              height={350} 
            />
            <div className='about-experience'>
              <div className='about-experience-icon'>
                <img 
                  src={item.exp_icon || "/assets/fallback-icon.png"} 
                  alt='icon' 
                  width={65} 
                  height={65} 
                  className='icon' 
                />
              </div>
              <p>{item.exp_text || ""}</p>
            </div>
          </div>

          {/* Middle Column */}
          <div className='col-md-3 col-12 p-0 about-second-col2'>
            <img 
              src={item.about_image_2 || "/assets/fallback.jpg"} 
              alt='image' 
              width={266} 
              height={266} 
              className='image1' 
            />
            <img 
              src={item.about_image_3 || "/assets/fallback.jpg"} 
              alt='image' 
              width={266} 
              height={319} 
              className='image2' 
            />
          </div>

          {/* Right Column */}
          <div className='col-md-6 col-12 p-0 about-second-col3'>
            <h6>{item.subheading || ""}</h6>
            <h2>{item.title || ""}</h2>
            <p>{item.description || ""}</p>

            <div className='row m-0 p-0 about-inner-row'>
              <div className='col-md-7 p-0 about-inner-col-1'>
                <div className='service-content'>

                  {/* About Item 1 */}
                  <div className='about-item'>
                    <div className='about-item-icon'>
                      <img 
                        src={item.about_item_img1 || "/assets/fallback-icon.png"} 
                        alt='icon' 
                        width={45} 
                        height={45} 
                      />
                    </div>
                    <div className='about-item-content'>
                      <h5>{item.about_item_title1 || ""}</h5>
                      <p>{item.about_item_description1 || ""}</p>
                    </div>
                  </div>

                  {/* About Item 2 */}
                  <div className='about-item'>
                    <div className='about-item-icon'>
                      <img 
                        src={item.about_item_img2 || "/assets/fallback-icon.png"} 
                        alt='icon' 
                        width={45} 
                        height={45} 
                      />
                    </div>
                    <div className='about-item-content'>
                      <h5>{item.about_item_title2 || ""}</h5>
                      <p>{item.about_item_description2 || ""}</p>
                    </div>
                  </div>

                </div>

                <img 
                  src="/assets/About/01.jpg" 
                  alt='image' 
                  width={200} 
                  height={200} 
                  className='mobile-image' 
                />
              </div>

              {/* Quote Column */}
              <div className='col-md-5 p-0 about-inner-col-2'>
                <div className='about-quote'>
                  <p>{item.about_quote || ""}</p>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className='row m-0 p-0 about-bottom'>
              <div className='about-phone'>
                <div className='icon'>
                  <i className="fa-solid fa-phone-volume"></i>
                </div>
                <div className='number'>
                  <span>Call Now</span>
                  <h6>
                    <a href="tel:+21236547898">+2 123 654 7898</a>
                  </h6>
                </div>
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default About;
