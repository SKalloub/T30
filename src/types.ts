// --- المزاد (Auction) ---
export type AuctionStatus = 'ما بدأت' | 'قيد الحفظ' | 'محفوظة' | 'متقنة';
export type Priority = 'عالية' | 'متوسطة' | 'عادية';

export interface AuctionList {
  id: string;
  title: string;
  names: string[];
  checkedNames: string[];
  dueDate: string;
  status: AuctionStatus;
  priority: Priority;
  isCompleted: boolean;
}

// --- التاسكات (Tasks) ---
export interface Task {
  id: string;
  title: string;
  checked: boolean;
}

// --- التعويض (Compensation) ---
export type CompType = 'لاعب حالي' | 'لاعب معتزل' | 'مدرب';
export type CompImportance = 'متوقع' | 'مهم' | 'عادي';
export type CompStatus = 'مدروسة' | 'لسا' | 'مش بحاجة';

export interface PlayerCareer {
  id: string;
  name: string;
  type: CompType;
  importance: CompImportance;
  status: CompStatus;
  clubs: string[];
  isPartial: boolean;
  notes?: string;
}

// --- الحلقات (Episodes) ---
export interface Episode {
  id: string;
  opponent: string;
  date: string;
  totalScore: { me: number; op: number }; // النتيجة الكلية للحلقة (مانيوال)
  
  whatDoYouKnow: { 
    total: { me: number; op: number }; // نتيجة الفقرة مانيوال
    questions: { q: string; winner: string; score: number }[] 
  };
  
  auction: { 
    totalMe: number; // نتيجة الفقرة مانيوال
    totalOp: number; // نتيجة الفقرة مانيوال
    rounds: { item: string; bidder: string; bid: number; achieved: number; points: number }[] 
  };
  
  buzzer: { 
    totalMe: number; 
    totalOp: number; 
    questions: { q: string; winner: string }[] 
  };
  
  qAndA: { 
    totalMe: number; 
    totalOp: number; 
    questions: { q: string; winner: string }[] 
  };
  
  compensation: { 
    totalMe: number; 
    totalOp: number; 
    rounds: { player: string; winner: string; points: number }[] 
  };
}