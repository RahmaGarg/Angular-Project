import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-memberform',
  templateUrl: './memberform.component.html',
  styleUrls: ['./memberform.component.css']
})
export class MemberformComponent implements OnInit {
  form!: FormGroup;
  idcourant: string | null = null;
  cvFileName: string | null = null;

  constructor(
    private MS: MemberService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute
  ) {}

  initForm(): void {
    this.form = new FormGroup({
      cin: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      cv: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]), // Ensure type is included here
    });
  }

  ngOnInit() {
    this.idcourant = this.activatedRoute.snapshot.params['id'];
    this.initForm();

    if (this.idcourant) {
      this.MS.getMemberByID(this.idcourant).subscribe((m) => {
        this.form.patchValue({
          cin: m.cin,
          name: m.name,
          type: m.type === 'Teacher' ? 'Teacher' : 'Student', // Ensure correct value for radio
        });
        this.cvFileName = m.cv; // For file display, handle separately
      });
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.cvFileName = file.name; // Update the file name
      this.form.patchValue({ cv: file }); // Store the file if needed
    }
  }

  Sub(): void {
    const memberData = {
      ...this.form.value,
      createdDate: new Date().toISOString(),
    };

    if (this.idcourant) {
      this.MS.UpdateMember(memberData, this.idcourant).subscribe(() => {
        this.router.navigate(['']);
      });
    } else {
      this.MS.add(memberData).subscribe(() => {
        this.router.navigate(['/member']);
      });
    }
  }
}
