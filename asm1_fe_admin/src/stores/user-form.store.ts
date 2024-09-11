import { makeAutoObservable } from "mobx";
import { API } from "../apis";
import { usersStore } from "./users.store";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export enum ERole {
  "user" = 1,
  "admin" = 2,
}

export interface IFormUser {
  id?: number;
  fullname: string;
  email: string;
  phoneNumber: string;
  address: string;
  username: string;
  password: string;
  roleId: ERole;
  status?: "active" | "lock";
}

class UserFormStore {
  formData: IFormUser = {
    fullname: "",
    email: "",
    phoneNumber: "",
    address: "",
    username: "",
    password: "",
    roleId: ERole.user, // Default value
  };
  typeOfForm: "add" | "detail" | "update" | "delete" | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setField<K extends keyof IFormUser>(name: K, value: IFormUser[K]) {
    this.formData[name] = value;
  }

  resetForm() {
    this.formData = {
      fullname: "",
      email: "",
      phoneNumber: "",
      address: "",
      username: "",
      password: "",
      roleId: ERole.user,
    };
    this.typeOfForm = undefined;
  }

  async submitAddForm() {
    try {
      const response = await API.post("/users", this.formData);
      if (response.data) {
        const sweetAlert = withReactContent(Swal);

        sweetAlert.fire({
          title: "<p>Tạo user thành công!</p>",
          timer: 800,
          icon: "success",
        });
      }

      this.resetForm();

      usersStore.getUser();
    } catch (error) {
      console.error("There was an error adding the user!", error);
    }
  }

  setTypeOfForm(type: typeof this.typeOfForm) {
    this.typeOfForm = type;
  }

  updateStatusUser() {
    this.formData.status = this.formData.status === "lock" ? "active" : "lock";
  }

  async updateUser() {
    try {
      const { data } = await API.put("/users", this.formData);

      if (data) {
        const sweetAlert = withReactContent(Swal);

        sweetAlert.fire({
          title: "<p>Cập nhập User thành công!</p>",
          timer: 800,
          icon: "success",
        });
      }
      this.resetForm();

      usersStore.getUser();
    } catch (error) {
      console.error("There was an error adding the user!", error);
    }
  }

  async deleteUser() {
    try {
      const { data } = await API.delete(`/users?id=${this.formData.id}`);
      if (data) {
        const sweetAlert = withReactContent(Swal);

        sweetAlert.fire({
          title: "<p>Xoá thành công!</p>",
          timer: 800,
          icon: "success",
        });
      }
      this.resetForm();
      usersStore.getUser();
    } catch (error) {
      console.error("There was an error adding the user!", error);
    }
  }
}

export const userFormStore = new UserFormStore();
