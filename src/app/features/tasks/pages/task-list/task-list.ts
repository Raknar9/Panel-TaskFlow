import { Component, signal, effect, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../../models/task.model';
import { TaskCardComponent } from '../../components/task-card/task-card';
import { TaskFormComponent } from '../../components/task-form/task-form';


@Component({
  selector: 'app-task-list',
  imports: [FormsModule, TaskCardComponent, TaskFormComponent],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskListComponent {
   private STORAGE_KEY = 'taskflow_tasks';

 tasks = signal<Task[]>(this.loadTasks());


  newTitle = '';
  newDescription = '';
  newPriority: 'Baja' | 'Media' | 'Alta' = 'Media';
  searchTerm = signal('');
  filter = signal<'Todas' | 'Pendientes' | 'Completadas'>('Todas');
  filteredTasks = computed(() => {
    

  let filtered = this.tasks();

  if (this.filter() === 'Pendientes') {
    filtered = filtered.filter(task => !task.completed);
  }

  if (this.filter() === 'Completadas') {
    filtered = filtered.filter(task => task.completed);
  }

  if (this.searchTerm()) {

    filtered = filtered.filter(task =>
      task.title.toLowerCase().includes(
        this.searchTerm().toLowerCase()
      )
    );

  }

  return filtered;

});

totalTasks = computed(() => this.tasks().length);

completedTasks = computed(() =>
  this.tasks().filter(task => task.completed).length
);

pendingTasks = computed(() =>
  this.tasks().filter(task => !task.completed).length
);

highPriorityTasks = computed(() =>
  this.tasks().filter(task => task.priority === 'Alta').length
);

  loadTasks(): Task[] {

  const storedTasks = localStorage.getItem(this.STORAGE_KEY);

  if (storedTasks) {
    return JSON.parse(storedTasks);
  }

  return [
    {
      id: 1,
      title: 'Terminar proyecto Angular',
      description: 'Completar la interfaz del panel de TaskFlow',
      priority: 'Media',
      completed: false
    },
    {
      id: 2,
      title: 'Desplegar portfolio',
      description: 'Subir la última versión del portfolio',
      priority: 'Alta',
      completed: false
    },
    {
      id: 3,
      title: 'Aprender Angular Signals',
      description: 'Practicar estado reactivo moderno',
      priority: 'Baja',
      completed: true
    }
  ];

}
createTask(taskData: Omit<Task, 'id' | 'completed'>) {

  const newTask: Task = {
    id: Date.now(),
    completed: false,
    ...taskData
  };

  this.tasks.update(tasks => [newTask, ...tasks]);

}
constructor() {

  effect(() => {

    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(this.tasks())
    );

  });

}

  addTask() {

    if (!this.newTitle.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title: this.newTitle,
      description: this.newDescription,
      priority: this.newPriority,
      completed: false
    };

    this.tasks.update(tasks => [newTask, ...tasks]);

    this.newTitle = '';
    this.newDescription = '';
    this.newPriority = 'Media';
  }
  deleteTask(id: number) {
  this.tasks.update(tasks =>
    tasks.filter(task => task.id !== id)
  );
}
toggleCompleted(id: number) {

  this.tasks.update(tasks =>
    tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    )
  );

}

}