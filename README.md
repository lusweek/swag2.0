---
// Lukas kommentarer
    Dependensies hänger med när man kör build, devDependesies hänger inte med i build.
    Detta innebär att sidan laddar snabbare och filerna i build blir mindre om man minimerar 
    antalet dependensies. 


För att lägga till fler säkra routs:
    Gå till +layout.svelte         

För att lägga till toasts:
Koden ligger i utilis mappen.
skriv 
notifications.[ALTERNATIV]
default
error
warning
info
success

exempel:  notifications.success('Tack! Nu blir det lättare för Jakob!')

----

Ligger på Cloudflare - push i main uppdaterar hemsidan

# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
# swag2.0
