import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Evt } from 'src/models/Evt';
import { EvtService } from 'src/services/evt.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private evtService: EvtService
  ) {
    this.form = this.initForm();
    if (this.data?.id) {
      this.evtService.getEvtById(this.data.id).subscribe(
        (evt: Evt) => {
          this.populateForm(evt);
        },
        (error) => {
          console.error('Error fetching event:', error);
          this.close();
        }
      );
    }
  }

  initForm(): FormGroup {
    return new FormGroup({
      titre: new FormControl(null, [Validators.required]),
      dateDebut: new FormControl(null, [Validators.required]), // Set to null for new event
      dateFin: new FormControl(null, [Validators.required]), // Set to null for new event
      lieu: new FormControl(null, [Validators.required])
    });
  }
  

  populateForm(evt: Evt): void {
    this.form.patchValue({
      titre: evt.titre,
      dateDebut: this.formatDate(evt.dateDebut),
      dateFin: this.formatDate(evt.dateFin),
      lieu: evt.lieu
    });
  }

  formatCurrentDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }

  save(): void {
    if (this.form.valid) {
      const formValue = { ...this.form.value };
      this.dialogRef.close(formValue);
    } else {
      console.log("Form is invalid", this.form.errors);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
