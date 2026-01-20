import React from 'react'
import { Truck, Lock, RotateCcw, Clock } from 'lucide-react'

const features = [
  { icon: Truck, text: 'Free Shipping', subtext: 'On orders over $100' },
  { icon: Lock, text: 'Secure Payment', subtext: '100% protected payments' },
  { icon: RotateCcw, text: 'Easy Returns', subtext: '30-day return policy' },
  { icon: Clock, text: '24/7 Support', subtext: 'Dedicated customer service' },
]

const Features = () => {
  return (
    <section className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center gap-4 
              bg-white rounded-xl p-5 shadow-sm
              hover:shadow-md transition-all duration-300"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-100">
                <feature.icon className="h-7 w-7 text-gray-700" />
              </div>

              {/* Text */}
              <div className="text-center sm:text-left">
                <p className="text-base font-semibold text-gray-900">
                  {feature.text}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {feature.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
