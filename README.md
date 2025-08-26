---
 
Lägga till fler säkra routs:
Gå till +layout.svelte         

Lägga till notification (toasts):
Koden ligger i utilis mappen.
skriv 
notifications.[ALTERNATIV]
default
error
warning
info
success

exempel:  notifications.success('Tack! Nu blir det lättare för Jakob!')


Lägga till firebaseTable:
    Börja med att lägga till FirebaseTable komponenten
    <FirebaseTable 
        tableContent={FBData.open_gym.tables[NUMBER*]}
        FBData={FBData}
        tableIndexToUpdate={NUMBER*}
        getData={getFBData}
    />
Lägg till en ny map i firebase tables. 
Lägg till array med namn "headers" med rubrikerna du ska ha. 
Lägg till TOM array med namn "rows"

* Alla tables ligger i CMS - kurser - open_gym - tables. 
tableIndexToUpdate={} och FBData.open_gym.tables[] ska ha en siffta som värde
baserat på vilken index de har i arrayen 'tables' i firebase.


Cloudflare:
push i main uppdaterar hemsidan

git add .  /   git add . -p
git commit -m "commentar"
git push
git checkout main
git merge dev
git push
git checout dev

git add .  /   git add . -p
git commit -m "commentar"
git push
git checkout main
git merge dev
git push
git checout dev

Dependensies & devDependensies:
    Dependensies hänger med när man kör build, devDependesies hänger inte med i build.
    Detta innebär att sidan laddar snabbare och filerna i build blir mindre om man minimerar 
    antalet dependensies.

----

## Developing

# Start server
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
