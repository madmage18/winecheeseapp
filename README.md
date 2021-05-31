# winecheeseapp
Find your local Cheese and Wine Makers in our peer-edited database. Find your NEW FAVORITES. Support your local Cheese and Wine Maker. 
Project uses Node.js, Express, EJS, Mongoose, MongoDB, Atlas, Bootstrap project. Full stack application

Client is able to explore the database of both wine makers and cheese makers organized by location with the help of Mapbox as well as sorted by maker type. 
Any user can explore the makers as well as read reviews. If a user wishes to add makers to the database (which is recommended) they must register on the app. They are then able to make an unlimited number of entries to the database as well as leave reviews. 
Only users who have added a certain maker may edit or delete the maker from the database.
App utilizes Passport for user authentication and authorization. It protects both client side and server side inputs using boostrap and joi respectively.

Improvements to the app that could be made are limiting the number of photos allowed to be added to each maker and changing how reveiws are saved to each maker. The app also runs slower than expected. 
In future commits bootstrap could be downloaded as a file rather than linked to the boiler plate. This may also allow multiple versions from bootstrap included in the app to be eliminated.

A seeds and seeds/index file are included with the specific purpose of seeding the database on installation with read maker data. In the future desired real data could be scraped
and added to the seeds file. It is recommended that the JS loop in seeds/index is changed to a recursive function as it is now a simple for loop that seeds the minute amount of real data included with the app.

