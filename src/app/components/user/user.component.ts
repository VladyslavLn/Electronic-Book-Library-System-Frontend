import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../service/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  userId: number;
  user: User;
  editing: boolean = false;
  originalFirstName: string;
  originalLastName: string;

  constructor(private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUserById(this.userId).subscribe((user) => {
      this.user = user;
      this.originalFirstName = user.firstName;
      this.originalLastName = user.lastName;
    })
  }

  toggleEdit(): void {
    this.editing = !this.editing;
    if (!this.editing) {
      this.saveUser();
    }
  }

  saveUser(): void {
    if (this.user.firstName !== this.originalFirstName
      || this.user.lastName !== this.originalLastName) {
      this.userService.updateUser(this.userId, this.user).subscribe();
    }
  }

}
