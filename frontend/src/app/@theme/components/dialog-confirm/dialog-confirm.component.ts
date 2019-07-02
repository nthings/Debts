import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-dialog-confirm',
  template: `
    <nb-card>
      <nb-card-header>¿Estás seguro de querer {{mode}}?</nb-card-header>
      <nb-card-body>
        <button nbButton status="danger" (click)="cancel()">No</button>
        <button nbButton status="success" (click)="submit()" style="margin-left: 1rem;">Si</button>
      </nb-card-body>
    </nb-card>
  `,
})
export class DialogConfirmComponent {
  @Input() mode: string;

  constructor(protected ref: NbDialogRef<DialogConfirmComponent>) {}

  cancel() {
    this.ref.close();
  }

  submit() {
    this.ref.close(true);
  }
}
