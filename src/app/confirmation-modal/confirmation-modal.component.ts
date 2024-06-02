import { Component, Inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss'
})
export class ConfirmationModalComponent {

  // message: string;
  // @Input() title ='Confirmation';
  // @Input() message! : string;

  constructor(public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {message : string}) {
      // this.message = data.message;
     }
  
  onConfirm(): void {
    // Renvoyer 'confirm' à votre composant parent
    this.dialogRef.close('confirm');
  }

  onCancel(): void {
    // Renvoyer 'dismiss' à votre composant parent
    this.dialogRef.close(false);
  }


  onNoClick() {
    this.dialogRef.close();
  }

  // close(result: string) : void {
  //   this.activeModal.close(result);
  // }
}
