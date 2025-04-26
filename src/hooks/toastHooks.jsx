import { toast } from "react-toastify";

export async function linkCopy() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    toast.info('링크가 복사되었습니다!');
  } catch (err) {
    toast.error('복사에 실패했습니다');
  }
}

export async function infoToastMessage(message) {
  toast.info(message);
}

export async function successToastMessage(message) {
  toast.success(message);
}

export async function warningToastMessage(message) {
  toast.warning(message);
}

export async function errorToastMessage(message) {
  toast.error(message);
}