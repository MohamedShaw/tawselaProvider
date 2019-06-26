export const convertNumbers = (n, rtl) => {
  if (!rtl || !n) return n;

  const num = String(n);
  const id = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num.replace(/[0-9]/g, w => id[+w]);
};

export const arToENNumbers = n => {
  if (!n) return n;

  const num = String(n);
  return Number(
    num.replace(
      /[٠١٢٣٤٥٦٧٨٩]/g,
      d => d.charCodeAt(0) - 1632, // Convert Arabic numbers
    ),
  );
};
