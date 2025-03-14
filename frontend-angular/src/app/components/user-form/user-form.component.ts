import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEdit = false;
  userId: number | null = null;
  isSaved = false;
  sentForm: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      website: [''],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.userId = +id;
        this.loadUserData(this.userId);
      }
    });
  }

  loadUserData(userId: number) {
    this.userService.getUserById(userId).subscribe((user: User) => {
      this.userForm.patchValue(user);
    });
  }

  onSubmit() {
    this.userForm.markAllAsTouched();
    if (this.userForm.valid) {
      if (this.isEdit && this.userId !== null) {
        this.userService.updateUser(this.userId, this.userForm.value).subscribe(() => {
          this.isSaved = true;
          setTimeout(() => {
            this.isSaved = false;
            this.goHome();
          }, 2000);
        });
      } else {
        this.userService.createUser(this.userForm.value).subscribe(() => {
          this.isSaved = true;
          setTimeout(() => {
            this.isSaved = false;
            this.goHome();
          }, 2000);
        });
      }
    } else {
      console.log('Formulario no válido');
    }
  }

  goHome() {
    this.router.navigate(['']);
  }
}
