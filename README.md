# eOnsight-Internship-test local deployement instruction

## Bridge Status Dashboard
This project is a web application for monitoring the status of various bridges, including their inspection dates, conditions, traffic loads, and geospatial locations. The application provides features such as filtering, searching, and a pie chart visualization of bridge conditions. Additionally, it includes a map for visualizing bridge locations based on geospatial data.

## Features
Bridge Table: View and manage bridges, including adding, editing, and deleting entries.<br>
Filtering and Searching: Filter bridges by inspection date, status, and traffic load, and search by bridge name.<br>
Pie Chart Visualization: Visualize the distribution of bridge conditions using Chart.js.<br>
Map Localization: Display bridge locations on a map using geospatial data.

## Technologies Used
### Backend
PostgreSQL: Database for storing bridge data.<br>
PostGIS: Extension to PostgreSQL that provides geospatial data support.<br>
Python: for backend logic.<br>
Django: Web framework for building the backend.<br>
Django REST Framework: Toolkit for building Web API.
### Frontend
React.js: JavaScript library for building the user interface.<br>
TypeScript: Superset of JavaScript for adding static types.<br>
TailwindCSS: Utility-first CSS framework for styling.<br>
Chart.js: JavaScript library for creating charts, used for the pie chart visualization.

## Local Setup
### Prerequisites
Node.js: Ensure you have Node.js latest v installed (https://nodejs.org/). <br>
Python: Ensure you have Python  latest v installed (https://www.python.org/).<br>
PostgreSQL: Ensure you have PostgreSQL latest v installed (https://www.postgresql.org/).

### Important Setup Instructions
Before setting up the client or server environments, you must read the <a href='https://github.com/ChevrierDev/eOnsight-Internship-test/blob/main/full-stack-assessment-test-candidate/SETUP_DATABASE.md'>SETUP_DATABASE.md</a> file located in the <a href='https://github.com/ChevrierDev/eOnsight-Internship-test/tree/main/full-stack-assessment-test-candidate'>full-stack-assessment-test-candidate directory</a>. This file contains detailed instructions on how to set up the database, which must be ready before proceeding with the client or server setup.
After setting up the database, refer to the README files in the client and server directories for further instructions on how to set up each environment.

### Populate Data base
Once the database is set up, you can populate it by executing the <a href='https://github.com/ChevrierDev/eOnsight-Internship-test/blob/main/full-stack-assessment-test-candidate/import_csv_to_db.py'>import_csv_to_db.py</a> file located in the <a href='https://github.com/ChevrierDev/eOnsight-Internship-test/tree/main/full-stack-assessment-test-candidate'>full-stack-assessment-test-candidate directory</a>.<br>
1- Open your terminal or command prompt.<br>
2- Navigate to the full-stack-assessment-test-candidate directory by running the following command from the root directory:
```
cd full-stack-assessment-test-candidate

```
3- Execute the script to import the data:
```
python import_csv_to_db.py

```
After executing the script, you can verify that the data has been correctly imported by running the<a href='https://github.com/ChevrierDev/eOnsight-Internship-test/blob/main/full-stack-assessment-test-candidate/verify_import_csv_to_db.py'>verify_import_csv_to_db.py</a>script:
```
python verify_import_csv_to_db.py

```

### Next Steps
Now that your database is set up and populated, you can proceed to set up the client and server environments. Detailed instructions for setting up these environments can be found in the respective README files located in the server and client directories.
Please refer to these README files for the following: <br> 
<a href='https://github.com/ChevrierDev/eOnsight-Internship-test/blob/main/client/README.md'>Client Setup Instructions</a> <br>
<a href='https://github.com/ChevrierDev/eOnsight-Internship-test/blob/main/server/README.md'>Server Setup Instructions </a>



The next instructions you will see in this README will focus on setting up the root environment of the project.

## Root Directory Setup
#### Install Dependencies
To set up the root directory, you need to install the necessary dependencies. This project uses concurrently to manage multiple processes simultaneously, such as running the client, server, and Tailwind CSS watcher.<br>
1- Open a terminal.<br>
2- Navigate to the root directory of the project.<br>
3- Run the following command to install the dependencies listed in the package.json file:
```
npm install

```
#### Use Concurrently
Once the dependencies are installed, you will be able to use concurrently to automate the process of running the client, server, and Tailwind CSS watcher simultaneously. The concurrently module allows you to manage these processes efficiently, making development easier and faster.

You will find specific scripts in the package.json file that use concurrently to run all these services together. After setting up the client and server environments as described in their respective README files, you will be able to start all the necessary services with a single command.

#### Warning
The server script in package.json is designed to activate the virtual environment and run the Django development server. Here’s the script:
```
"scripts": {
  "server": "cd server && .\\djangoenv\\Scripts\\activate && python manage.py runserver"
}
```
in this script, djangoenv is the name given to the virtual environment. If your virtual environment is named djangoenv and is located in the server directory, you can use this command as is.

However, if you have named your virtual environment differently, you will need to update djangoenv to the name of your virtual environment.

## Finishing Up
Now you have finished setting up the root directory. You can proceed to set up the server and the client environments.

I recommend starting with the server setup. Please refer to the README files in the server and client directories for detailed instructions on how to set up each environment.