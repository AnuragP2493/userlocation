import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges
} from "@angular/core";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit, OnChanges {
  @Input("user") user: any[];
  lat1: any = 53.339428; // Dublin lattitude
  lat2: any;
  lon1: any = -6.257664; // Dublin longitude
  lon2: any;
  distance: any;
  nearByUser: any[] = [];
  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.user.filter(item => {
      (this.lat2 = item.latitude), (this.lon2 = item.longitude);
      this.getDistanceFromLatLonInKm(
        this.lat1,
        this.lon1,
        this.lat2,
        this.lon2,
        item
      );
    });
  }

  ngOnInit() {}

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2, user) {
    let obj = {
      dis: null,
      user: null
    };
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    if (d < 100) {
      obj.dis = d;
      obj.user = { ...user };

      this.nearByUser.push(obj);
      this.nearByUser.sort(this.sortById);
    }
  }

  sortById(a, b) {
    let comp = 0;
    if (a.user.user_id > b.user.user_id) {
      return (comp = 1);
    }
    if (a.user.user_id < b.user.user_id) {
      return (comp = -1);
    }
    return comp;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
}
