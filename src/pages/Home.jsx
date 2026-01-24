import React, { lazy, Suspense } from 'react'
import Midbanner from '../Components/Midbanner'
import Features from '../Components/Features'
import FeaturedProducts from '../pages/FeatureProdcuts'
import CategoryBanners from './CategoryBanners'

import Loading from '../assets/Loading4.webm'

const Home = () => {

  const Crousel = lazy(() => import('../Components/Crousel'))

  return (
    <>

      <Suspense fallback={<> <div className='flex justify-center items-center w-[400px] mx-auto'>
        <video muted autoPlay loop>
          <source src={Loading} type='video/webm' />
        </video>
      </div></>}>
      
        <Crousel />

        <CategoryBanners />
        <FeaturedProducts />
      </Suspense>
      <Midbanner />
      <Features />
    </>


  )
}

export default Home


