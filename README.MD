#Manager

[![Build status](https://ci.appveyor.com/api/projects/status/tuved2sh7gmwdako?svg=true)](https://ci.appveyor.com/project/ProjectOrationi/manager)

# Setup

## Code editing

For code editing I recommend using one of the editors: Visual Studio Code, Sublime Text or Atom.
You can follow these guidelines to setup your VSC: https://medium.com/@viatsko/my-vs-code-setup-for-front-end-web-development-ac3fcc7154d6#.bfr2qkb77


## Tooling

1. Install nodejs with npm included (setup wizard option, on by default): http://nodejs.org

2. Update npm globally (use admin PowerShell for global commands): npm i -g npm

3. Go to project dir

4. Install modules: npm i


## Run

1. npm run dev

## Debug

1. Install node-inspector globally: npm i -g node-inspector

2. Run node-debug index.js


## Deploy

1. Copy source files without node_modules and dist to target machine
2. Run `npm i`
3. Run `SET NODE_ENV=production` (for PowerShell: `$env:NODE_ENV="production"`)
4. Run `npm run build`
5. Set working folder as IIS website's homedir.

## Setup windows machine for deployment

1. Install IIS
2. Install URL Rewrite module
3. Install iisnode. Run tests according to documentation to make sure it works.
4. Wait for web.config check-in.

# Tips

If you terminal (during npm install or during execution process) looks stuck: just hit enter.


# Background

Please refer to:
https://habrahabr.ru/post/264423/
https://facebook.github.io/react/
https://github.com/reactjs/redux
