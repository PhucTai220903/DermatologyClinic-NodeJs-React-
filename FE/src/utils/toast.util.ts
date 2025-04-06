import toastr from "toastr";
import "toastr/build/toastr.min.css";

const toastrOptions = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-top-right",
  timeOut: 3000
};

export const showSuccessToast = (message: string) => {
  toastr.options = toastrOptions;
  toastr.success(message, "Thành công", {
  toastClass: "success-notification",
});

};

export const showErrorToast = (message: string) => {
  toastr.options = toastrOptions;
  toastr.error(message, "Thất bại ", {
  toastClass: "error-notification",
});

};