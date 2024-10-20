import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pub } from 'src/models/Pub';
import { PubService } from 'src/services/pub.service';

@Component({
  selector: 'app-pub-modal',
  templateUrl: './pub-modal.component.html',
  styleUrls: ['./pub-modal.component.css']
})
export class PubModalComponent {
  form: FormGroup;


  constructor(
    private dialogRef: MatDialogRef<PubModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private pubService: PubService
  ) {
    this.form = this.initForm();
    if (this.data?.id) {
      this.pubService.getPubById(this.data.id).subscribe(
        (pub: Pub) => {
          this.populateForm(pub);
        },
        (error) => {
          console.error('Error fetching tool', error);
          this.close();
        }
      );
    }
  }

  initForm(): FormGroup {
    return new FormGroup({
      titre: new FormControl(null, [Validators.required]), // Set to null for new event
      type: new FormControl(null, [Validators.required]), // Set to null for new event
      lien: new FormControl(null, [Validators.required]), // Set to null for new event
      date: new FormControl(null, [Validators.required]), // Set to null for new event
      sourcePdf: new FormControl(null, [Validators.required]), // Set to null for new event
    });
  }
  

  populateForm(pub: Pub): void {
    this.form.patchValue({
      titre: pub.titre,
      type: pub.type,
      lien: pub.lien,
      date: pub.date,
      sourcePdf: pub.sourcePdf
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
