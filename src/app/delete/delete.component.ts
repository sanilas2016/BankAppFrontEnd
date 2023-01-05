import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  @Input() item:string|undefined   // @input() is a decorator is used to hold data from parent

  @Output() onCancel=new EventEmitter();

  @Output() onDelete=new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  cancel(){
    // alert('Clicked');
    this.onCancel.emit()  // user defined event
  }

  Delete(){
    this.onDelete.emit(this.item)
  }

}
