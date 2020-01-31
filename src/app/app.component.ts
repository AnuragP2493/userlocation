import { Component, OnInit } from "@angular/core";
import { UsersService } from "./service/users.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app";
  user: any[] = [];
  constructor(private userService: UsersService) {}
  ngOnInit() {
    this.userService.getuserdata().subscribe(data => {
      this.user = <any[]>data["user"];
    });
  }
}
