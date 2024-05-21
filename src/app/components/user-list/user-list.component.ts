import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {ResponseWithPagination} from "../../models/pagination";
import {User} from "../../models/user";
import {UserService} from "../../service/user.service";
import {catchError, of, tap} from "rxjs";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: User[];
  displayedColumns: string[] = ['ID','Email', 'First Name', 'Last Name', 'Actions'];
  pageEvent: PageEvent;
  length: number;
  pageSize: number;
  pageIndex: number;
  deleteConfirmation: number | null = null;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers(0, 10)
      .subscribe((response: ResponseWithPagination<User>) => {
        this.users = response.content;
        this.length = response.totalElements;
        this.pageSize = response.size;
        this.pageIndex = response.number;
      });
  }

  deleteUser(userId: number) {
    this.userService.deleteUserById(userId).pipe(
      tap(() => this.getAllUsers()),
      catchError(error => {
        console.error(error);
        return of();
      })
    ).subscribe();
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.userService.getAllUsers(e.pageIndex, e.pageSize)
      .subscribe((response: ResponseWithPagination<User>) => {
        this.users = response.content;
      })
  }
}
