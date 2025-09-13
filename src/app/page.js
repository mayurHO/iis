import React from 'react';
import '@/app/styles/frontend/careers.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/app/styles/frontend/globals.css';

import CareersBanner from '@/app/frontend/components/careers/banner';
import JobCategory from '@/app/frontend/components/careers/job-category';

export default function Home() {
  return (
    <>
    <CareersBanner />
    <JobCategory />
    </>
  );
}
