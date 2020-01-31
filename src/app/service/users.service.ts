import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  user: any[];
  constructor(private http: HttpClient) {}

  getuserdata() {
    return this.http.get("assets/user.json");
  }
}
