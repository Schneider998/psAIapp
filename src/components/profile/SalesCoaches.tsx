import React from 'react';

interface Coach {
  name: string;
  image: string;
  title: string;
}

interface SalesCoachesProps {
  coaches: Coach[];
}

export default function SalesCoaches({ coaches }: SalesCoachesProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Sales Coaches</h2>
      <div className="space-y-4">
        {coaches.map((coach, index) => (
          <div key={index} className="flex items-center">
            <img
              src={coach.image}
              alt={coach.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <div className="font-medium">{coach.name}</div>
              <div className="text-sm text-gray-500">{coach.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}