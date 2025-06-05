export interface EducaplayGame {
  id?: string;
  userId: string;
  title: string;
  description?: string;
  educaplayUrl: string;
  iframeUrl: string;
  gameType: string;
  isApproved: boolean;
  approvedBy?: string;
  approvalDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  difficulty?: 'Fácil' | 'Medio' | 'Difícil';
  subject?: string;
}

export interface GameFormData {
  title: string;
  educaplayUrl: string;
  gameType: string;
}

export interface GameFilters {
  subject?: string;
  difficulty?: string;
  isApproved?: boolean;
  gameType?: string;
}
