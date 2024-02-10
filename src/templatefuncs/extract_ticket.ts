export const extractTicketNumber = (s: string) => {
  const ticketNumber = s.split("-").slice(0, 2).join("-").toUpperCase();
  if (ticketNumber.match(/^([A-Z]+-[0-9]+)$/)) {
    return ticketNumber;
  }
  return "";
};

export const extractBranchName = (s: string) => {
  const ticketNumber = s.split("-");
  ticketNumber.shift();
  ticketNumber.shift();
  return ticketNumber.join(" ");
};

export const withPipe = (s: string) => {
  return s ? `${s} | ` : "";
};
