import { makeAutoObservable } from "mobx";
import { API } from "../apis";
import { postStore } from "./posts.store";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export interface IFormPost {
  id?: number;
  name: string;
  description: string;
  image: string;
  createdDate: string;
}

class PostFormStore {
  formData: IFormPost = {
    name: "",
    description: "",
    image: "",
    createdDate: "",
  };
  typeOfForm: "add" | "detail" | "update" | "delete" | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setField<K extends keyof IFormPost>(name: K, value: IFormPost[K]) {
    this.formData[name] = value;
  }

  resetForm() {
    this.formData = {
      name: "",
      description: "",
      image: "",
      createdDate: "",
    };
    this.typeOfForm = undefined;
  }

  async submitAddForm() {
    try {
      const response = await API.post("/posts", this.formData);

      if (response.data) {
        const sweetAlert = withReactContent(Swal);

        sweetAlert.fire({
          title: "<p>Tạo post thành công!</p>",
          timer: 800,
          icon: "success",
        });
      }

      this.resetForm();

      postStore.getPosts();
    } catch (error) {
      const sweetAlert = withReactContent(Swal);

      sweetAlert.fire({
        title: "<p>Có lỗi xảy ra!</p>",
        timer: 800,
        icon: "error",
      });
    }
  }

  setTypeOfForm(type: typeof this.typeOfForm) {
    this.typeOfForm = type;
  }

  async updatePost() {
    try {
      const { data } = await API.put("/posts", this.formData);

      if (data) {
        const sweetAlert = withReactContent(Swal);

        sweetAlert.fire({
          title: "<p>Cập nhập post thành công!</p>",
          timer: 800,
          icon: "success",
        });
      }
      this.resetForm();

      postStore.getPosts();
    } catch (error) {
      const sweetAlert = withReactContent(Swal);

      sweetAlert.fire({
        title: "<p>Có lỗi xảy ra!</p>",
        timer: 800,
        icon: "error",
      });
    }
  }

  async deletePost() {
    try {
      const { data } = await API.delete(`/posts?id=${this.formData.id}`);
      if (data) {
        const sweetAlert = withReactContent(Swal);

        sweetAlert.fire({
          title: "<p>Xoá thành công!</p>",
          timer: 800,
          icon: "success",
        });
      }

      this.resetForm();

      postStore.getPosts();
    } catch (error) {
      console.error("There was an error deleting the post!", error);
    }
  }
}

export const postFormStore = new PostFormStore();
