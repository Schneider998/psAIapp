import React from 'react';
import { CheckCircle } from 'lucide-react';

interface Training {
  name: string;
  provider: string;
  completed: string;
}

interface SalesTrainingProps {
  trainings: Training[];
}

export default function SalesTraining({ trainings }: SalesTrainingProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Sales Training</h2>
      <div className="space-y-4">
        {trainings.map((training, index) => (
          <div key={index} className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <div>
              <div className="font-medium">{training.name}</div>
              <div className="text-sm text-gray-500">{training.provider} - {training.completed}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}