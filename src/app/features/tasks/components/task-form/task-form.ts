import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../../models/task.model';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskFormComponent {

  @Output() create = new EventEmitter<Omit<Task, 'id' | 'completed'>>();

  title = '';
  description = '';
  priority: 'Baja' | 'Media' | 'Alta' = 'Media';

  addTask() {

    if (!this.title.trim()) return;

    this.create.emit({
      title: this.title,
      description: this.description,
      priority: this.priority
    });

    this.title = '';
    this.description = '';
    this.priority = 'Media';

  }

}