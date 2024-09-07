import { ChecklistsWithCheckListItems, ListLabel } from '@/types';
import React, { createContext, useContext, useState, useEffect } from 'react';



// Define the shape of the context
interface CardDataContextType {
  labels: ListLabel[] | null;
  setLabels: React.Dispatch<React.SetStateAction<ListLabel[] | null>>;
  checklists: ChecklistsWithCheckListItems[] | null;
  setChecklists: React.Dispatch<React.SetStateAction<ChecklistsWithCheckListItems[] | null>>;
}

// Create the context
const CardDataContext = createContext<CardDataContextType | undefined>(undefined);

// Create a custom hook to use the context
export const useCardDataContext = () => {
  const context = useContext(CardDataContext);
  if (!context) {
    throw new Error('useCardDataContext must be used within a CardDataProvider');
  }
  return context;
};

// Create a provider component
export const CardDataProvider = ({ children, labels: initialLabels }: {
    children: React.ReactNode;
    labels: ListLabel[] | null;
  }) => {
    
    const [labels, setLabels] = useState<ListLabel[] | null>(initialLabels);
    console.log("labelslabelslabelslabelslabelslabelslabelslabelslabels",labels);
  
    return (
      <div >
        {children}
      </div>
    );
  };