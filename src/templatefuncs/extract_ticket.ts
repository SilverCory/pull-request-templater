import { refTitle } from "./strings";

export const extractStage = (s: string) => {
  let parts = s.split("/");
  if (parts.length > 1) {
    return parts[0];
  }
  return "";
};

export const extractTicketNumber = (s: string) => {
  const stage = extractStage(s);
  s = s?.slice(stage.length + 1);
  const ticketNumber = s?.split("-").slice(0, 2).join("-").toUpperCase();
  if (ticketNumber?.match(/^([A-Z]+-[0-9]+)$/)) {
    return ticketNumber;
  }
  return "";
};

export const extractBranchName = (s: string) => {
  const stage = extractStage(s);
  const ticketNumber = extractTicketNumber(s);
  s = s.slice(
    (stage?.length && stage?.length + 1) +
      (ticketNumber?.length && ticketNumber?.length + 1),
  );
  return refTitle(s);
};

export const withPipe = (s: string, pipeChar: string = "|") => {
  return s ? `${s} ${pipeChar} ` : "";
};

export const ticketTitleFormat = (context: TemplateContext) => {
  return (
    withPipe(
      context.base.ref === "main" || context.base.ref === "master"
        ? "RELEASE"
        : "",
    ) +
    withPipe(extractTicketNumber(context.head.ref)) +
    extractBranchName(context.head.ref)
  );
};
