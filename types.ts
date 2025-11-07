
import React from 'react';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
}
