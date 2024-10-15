# winecheeseapp
Find your local Cheese and Winemakers in our peer-edited database. Find your NEW FAVORITES. Support your local Cheese and Winemaker. 
Project uses Node.js, Express, EJS, Mongoose, MongoDB, Atlas, Bootstrap project. Full stack application

Client is able to explore the database of both winemakers and cheesemakers organized by location with the help of Mapbox as well as sorted by maker type. (<b>*2024 Update:</b> App now uses similar, but free Maptiler instead of Mapbox.)
Any user can explore the makers as well as read reviews. If a user wishes to add makers to the database (which is recommended) they must register on the app. They are then able to make an unlimited number of entries to the database as well as leave reviews. 
Only users who have added a certain maker may edit or delete the maker from the database.
App utilizes Passport for user authentication and authorization. It protects both client side and server side inputs using boostrap and joi respectively. 

Improvements to the app that could be made are limiting the number of photos allowed to be added to each maker and changing how reveiws are saved to each maker. The app also runs slower than expected. 
In future commits bootstrap could be downloaded as a file rather than linked to the boiler plate. This may also allow multiple versions from bootstrap included in the app to be eliminated.

A seeds and seeds/index file are included with the specific purpose of seeding the database on installation with read maker data. In the future desired real data could be scraped
and added to the seeds file. It is recommended that the JS loop in seeds/index is changed to a recursive function as it is now a simple for loop that seeds the minute amount of real data included with the app.

## Deployments - Using Heroku (Paid), Render (Free): 
### Heroku:
<b>Deployed App (master branch):</b> https://cryptic-ravine-44279-c071e2832526.herokuapp.com/ <br>
<br><b>*Heroku is a paid service. App is currently deployed on Heroku at the above URL. If winecheeseapp becomes unavailable at above URL, see app where deployed on Render (free, may experience delayed first requests): https://winecheeseapp.onrender.com/</b>

#### Steps for Heroku Deployment: 

1. In root of project run `heroku create` to create heroku app.
2. Add app's required ENV variables/values to the new Heroku App using the Heroku CLI or Heroku UI via the browser.<br>
<br><b>Required ENV Variable:</b>
```
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
MAPTILER_API_KEY=
SECRET=
DB_URL=
```
2. Deploy master branch to app `git push heroku master` or map another branch to master branch to deploy to app via `git push heroku <YOUR_BRANCH_NAME>:master`
4. Hit URL for deployed app to validate.
<br><br>
### Render: 
<b>Deployed App (master branch):</b> https://winecheeseapp.onrender.com/

<b>*This Node Express App is deployed on Render using their Free Tier. Free tier web services are spun down after 15 minutes of inactivity. May experience up to 1 minute delay for first requests.</b>

More info on Render Web Services for hosting dynamic web apps here: https://docs.render.com/web-services
<br>