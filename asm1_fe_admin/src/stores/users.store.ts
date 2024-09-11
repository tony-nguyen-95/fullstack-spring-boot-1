import { makeAutoObservable } from "mobx";
import { API } from "../apis";

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

class UsersStore {
  users: IUser[] = [];
  $sizeOfPage: number = 2; // Default page size
  $currentPage: number = 1; // Default current page

  constructor() {
    makeAutoObservable(this);
  }

  setUsers(users: IUser[]) {
    this.users = users;
  }

  async getUser() {
    try {
      const response = await API.get("/users");
      this.users = response.data;
    } catch (error) {
      console.error("There was an error getting the users!", error);
    }
  }

  get lengthOfUsers() {
    return this.users.length;
  }

  get sizeOfPages() {
    return this.$sizeOfPage;
  }

  get currentPage() {
    return this.$currentPage;
  }

  setPageSize(size: number) {
    this.$sizeOfPage = size;
  }

  setCurrentPage(page: number) {
    this.$currentPage = page;
  }

  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.$sizeOfPage;
    const end = start + this.$sizeOfPage;
    return this.users.slice(start, end);
  }
}

export const usersStore = new UsersStore();
