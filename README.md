* created using nodeJS 10.15.3, but should work with any nodeJS version since it's really basic
* usual commands : npm install to setup and npm start to run

Context : Dataset instance generates top 3 reviews for a given time period. It generates different ones every 30s.

TASK 1
* implement a simple cache class (check server.js); its instance will be used in the requests for data (task / web socket) and, depending on date or request, it gives the cached data or calls the required data generation function.
* change the router's "not found"/404 response to return a simple HTML with h1 "Not Found" instead of a JSON
* implement the REST call to the server from the client for the '/task' route in main.js -> manualGetTop3

TASK 2 - Final state 
* the client app should show a UI-responsive list of current top-3 reviews, and to it's left (for bigger screens), or underneath it (for smaller screens) a history of top-3 reviews
* in case of disconnects and reconnects while the page is open, the app should re-sync its history so it shows any missed top-3 reviews

Notes: 
- This template serves as a starting point to expedite work
- You can use any resource you want to achieve the given tasks (libraries, frameworks, etc.) 
- There are no restrictions on consulting any source of information
- It doesn't matter if you don't finish everything, send in whatever you manage to do
- If you are not comfortable with JavaScript, you can implement/write the solution in any language/framework/platform you want
- Time limit : 3h to 5h
