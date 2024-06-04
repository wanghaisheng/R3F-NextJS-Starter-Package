import Image from 'next/image'

const demodata = [
  {
    productId: '1234567890',
    name: 'Lenovo IdeaPad 3i',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbJHtIt0p3GmXkfXnps0N5pOvgiGJVMe8kdg&s',
    price: 599.99,
    rating: 4.5,
    reviews: 123,
    categories: ['Laptops', 'Electronics'],
    description:
      'Powerful and portable laptop with a 15.6-inch display, 11th Gen Intel Core i5 processor, 8GB RAM, and 256GB SSD.',
    seller: 'Lenovo',
    availability: 'In stock',
    shipping: {
      estimatedDelivery: '2-3 business days',
      cost: 0,
    },
    variants: [
      {
        color: 'Silver',
        size: '15.6-inch',
        price: 599.99,
      },
      {
        color: 'Gray',
        size: '15.6-inch',
        price: 629.99,
      },
    ],
  },
  {
    productId: '9876543210',
    name: 'Samsung Galaxy S23 Ultra',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCD8HZbnfDH6pK7Wz9_uWmxyltw7zVkst1TQ&s',
    price: 1199.99,
    rating: 4.8,
    reviews: 456,
    categories: ['Smartphones', 'Electronics'],
    description:
      'High-end smartphone with a 6.8-inch Dynamic AMOLED 2X display, Qualcomm Snapdragon 8 Gen 2 processor, 12GB RAM, and 512GB storage.',
    seller: 'Samsung',
    availability: 'In stock',
    shipping: {
      estimatedDelivery: '1-2 business days',
      cost: 10,
    },
    variants: [
      {
        color: 'Phantom Black',
        storage: '512GB',
        price: 1199.99,
      },
      {
        color: 'Cream',
        storage: '512GB',
        price: 1199.99,
      },
      {
        color: 'Green',
        storage: '512GB',
        price: 1199.99,
      },
    ],
  },
  {
    productId: '1011121314',
    name: 'Apple AirPods Pro (2nd Generation)',
    imageUrl:
      'https://www.apple.com/newsroom/images/product/airpods/standard/Apple-AirPods-Pro-2nd-gen-hero-220907.jpg.news_app_ed.jpg',
    price: 249.99,
    rating: 4.7,
    reviews: 789,
    categories: ['Headphones', 'Electronics'],
    description:
      'Wireless earbuds with active noise cancellation, transparency mode, and up to 30 hours of battery life.',
    seller: 'Apple',
    availability: 'In stock',
    shipping: {
      estimatedDelivery: '1-2 business days',
      cost: 0,
    },
    variants: [
      {
        color: 'White',
        price: 249.99,
      },
    ],
  },
  {
    productId: '1415161718',
    name: 'Sony PlayStation 5 Console',
    imageUrl:
      'https://i5.walmartimages.com/seo/Restored-Sony-PlayStation-5-Digital-Edition-Sony-PS5-Digital-Video-Game-Console-Refurbished_825493ab-d9d7-4e0e-92ce-5e9ee41a0e59.a3f02790fc0611920245c5046aaae481.jpeg',
    price: 499.99,
    rating: 4.6,
    reviews: 1011,
    categories: ['Gaming Consoles', 'Electronics'],
    description: 'Next-gen gaming console with ultra-fast SSD, 8-core CPU, and ray tracing capabilities.',
    seller: 'Sony',
    availability: 'Out of stock',
    shipping: {
      estimatedDelivery: '7-10 business days',
      cost: 20,
    },
    variants: [
      {
        version: 'Standard Edition',
        price: 499.99,
      },
      {
        version: 'Digital Edition',
        price: 399.99,
      },
    ],
  },
]

export default function ShopComponent() {
  return (
    <div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {demodata.map((product) => (
          <div key={product.productId} className='relative overflow-hidden rounded-md bg-white shadow-md'>
            <div className='h-24 w-full overflow-hidden'>
              <Image
                src={product.imageUrl}
                unoptimized
                alt={product.name}
                width={200}
                height={100}
                layout='responsive'
                className='object-cover'
              />
            </div>
            <div className='h-14 w-full bg-gray-300 p-1'>
              <h1 className='font-medium text-black'>${product.price}</h1>
              <h2 className='text-sm text-black'>{product.name.slice(0, 10)}...</h2>
              {/* <p className='mt-1 text-sm text-gray-600'>{product.description.slice(0, 22)}...</p> */}
            </div>
            <div className='absolute bottom-14 right-1'>
              <span className='text-sm font-bold text-pink-300'>({product.rating}/5)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
