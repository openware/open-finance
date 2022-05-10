# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.
## One-click run

### Installation

## Deployment to K8s

To deploy the component to K8s, you should do the following:

1. Install Helm
2. Export all the env-vars
3. Run `deploy/install.sh`
4. Enjoy

## Getting Started

First, run the development server:

```bash
npm run dev
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

```
$ GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
