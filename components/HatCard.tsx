'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Hat } from '@/types';

interface HatCardProps {
  hat: Hat;
}

export default function HatCard({ hat }: HatCardProps) {
  return (
    <Link href={`/hat/${hat.id}`}>
      <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={hat.image_url || '/placeholder.jpg'}
            alt={hat.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="p-4">
          <h3 className="font-serif text-lg font-semibold text-kabardian-dark mb-2 group-hover:text-kabardian-red transition-colors">
            {hat.name}
          </h3>

          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-xs px-2 py-1 bg-kabardian-cream text-kabardian-dark rounded-full">
              {hat.category}
            </span>
            <span className="text-xs px-2 py-1 bg-kabardian-cream text-kabardian-dark rounded-full">
              {hat.material}
            </span>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2">
            {hat.description}
          </p>

          <div className="mt-4 flex items-center text-kabardian-red text-sm font-medium">
            Подробнее
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
