import Swal from "sweetalert2";

export function errorAlert(text: string) {
  Swal.fire({
    icon: "error",
    title: "Error",
    text,
  });
}

export function successAlert(text: string) {
  Swal.fire({
    icon: "success",
    title: "Success",
    text,
  });
}
