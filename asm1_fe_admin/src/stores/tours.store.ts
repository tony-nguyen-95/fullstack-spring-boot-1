import { makeAutoObservable } from "mobx";
import { API } from "../apis";

export interface ITour {
  id: number;
  name: string;
  description: string;
  price: number;
  durationDay: number;
  status: "active" | "inactive";
  place: string;
  startDate: string;
  image: string;
}

class ToursStore {
  tours: ITour[] = [];
  $sizeOfPage: number = 2; // Default page size
  $currentPage: number = 1; // Default current page

  constructor() {
    makeAutoObservable(this);
  }

  setTours(tours: ITour[]) {
    this.tours = tours;
  }

  async getTours() {
    try {
      const response = await API.get("/tours");
      this.tours = response.data;
    } catch (error) {
      console.error("There was an error getting the tours!", error);
    }
  }

  get lengthOfTours() {
    return this.tours.length;
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

  get paginatedTours() {
    const start = (this.currentPage - 1) * this.$sizeOfPage;
    const end = start + this.$sizeOfPage;
    return this.tours.slice(start, end);
  }
}

export const toursStore = new ToursStore();
