import { getInput } from "@actions/core";

export type Configuration = {
  githubToken: string;
  customInput: string;
};

export const getConfiguration = (): Configuration => {
  return {
    githubToken: getInput("github-token"),
    customInput: JSON.parse(getInput("custom-input")),
  };
};
