import { makeAutoObservable } from "mobx";
import { API } from "../apis";
import { toursStore } from "./tours.store";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export interface IFormTour {
  id?: number;
  name: string;
  place: string;
  price: number;
  description: string;
  image: string;
  startDate: string;
  durationDay: number;
  status?: "active" | "inactive";
}

class TourFormStore {
  formData: IFormTour = {
    name: "",
    place: "",
    price: 0,
    description: "",
    image: "",
    startDate: "",
    durationDay: 0,
    status: "active", // Default value
  };
  typeOfForm: "add" | "detail" | "update" | "delete" | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setField<K extends keyof IFormTour>(name: K, value: IFormTour[K]) {
    this.formData[name] = value;
  }

  resetForm() {
    this.formData = {
      name: "",
      place: "",
      price: 0,
      description: "",
      image: "",
      startDate: "",
      durationDay: 0,
      status: "active",
    };
    this.typeOfForm = undefined;
  }

  async submitAddForm() {
    try {
      const response = await API.post("/tours", this.formData);
      if (response.data) {
        const sweetAlert = withReactContent(Swal);

        sweetAlert.fire({
          title: "<p>Tạo tour thành công!</p>",
          timer: 800,
          icon: "success",
        });
      }

      this.resetForm();

      toursStore.getTours();
    } catch (error) {
      console.error("There was an error adding the tour!", error);
    }
  }

  setTypeOfForm(type: typeof this.typeOfForm) {
    this.typeOfForm = type;
  }

  updateStatusTour() {
    this.formData.status =
      this.formData.status === "inactive" ? "active" : "inactive";
  }

  async updateTour() {
    try {
      const { data } = await API.put("/tours", this.formData);

      if (data) {
        const sweetAlert = withReactContent(Swal);

        sweetAlert.fire({
          title: "<p>Cập nhập Tour thành công!</p>",
          timer: 800,
          icon: "success",
        });
      }

      this.resetForm();

      toursStore.getTours();
    } catch (error) {
      console.error("There was an error updating the tour!", error);
    }
  }

  async deleteTour() {
    try {
      const { data } = await API.delete(`/tours?id=${this.formData.id}`);
      if (data) {
        const sweetAlert = withReactContent(Swal);

        sweetAlert.fire({
          title: "<p>Xoá thành công!</p>",
          timer: 800,
          icon: "success",
        });
      }
      this.resetForm();
      toursStore.getTours();
    } catch (error) {
      console.error("There was an error deleting the tour!", error);
    }
  }
}

export const tourFormStore = new TourFormStore();
