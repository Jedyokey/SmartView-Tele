import React from 'react'
import Hero from '../../components/Hero/Hero'
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts"
import Categories from "../../components/Categories/Categories"
import SpecialOffer from "../../components/SpecialOffer/SpecialOffer"
import Brands from "../../components/Brands/Brands"
import Testimonials from "../../components/Testimonials/Testimonials"
import CTA from "../../components/CTA/CTA"
import Newsletter from "../../components/Newsletter/Newsletter"
import "./Shop.css"
import smartTVs from "../../TV_Data/data"

const Shop = () => {
  return (
    <div className="shop-page">
        <Hero />
        <FeaturedProducts products={smartTVs} />
        <Categories />
        <SpecialOffer />
        <Brands />
        <Testimonials />
        <CTA />
        <Newsletter />
    </div>
  )
}

export default Shop
