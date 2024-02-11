export const refTitle = (branch: string) => {
  return branch
    .split("-")
    .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(" ");
};

export const json = (s: string) => {
  return JSON.stringify(s);
};
