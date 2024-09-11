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
  startDate: number;
  image: string;
}

export const formatDateToYYYYMMDD = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

class ToursStore {
  tours: ITour[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  searchKeyword: string | number | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  resetSearchForm() {
    this.searchKeyword = undefined;
  }

  // Computed value to filter tours based on searchKeyword
  get displayTour() {
    if (typeof this.searchKeyword === "string") {
      const _searchKeyword = this.searchKeyword as string;
      return this.tours.filter((tour) => {
        const isNameMatch = tour.name
          .toLowerCase()
          .includes(_searchKeyword!.toLowerCase());
        const isPriceMatch =
          !isNaN(Number(this.searchKeyword)) &&
          tour.price === parseInt(_searchKeyword!);

        //date
        const isMatchDate =
          formatDateToYYYYMMDD(new Date(tour.startDate)) === _searchKeyword;

        return isNameMatch || isPriceMatch || isMatchDate;
      });
    }

    // default, startDate larger today
    return this.tours.filter((tour) => {
      return tour.startDate > new Date().getTime();
    });
  }

  // Fetch tours from the server
  async fetchTours() {
    this.isLoading = true;
    try {
      const result = await API.get("/tours");
      if (result.data) {
        this.tours = result.data;
      }
    } catch (error) {
      this.error = "Error fetching tours";
      console.error("Error fetching tours:", error);
    } finally {
      this.isLoading = false;
    }
  }

  // Method to set the search keyword
  setSearchKeyword(keyword: string | number | undefined) {
    this.searchKeyword = keyword;
  }
}

export const toursStore = new ToursStore();
