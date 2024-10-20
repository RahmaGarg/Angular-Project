import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Member } from 'src/models/Member';
import { MemberService } from 'src/services/member.service';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html', // Added the templateUrl to link the HTML
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  // Dependency injection for MemberService and MatDialog
  constructor(private MS: MemberService, private dialog: MatDialog) {}

  dataSource: Member[] = []; // Data source for the members list

  ngOnInit(): void {
    // When the component is initialized, load all members
    this.MS.getAllMembers().subscribe((response: Member[]) => {
      this.dataSource = response; // Populate the dataSource with the response
    });
  }

  delete(id: string): void {
    // 1. Open the confirmation dialog
    const dialogRef = this.dialog.open(ConfirmComponent);

    // 2. Wait for the user's response from the dialog
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        // If the user confirmed the deletion
        this.MS.deleteMember(id).subscribe(() => {
          // After deletion, reload the list of members
          this.MS.getAllMembers().subscribe((response: Member[]) => {
            this.dataSource = response; // Update the dataSource with the new data
          });
        });
      }
    });
  }

  // Columns to display in the table
  displayedColumns: string[] = ['id', 'cin', 'name', 'type', 'cv', 'createdDate', 'Actions'];
}
