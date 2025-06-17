export type RoadmapStatus = 'pending' | 'in_progress' | 'approved';

export interface RoadmapSubtask {
  id: string;
  title: string;
  status: RoadmapStatus;
  description?: string;
  approvedAt?: string;
  approvedBy?: string;
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: RoadmapStatus;
  category: string;
  files: string[];
  subtasks: RoadmapSubtask[];
}

export type RoadmapCategory = RoadmapItem['category']; 