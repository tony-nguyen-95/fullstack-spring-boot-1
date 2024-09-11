import { makeAutoObservable } from "mobx";
import { API } from "../apis";

export interface IPost {
  id: number;
  name: string;
  image: string;
  description: string;
  createdDate: string;
}

class PostStore {
  posts: IPost[] = [];
  $sizeOfPage: number = 2; // Default page size
  $currentPage: number = 1; // Default current page

  constructor() {
    makeAutoObservable(this);
  }

  setPosts(posts: IPost[]) {
    this.posts = posts;
  }

  async getPosts() {
    try {
      const response = await API.get("/posts");
      this.posts = response.data;
    } catch (error) {
      console.error("There was an error getting the posts!", error);
    }
  }

  get lengthOfPosts() {
    return this.posts.length;
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

  get paginatedPosts() {
    const start = (this.currentPage - 1) * this.$sizeOfPage;
    const end = start + this.$sizeOfPage;
    return this.posts.slice(start, end);
  }
}

export const postStore = new PostStore();
