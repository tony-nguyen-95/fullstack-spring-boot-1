import { makeAutoObservable } from "mobx";

export interface IUser {
  id: number;
  fullname: string;
  email: string;
  phoneNumber: string;
  address: string;
  username: string;
  status: "active" | "lock";
  roleId: number;
}

class AuthStore {
  isLogin = false;
  userLogined: IUser | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
    this.checkLoginStatus();
  }

  // Check if user is logged in by looking at session storage
  checkLoginStatus() {
    const storedUser = sessionStorage.getItem("userLogined");
    if (storedUser) {
      this.isLogin = true;
      this.userLogined = JSON.parse(storedUser);
    } else {
      this.isLogin = false;
      this.userLogined = undefined;
    }
  }

  // Method to log out and clear session storage
  logout() {
    sessionStorage.removeItem("userLogined");
    this.isLogin = false;
    this.userLogined = undefined;
  }
}

const authStore = new AuthStore();
export default authStore;
