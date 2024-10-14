import { HomeContainer, Product } from "@/styles/pages/home";
import Image from "next/image";
import { useKeenSlider } from 'keen-slider/react'

import { stripe } from "@/lib/stripe";
import { GetStaticProps } from "next";

import 'keen-slider/keen-slider.min.css'
import Stripe from "stripe";

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: number
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((item, index) => (
        <Product id={item.id} className="keen-slider__slide" key={index}>
        <Image alt={item.name} src={item.imageUrl} width={802} height={802} />

        <footer>
          <strong>{item.name}</strong>
          <span>{item.price}</span>
        </footer>
      </Product>
      ))}

    
    </HomeContainer>
  );
}


export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  
  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount! / 100),
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2,
  }
}