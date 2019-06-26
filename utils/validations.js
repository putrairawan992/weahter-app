export const isValidEmail = (value) => {
  const gex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  return gex.test(value);
}

export const required = value => {
  if (value) {
    if (value.trim().length == 0 || value.length == 0) {
      return "masih kosong";
    } else {
      return undefined;
    }
  } else {
    return "masih kosong";
  }
};
export const requiredField = field => value =>
  value ? undefined : `${field} masih kosong.`;
export const maxLength = max => value =>
  value && value.length > max ? `tidak boleh lebih dari ${max} karakter` : undefined;
export const minLength = min => value =>
  value && value.length < min ? `minimal ${min} karakter` : undefined;
export const number = value =>
  value && isNaN(Number(value)) ? "harus berupa angka" : undefined;
export const minValue = min => value =>
  value && value < min ? `minimal ${min}` : undefined;

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
