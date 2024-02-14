export const refTitle = (branch: string) => {
  if (!branch) return "";
  return branch
    .split("-")
    .map((w) => w[0].toUpperCase() + w?.substring(1).toLowerCase())
    .join(" ");
};
