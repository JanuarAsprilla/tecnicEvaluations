import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEdit = false;
  userId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: [''],
      email: [''],
    });
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId) {
      this.isEdit = true;
      this.userService.getUserById(this.userId).subscribe((data) => {
        this.userForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.userService
        .updateUser(this.userId!, this.userForm.value)
        .subscribe(() => {
          this.router.navigate(['/users']);
        });
    } else {
      this.userService.createUser(this.userForm.value).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }
}
