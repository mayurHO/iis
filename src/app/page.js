import React from 'react';
import '@/app/styles/frontend/careers.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/app/styles/frontend/globals.css';

import CareersBanner from '@/app/frontend/components/careers/banner';
import JobCategory from '@/app/frontend/components/careers/job-category';
import HowWork from '@/app/frontend/components/careers/how-work';
import CareerInner from './frontend/components/careers/Career-inner';

export default function Home() {
  return (
    <>
    <CareersBanner />
    <JobCategory />
    <HowWork />
    <CareerInner />
    </>
  );
}
