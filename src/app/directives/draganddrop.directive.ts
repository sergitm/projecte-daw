import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDraganddrop]'
})
export class DraganddropDirective {

  @Output() fileDropped: EventEmitter<any> = new EventEmitter();
  @HostBinding("style.background") private background = "#d3d3d3";

  constructor() { }

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt : DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#a9a9a9";
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt: DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#d3d3d3";
  }

  @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#d3d3d3";

    const file = evt.dataTransfer?.files[0];
    this.fileDropped.emit(file);
  }

}
