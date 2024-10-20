import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Outil } from 'src/models/Outil';
import { ToolService } from 'src/services/Tool.service';

@Component({
  selector: 'app-tool-modal',
  templateUrl: './tool-modal.component.html',
  styleUrls: ['./tool-modal.component.css']
})
export class ToolModalComponent {
  form: FormGroup;


  constructor(
    private dialogRef: MatDialogRef<ToolModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private toolService: ToolService
  ) {
    this.form = this.initForm();
    if (this.data?.id) {
      this.toolService.getToolById(this.data.id).subscribe(
        (tool: Outil) => {
          this.populateForm(tool);
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
      date: new FormControl(null, [Validators.required]), // Set to null for new event
      source: new FormControl(null, [Validators.required]), // Set to null for new event
    });
  }
  

  populateForm(tool: Outil): void {
    this.form.patchValue({
      date: tool.date,
      source: tool.source
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
