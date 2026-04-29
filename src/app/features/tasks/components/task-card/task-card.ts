import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../../models/task.model';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css'
})
export class TaskCardComponent {

  @Input() task!: Task;

  @Output() delete = new EventEmitter<number>();

  @Output() toggle = new EventEmitter<number>();

}
