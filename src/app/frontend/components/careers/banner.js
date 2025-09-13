"use client";
import Image from 'next/image';
import { useRef } from 'react';

export default function CareersBanner() {
    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Selected file:', file.name);
        }
    };

    return (
        <section className="careers-banner w-100">
            <div className="banner-image w-100">
                <Image
                    className='img-banner'
                    src="/images/career/banner-img.png"
                    alt="Careers Banner"
                    width={600}
                    height={400}
                    priority
                />
                <div className="b-uploadcv cursor-pointer"  onClick={handleUploadClick}>
                    <Image
                        src="/images/career/upload-img.png"
                        alt="Upload Resume Logo"
                        width={40}
                        height={40}
                    />
                    <span className="upload-text ml-2">Upload your resume</span>
                    <input
                        className='d-none'
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                    />
                </div>
                 <div className='count-img'>
                    <Image className='banner-shape' src="/images/career/banner-shape.png" alt="Banner Shape"
                        width={150}
                        height={70}
                    />
                 </div>
            </div>

            <div className="banner-content w-100">
                <h1 className='mb-4'>Find Your Future, Elevate Your <span>Careers Today !</span></h1>
                <p className='mb-4'>
                    learn more about our open positions and how you can contribute to our mission.
                </p>
                <div className="banner-filter w-100">
                    <div className="dropdown-filter">
                        <select className="filter-location w-50">
                            <option value="">All Locations</option>
                            <option value="new-york">New York</option>
                            <option value="san-francisco">San Francisco</option>
                            <option value="remote">Remote</option>
                        </select>
                        <select className="filter-team w-50">
                            <option value="">All Teams</option>
                            <option value="engineering">Engineering</option>
                            <option value="design">Design</option>
                            <option value="marketing">Marketing</option>
                        </select>
                    </div>
                    <input
                        type="text"
                        className="filter-search"
                        placeholder="Search job title or keyword"
                    />
                    <button className="filter-search-btn">Search</button>
                </div>
            </div>
        </section>
    );
} 