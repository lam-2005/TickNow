import slugify from "slugify";
const convertSlug = (text: string) => {
  return slugify(text, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    lower: true, // convert to lower case, defaults to `false`
    locale: "vi", // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });
};

export const getIdFromSlug = (word: string) => {
  const str = word;
  const words = str.split("-");
  return words[words.length - 1];
};
export default convertSlug;
