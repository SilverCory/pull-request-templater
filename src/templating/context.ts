type TemplateContext = {
  sha: string;
  ref: string;
  workflow: string;
  action: string;
  actor: string;
  head: {
    ref: string;
    label: string;
    sha: string;
  };
  base: {
    ref: string;
    label: string;
    sha: string;
  };
  pull_request: {
    number: number;
  };
};

type TemplateView = {
  custom: any;
  context: TemplateContext;
};
