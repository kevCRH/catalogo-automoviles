export interface Model {
  id: number;
  name: string;
  model: string;
  year: number;
  type: string;
  price: string;
  manufacturerId: number;
  designerId: number;
  image: string;
}

export interface ModelDetails {
  name: string;
  model: string;
  year: number;
  type: string;
  price: string;
  designerName: string;
  manufacturerName: string;
}
