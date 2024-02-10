# Pull Request Templater

This action is a simple way to add dynamic content to your PR templates. It can be used to add the branch name as part of a link to the ticketing system, for example.

## Inputs

### `github-token`

The `GITHUB_TOKEN` secret to access the repository. Defaults to github-actions internal `${{ github.token }}` Token.

### `custom-input`

The `custom-input` sets additional data to access in your templates. For example data from previous workflow steps.

## Example usage

### Basic

```yaml
name: "Pull Request Template"
on:
  pull_request:
    types: [edited, opened, reopened]

jobs:
  pr_template:
    runs-on: ubuntu-latest
    name: Apply dynamic template changes
    steps:
      - name: Random Number Generator
        id: random-number-generator
        shell: bash
        run: echo "random-number=$(echo $RANDOM)" >> $GITHUB_OUTPUT
      - uses: silvercory/pull-request-templater@latest
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          customInput: |
            {
              "randomNumber": "${{ steps.random-number-generator.outputs.random-number }}"
            }
```

#### Can render:

```handlebars
Your PR was created: {{custom.randomNumber}}
```

## Helper Functions

Since this action uses handlebars, you can use any of the helper functions available in handlebars.

Available helper functions:

- `withPipe(string)`
  - Checks whether a string is empty, if it's not appends `|` for formatting.
- `extractBranchName(string)`
  - Extracts everything after a ticket number in a branch name.
- `extractTicketNumber`
  - Extracts a ticket number from a branch name. (Branch name format as follows: `IDT-1234-branch-name`)
