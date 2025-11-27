# Phases for iterative app development

0. Clarification and fixup

- ask for clarification of instructions and prompts that you don't understand
  - you should ask clarification questions and edit instruction files so that they are clear, precise, doesn't have typos, there are no conflicting instructions, all my questions are resolved etc.
- base mcp server should be set up
  - github
  - [dokploy](https://github.com/Dokploy/mcp)
  - [shadcn](https://ui.shadcn.com/docs/mcp)
  - other that you recommend (list and ask for them separately)

1. Plan

- there should be couple things planned, agreed upon and accepted by me before moving to the next steps
  - techstack
  - used tools
  - architecture of application
- Not every detail needs to be finalized in this step. It should rather be a reasonable baseline. Changes and enhancements will certainly come later.
  - The facts and tools needed for the MVP should be established, and all architectural decisions that need to be made at the beginning of the project should be made, necessarily having in mind the future of the project and possible development direction
- outcome of this step should be separate readme with agreements listed for future reference. This should be easily understandable for any engineer who want to have a grasp about the project. It should be simple and precise without unnecessary details. This would be the baseline for future documentation.
- requirements described in GEMINI.md is my initial plan, it could be discussed and you can propose different approaches if there are better ways to achieve something
- after this phase you should not make changes to instruction files (unless explicitly asked to do so), and you should base your actions on agreements made in this readme

2. Setup repo

- dev environment
  - environment should be fully functional (linting, formatting, import aliases etc.)
- mcp servers
  - additional mcp servers should be added for new tools and architecture defined in planning step
- folder structure
- all meta and configuration files

3. Deployment flow implementation

- hello world for frontend and backend
- contenerization
- CI pipeline definition

4. Features implementation

- do it iteratively, feature by feature
- each change should be different PR, nicely encapsulated and easy to review and test
- use good practices for app design and coding
- for each change write/update also developer documentation
  - this documentation should always be up to date and easy to jump into
  - this documentation should be in the repo

5. Documentation

- review developer documentation after all features are implemented. Make sure it is concise and easy to get what you need without the need to read all of it.
- write comprehensive, but concise and easy to understand user facing documentation
  - this should be inside app, on some how to page or something like that
  - by this "documentation" I mean nice descriptions on each page, not only one page with all information. This should be convenient from the user perspective, they should know what app is doing when they are using it without the need to read, or watch tutorials

6. Polishing

- making app look and feel awesome
- hardening etc.
