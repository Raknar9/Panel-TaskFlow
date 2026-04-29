export interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'Baja' | 'Media' | 'Alta';
  completed: boolean;
}