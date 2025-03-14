import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from '../../services/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';  

@Component({
  standalone: true,
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl:'./user-list.component.css',
  imports: [CommonModule, NgFor],

})
export class UserListComponent implements OnInit {
  users: User[] = [];
  private unsubscribe: Subject<any> = new Subject<any>();

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService
      .getUsers()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((users) => {
        console.log(users);
        this.users = users;
      });
  }

  deleteUser(userId: number) {
    this.users = this.users.filter(user => user.id !== userId);
    
  }

  createUser() {
    this.router.navigate(['/users/new']);
  }

  editUser(id:number) {
    this.router.navigate(['users/edit/'+ id]);
    console.log(id)
  }
}
