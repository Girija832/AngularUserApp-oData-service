import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  User_data: User[];
  displayedColumns: string[] = ['UserName', 'FirstName', 'LastName', 'Gender'];
  // dataSource: MatTableDataSource<any>;
  dataSource = new MatTableDataSource<User>();
  public userList: any = []
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(public userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.getList();
    this.dataSource.paginator = this.paginator;
  }

  getList() {
    this.userService.getUserList().subscribe(data => {
      this.userList = data.value;
      this.dataSource.data = this.userList;
    })
  }

  goToUserDetails() {
    this.router.navigate(['/user-details']);
  }

}
