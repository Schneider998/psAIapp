import React from 'react';
import { CheckCircle } from 'lucide-react';

interface LookingForProps {
  items: string[];
}

export default function LookingFor({ items }: LookingForProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Looking For</h2>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center text-gray-700">
            <CheckCircle className="h-5 w-5 text-primary-500 mr-2" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}