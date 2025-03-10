export interface Menu {
  id: string;
  flavour: string;
  description: string;
  price: number;
  imagePath?: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface Order {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
