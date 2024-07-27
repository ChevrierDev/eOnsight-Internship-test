# eOnsight-Internship-test local deployement instruction

## Client setup
Once you are in the root directory of the client folder, run the following command to install all dependencies specified in the package.json file. This ensures that all necessary packages are available for development:
```
npm install

```
This command will install all the dependencies required for the client-side application to run correctly.

## Important: Setting Up Mapbox for Location Feature
To use the "Locate" action button, which will display a map with the precise latitude and longitude of each bridge, you need to set up the Mapbox API.<br> Mapbox(https://www.mapbox.com/) offers a free tier with 50,000 map loads per month, which should be sufficient for development and testing purposes.<br>
1- Generate a Mapbox Access Token: <br>
Go to the Mapbox website and sign up or log in.<br>
Navigate to your account and generate a new access token.<br>
3- Create a .env File:<br>
At the root of the client directory, create a new file named .env<br>
Add the following line to the .env file, replacing your_token with the Mapbox access token you generated:
```
VITE_MAP_ACCESS_TOKEN=your_token

```
If you choose not to use the Mapbox API, the "Locate" feature will not work. You can still use the application, but for the best user experience, it is recommended to set up the Mapbox API.<br>
This project uses Vite as the development environment. Vite is a fast build tool that leverages the power of native ES modules, and it has specific conventions for handling environment variables. It is important to follow these conventions to ensure that environment variables are correctly interpreted during development.<br>
Vite requires that all environment variables intended for use in your client-side code be prefixed with VITE_. This prefix ensures that the variables are exposed to the client-side bundle and can be accessed within your React application. Variables without this prefix will not be included in the bundle and will be unavailable in your client-side code.
By following this convention, you make sure that the VITE_MAP_ACCESS_TOKEN variable is available to your React components.

### Running the Vite Development Server
Once you have set up your environment and installed all dependencies, you can start the Vite development server to run the client-side application.<br>
Start the Vite development server by running the following command:
```
npm run dev

```
Access the application by navigating to the following URL in your web browser:
```
http://localhost:5173/

```
This will open the Vite development server and allow you to view and interact with the project locally.

Congratulations! You have successfully set up the client-side environment for the application. Your client-side application is now running locally. You can interact with it and verify all functionalities.

If you followed all the instructions and set up the .env file correctly, your Mapbox functionality should work seamlessly. Enjoy exploring the application!

Next, you can proceed to set up the server-side environment by following the instructions in the server directory's README file. If you haven't already, it's recommended to set up the server first to ensure the backend is ready to support the client application.

Happy coding !