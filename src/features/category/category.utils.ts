/* eslint-disable no-useless-escape */
export const createSlug = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // spasi → -
    .replace(/[^\w\-]+/g, '') // hapus karakter aneh
    .replace(/\-\-+/g, '-'); // hapus double -
};
