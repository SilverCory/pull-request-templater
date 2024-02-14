import { extractStage } from "./extract_ticket";

test("extractStage", () => {
  expect(extractStage("feature/1234")).toEqual("feature");
  expect(extractStage("feature/1234/")).toEqual("feature");
  expect(extractStage("feature/1234/abc")).toEqual("feature");
  expect(extractStage("feature")).toEqual("");
  expect(extractStage("feature/")).toEqual("feature");
  expect(extractStage("feature/abc")).toEqual("feature");
  expect(extractStage("feature/abc/")).toEqual("feature");
  expect(extractStage("abcdef")).toEqual("");
});

import { extractTicketNumber } from "./extract_ticket";

test("extractTicketNumber", () => {
  expect(extractTicketNumber("feature/CHK-1234-do-cool-stuff")).toEqual(
    "CHK-1234",
  );
  expect(extractTicketNumber("feature/CHK-1234")).toEqual("CHK-1234");
  expect(extractTicketNumber("feature/CHK-1234-")).toEqual("CHK-1234");
  expect(extractTicketNumber("feature")).toEqual("");
  expect(extractTicketNumber("feature/")).toEqual("");
  expect(extractTicketNumber("feature/abc-asfga")).toEqual("");
  expect(extractTicketNumber("feature/abc-/")).toEqual("");
  expect(extractTicketNumber("abc/def-do-cool-stuff")).toEqual("");
});

import { extractBranchName } from "./extract_ticket";

test("extractBranchName", () => {
  expect(extractBranchName("feature/CHK-1234-do-cool-stuff")).toEqual(
    "Do Cool Stuff",
  );
  expect(extractBranchName("feature/CHK-1234")).toEqual("");
  expect(extractBranchName("feature/CHK-1234-")).toEqual("");
  expect(extractBranchName("feature")).toEqual("Feature");
  expect(extractBranchName("feature/")).toEqual("");
  expect(extractBranchName("feature/abc-asfga")).toEqual("Abc Asfga");
  expect(extractBranchName("feature/abc-/")).toEqual("Abc /");
  expect(extractBranchName("abc/def-do-cool-stuff")).toEqual(
    "Def Do Cool Stuff",
  );
  expect(extractBranchName("def-do-cool-stuff")).toEqual("Def Do Cool Stuff");
});

import { ticketTitleFormat } from "./extract_ticket";

test("ticketTitleFormat", () => {
  const ctx: TemplateContext = {
    action: "",
    actor: "",
    pull_request: { number: 0 },
    ref: "",
    sha: "",
    workflow: "",
    base: {
      label: "main",
      ref: "main",
      sha: "1234",
    },
    head: {
      label: "feature/CHK-1234-do-cool-stuff",
      ref: "feature/CHK-1234-do-cool-stuff",
      sha: "1235",
    },
  };
  expect(ticketTitleFormat(ctx)).toEqual("RELEASE | CHK-1234 | Do Cool Stuff");
});
