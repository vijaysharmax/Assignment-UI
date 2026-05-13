import { Component,OnInit } from '@angular/core';
import { UserserviceService } from '../../Services/userservice.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule, FormsModule,CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{
 users: any[] = [];

  searchText = '';

  constructor(private userService: UserserviceService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {

    this.userService.getUsers(this.searchText)
      .subscribe((response: any) => {
        this.users = response;
      });
  }

  search() {
    this.loadUsers();
  }
}
