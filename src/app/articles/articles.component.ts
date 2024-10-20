import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Pub } from 'src/models/Pub';
import { PubService } from 'src/services/pub.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { PubModalComponent } from '../pub-modal/pub-modal.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent {

  displayedColumns: string[] = ['id', 'titre', 'date', 'type', 'lien','sourcePdf', 'Actions'];
  dataSource: Pub[] = [];

  constructor(private PS: PubService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Call service method to fetch all events
    this.PS.getAllPub().subscribe(
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
        this.PS.deletePub(id).subscribe(() => {
          // After deletion, reload the list of members
          this.PS.getAllPub().subscribe((response: Pub[]) => {
            this.dataSource = response; // Update the dataSource with the new data
          });
        });
      }
    });
  }
  open(): void {
    const dialogRef = this.dialog.open(PubModalComponent);

    // Handle modal close event and add new event
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.PS.addPub(data).subscribe(
          () => {
            this.PS.getAllPub().subscribe(
              (pubs) => {
                this.dataSource = pubs;
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

    const dialogRef = this.dialog.open(PubModalComponent, dialogConfig);

    // Handle modal close event and update event
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.PS.Update(data, id).subscribe(
          () => {
            this.PS.getAllPub().subscribe(
              (pubs) => {
                this.dataSource = pubs;
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
