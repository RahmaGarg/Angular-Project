import { Component, OnInit } from '@angular/core';
import { Outil } from 'src/models/Outil';
import { ToolService } from 'src/services/Tool.service';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { ToolModalComponent } from '../tool-modal/tool-modal.component';
@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit{
  displayedColumns: string[] = ['id', 'date', 'source', 'Actions'];
  dataSource: Outil[] = [];

  constructor(private TS: ToolService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Call service method to fetch all events
    this.TS.getAllTools().subscribe(
      (response) => {
        this.dataSource = response;
      }
    );
  }
  open(): void {
    const dialogRef = this.dialog.open(ToolModalComponent);

    // Handle modal close event and add new event
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.TS.addTool(data).subscribe(
          () => {
            this.TS.getAllTools().subscribe(
              (tools) => {
                this.dataSource = tools;
              },
              (error) => {
                console.error('Error refreshing event list:', error);
              }
            );
          },
          (error) => {
            console.error('Error adding event:', error);
          }
        );
      }
    });
  }
  openedit(id: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { id };

    const dialogRef = this.dialog.open(ToolModalComponent, dialogConfig);

    // Handle modal close event and update event
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.TS.Update(data, id).subscribe(
          () => {
            this.TS.getAllTools().subscribe(
              (tools) => {
                this.dataSource = tools;
              },
              (tools) => {
                console.error('Error refreshing event list:');
              }
            );
          }
        );
      }
    });
  }
  delete(id: string): void {
    // 1. Open the confirmation dialog
    const dialogRef = this.dialog.open(ConfirmComponent);

    // 2. Wait for the user's response from the dialog
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        // If the user confirmed the deletion
        this.TS.deleteTool(id).subscribe(() => {
          // After deletion, reload the list of members
          this.TS.getAllTools().subscribe((response: Outil[]) => {
            this.dataSource = response; // Update the dataSource with the new data
          });
        });
      }
    });
  }
}

  
