export interface iPost {
  id: string;
  name: string;
  text: string;
  location: string;
  openDay: string;
  closeDay: string;
  openTime: string;
  closeTime: string;
  cityId: string;
  postCategory: {
    id: number;
    description: string;
  };
  postStatusId: number;
}
