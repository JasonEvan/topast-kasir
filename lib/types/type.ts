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

export interface OrderOnDatabase {
  customer_name: string;
  gross_amount: number;
  item_details: Order[];
  status: string;
  created_at: string;
}
