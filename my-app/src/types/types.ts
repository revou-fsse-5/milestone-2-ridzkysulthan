export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}