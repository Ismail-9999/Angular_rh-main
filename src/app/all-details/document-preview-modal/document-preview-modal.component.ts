import { Component, Inject, NgModule } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SafeUrlPipe } from '../safe-url.pipe';
import { CommonModule } from '@angular/common';
 

@Component({
  selector: 'app-document-preview-modal',
  templateUrl: './document-preview-modal.component.html',
  styleUrl: './document-preview-modal.component.scss'
})

export class DocumentPreviewModalComponent {
  
  blobUrl: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { blobUrl: string }) {
    this.blobUrl = data.blobUrl;
  }


  
  close(): void {
    // Implement the logic to close the dialog
    // You may emit an event, call a method, or any other action based on the modal library you are using
  }
}
