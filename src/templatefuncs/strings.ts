export const refTitle = (branch: string) => {
  return branch
    .split("-")
    .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
    .join(" ");
};
