import { Component, OnInit } from '@angular/core';
import { Evt } from 'src/models/Evt';
import { EvtService } from 'src/services/evt.service';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'titre', 'dateDebut', 'dateFin', 'lieu', 'Actions'];
  dataSource: Evt[] = [];

  constructor(private ES: EvtService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Call service method to fetch all events
    this.ES.getAllEvt().subscribe(
      (response) => {
        this.dataSource = response;
      }
    );
  }
  delete(id: string): void {
    // 1. Open the confirmation dialog
    const dialogRef = this.dialog.open(ConfirmComponent);

    // 2. Wait for the user's response from the dialog
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        // If the user confirmed the deletion
        this.ES.deleteEvt(id).subscribe(() => {
          // After deletion, reload the list of members
          this.ES.getAllEvt().subscribe((response: Evt[]) => {
            this.dataSource = response; // Update the dataSource with the new data
          });
        });
      }
    });
  }
  open(): void {
    const dialogRef = this.dialog.open(ModalComponent);

    // Handle modal close event and add new event
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.ES.addEvt(data).subscribe(
          () => {
            this.ES.getAllEvt().subscribe(
              (events) => {
                this.dataSource = events;
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

    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

    // Handle modal close event and update event
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.ES.Update(data, id).subscribe(
          () => {
            this.ES.getAllEvt().subscribe(
              (events) => {
                this.dataSource = events;
              },
              (error) => {
                console.error('Error refreshing event list:', error);
              }
            );
          }
        );
      }
    });
  }

  
}
