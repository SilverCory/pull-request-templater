import handlebars, { SafeString } from "handlebars";
import {
  extractBranchName,
  extractTicketNumber,
  ticketTitleFormat,
  withPipe,
} from "./extract_ticket";
import { refTitle } from "./strings";

export default function () {
  // Ticket functions
  handlebars.registerHelper("withPipe", withPipe);
  handlebars.registerHelper("extractBranchName", extractBranchName);
  handlebars.registerHelper("extractTicketNumber", extractTicketNumber);
  handlebars.registerHelper("ticketFmt", ticketTitleFormat);

  // String functions
  handlebars.registerHelper("refTitle", refTitle);

  // Util functions
  handlebars.registerHelper("json", (a) => {
    return new SafeString(JSON.stringify(a, null, 2));
  });
  handlebars.registerHelper("eq", (a, b) => a === b);
  handlebars.registerHelper("neq", (a, b) => a !== b);
  handlebars.registerHelper("and", (a, b) => a && b);
  handlebars.registerHelper("or", (a, b) => a || b);
  handlebars.registerHelper("not", (a) => !a);
  handlebars.registerHelper("gt", (a, b) => a > b);
  handlebars.registerHelper("lt", (a, b) => a < b);
  handlebars.registerHelper("gte", (a, b) => a >= b);
  handlebars.registerHelper("lte", (a, b) => a <= b);
}
