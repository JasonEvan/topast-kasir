import {
  getDocs,
  collection,
  getFirestore,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import app from "./init";
import * as bcrypt from "bcrypt";
import { Menu, Order, User } from "../types/type";

const firestore = getFirestore(app);

export async function getAllData<T>(collectionName: string): Promise<T[]> {
  const snapshots = await getDocs(collection(firestore, collectionName));

  const data = snapshots.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data as T[];
}

export async function addNewUser({
  email,
  password,
  isAdmin,
}: {
  email: string;
  password: string;
  isAdmin: boolean;
}) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const data = await addDoc(collection(firestore, "users"), {
    email,
    password: hashedPassword,
    isAdmin,
  });

  return data;
}

export async function checkEmailAndPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const data = await getAllData<User>("users");
  let isTrue = false;
  for (const user of data) {
    if (user.email == email) {
      isTrue = await bcrypt.compare(password, user.password);
      break;
    }
  }
  return isTrue;
}

export async function addOrder({
  order_id,
  item_details,
  customer_name,
  gross_amount,
  isDigital,
}: {
  order_id: string;
  item_details: Order[];
  customer_name: string;
  gross_amount: number;
  isDigital: boolean;
}) {
  const data = await setDoc(doc(firestore, "orders", order_id), {
    customer_name,
    item_details,
    gross_amount,
    status: isDigital ? "pending" : "settlement",
    created_at: new Date().toISOString(),
  });

  return data;
}

export async function updateStatusOrder(order_id: string, status: string) {
  await updateDoc(doc(firestore, "orders", order_id), {
    status,
  });
}

export async function deleteOrder(order_id: string) {
  await deleteDoc(doc(firestore, "orders", order_id));
}

export async function addNewMenu({
  flavour,
  description,
  price,
  imagePath,
}: {
  flavour: string;
  description: string;
  price: number;
  imagePath?: string;
}) {
  const data = await addDoc(collection(firestore, "menus"), {
    flavour,
    description,
    price,
    imagePath: imagePath == null || imagePath == undefined ? "" : imagePath,
  });

  return data;
}

export async function getMenuById(id: string): Promise<Menu | null> {
  const snapshot = await getDoc(doc(firestore, "menus", id));
  if (snapshot) {
    return snapshot.data() as Menu;
  }
  return null;
}

export async function updateMenu(
  id: string,
  data: { flavour: string; description: string; price: number }
) {
  try {
    await updateDoc(doc(firestore, "menus", id), data);
  } catch (error) {
    console.log(error);
    return false;
  }
  return true;
}

export async function deleteMenu(id: string) {
  await deleteDoc(doc(firestore, "menus", id));
}

export async function getAdminById(id: string): Promise<User | null> {
  const snapshot = await getDoc(doc(firestore, "users", id));

  if (snapshot) {
    return snapshot.data() as User;
  }

  return null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const snapshots = await getDocs(collection(firestore, "users"));

  const userDoc = snapshots.docs.find((doc) => doc.data().email === email);

  return userDoc ? ({ id: userDoc.id, ...userDoc.data() } as User) : null;
}

export async function updateAdmin(
  id: string,
  data: { email: string; isAdmin: boolean }
): Promise<boolean> {
  try {
    await updateDoc(doc(firestore, "users", id), data);
  } catch (error) {
    console.error(error);
    return false;
  }

  return true;
}

export async function deleteAdmin(id: string) {
  await deleteDoc(doc(firestore, "users", id));
}

export async function getTotalPenjualan() {
  try {
    const snapshots = await getDocs(collection(firestore, "orders"));

    let total = 0;
    snapshots.forEach((doc) => {
      total += doc.data().gross_amount || 0;
    });

    return total;
  } catch (error) {
    console.error(error);
    return 0;
  }
}
