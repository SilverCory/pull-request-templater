import { context, getOctokit } from "@actions/github";
import * as handlebars from "handlebars";
import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types";
import { getConfiguration } from "./configuration";
import { debug, setFailed } from "@actions/core";

import TemplateFuncs from "./templatefuncs";
TemplateFuncs(); // Load template functions.

const run = async (): Promise<void> => {
  const pr = context.payload.pull_request;
  if (!pr || !pr.body || !pr.title) {
    throw new Error("This action is only supported on pull requests");
  }

  const config = getConfiguration();

  const viewData: TemplateView = {
    custom: config.customInput,
    context: {
      sha: context.sha,
      ref: context.ref,
      workflow: context.workflow,
      action: context.action,
      actor: context.actor,
      head: {
        ref: context.payload.pull_request?.head.ref,
        label: context.payload.pull_request?.head.label,
        sha: context.payload.pull_request?.head.sha,
      },
      base: {
        ref: context.payload.pull_request?.base.ref,
        label: context.payload.pull_request?.base.label,
        sha: context.payload.pull_request?.base.sha,
      },
      pull_request: {
        number: context.issue.number,
      },
    },
  };

  debug("Body: " + pr.body?.slice(0, 50) + "...");
  debug("Pull Request Title: " + pr.title || "");

  const newBody = handlebars.compile(pr.body)(viewData);
  const newTitle = handlebars.compile(pr.title)(viewData);

  debug("New Body: " + newBody.slice(0, 50) + "...");
  debug("New Title: " + newTitle || "");

  const octokit = getOctokit(config.githubToken);

  const request: RestEndpointMethodTypes["pulls"]["update"]["parameters"] = {
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: pr.number,
    body: newBody,
    title: newTitle,
  };
  const response: RestEndpointMethodTypes["pulls"]["update"]["response"] =
    await octokit.rest.pulls.update(request);

  debug(`Response: ${response.status}`);
  if (response.status !== 200) {
    throw new Error(
      `Updating the pull request has failed: ${JSON.stringify(response)})}`,
    );
  }
};

try {
  await run();
} catch (e) {
  setFailed(`${e}`);
}
