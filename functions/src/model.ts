export interface Activity {
  action: 'added' | 'edited' | 'deleted';
  model: 'Task' | 'File' | 'Comment' | 'Notebook';
  modelId: string;
  userId: string;
  createdAt: any;
}
