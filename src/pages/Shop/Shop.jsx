import React, { lazy, Suspense } from 'react'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import smartTVs from "../../TV_Data/data"
import "./Shop.css"

// Lazy load components
const Hero = lazy(() => import('../../components/Hero/Hero'))
const FeaturedProducts = lazy(() => import("../../components/FeaturedProducts/FeaturedProducts"))
const Categories = lazy(() => import("../../components/Categories/Categories"))
const SpecialOffer = lazy(() => import("../../components/SpecialOffer/SpecialOffer"))
const Brands = lazy(() => import("../../components/Brands/Brands"))
const Testimonials = lazy(() => import("../../components/Testimonials/Testimonials"))
const CTA = lazy(() => import("../../components/CTA/CTA"))
const Newsletter = lazy(() => import("../../components/Newsletter/Newsletter"))

const Shop = () => {

  return (
    <div className="shop-page">
      <Suspense fallback={<LoadingSpinner />}>
        <Hero />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <FeaturedProducts products={smartTVs} />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Categories />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <SpecialOffer />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Brands />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Testimonials />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <CTA />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <Newsletter />
      </Suspense>
    </div>
  )
}

export default Shop
