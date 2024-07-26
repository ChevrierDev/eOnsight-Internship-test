# eOnsight-Internship-test local deployement instruction

## Server setup
### Virtual Environment
Before downloading the dependencies listed in requirements.txt, make sure you have a virtual environment set up called djangoenv. If you don't have one, you can create it. You can name the virtual environment whatever you like, but remember to update the scripts in the root package.json accordingly.
#### Here are the steps to create and activate a virtual environment:
1- Navigate to your server directory:
```
cd /server

```
Create a virtual environment (named djangoenv or any name you prefer):
```
python -m venv djangoenv

```
Replace djangoenv with your preferred name if needed.

3- Activate the virtual environment:
On Windows:
```
djangoenv\Scripts\activate

```
On macOS/Linux:
```
source djangoenv/bin/activate

```
4- Install dependencies from requirements.txt:
```
pip install -r requirements.txt

```
#### OSGeo4W
If you haven't already installed OSGeo4W, you will need to download it from OSGeo4W(https://trac.osgeo.org/osgeo4w/) and add it to your environment variables. Here’s how to do it: <br>

1- Download OSGeo4W: Go to the OSGeo4W download page and follow the instructions to download the installer.<br>

2- Install OSGeo4W: Run the installer and follow the prompts to install OSGeo4W on your system.<br>

3- Add OSGeo4W to Environment Variables<br>

4- Under "System variables", find the Path variable and select it.<br>

5- Click "Edit", then "New", and add the path to the OSGeo4W bin directory (e.g., C:\OSGeo4W64\bin).<br>

6- Click "OK" to close all windows.

#### Configuration in settings.py
In the eOnsight directory, you will find a file named settings.py. This file contains crucial configurations for the project, including paths to the GDAL and GEOS libraries. The relevant code is:
```
#import GDAL and GEOS library to work with Geospatial data format
GDAL_LIBRARY_PATH = os.getenv('GDAL_LIBRARY_PATH', 'C:/OSGeo4W/bin/gdal309.dll')
GEOS_LIBRARY_PATH = os.getenv('GEOS_LIBRARY_PATH', 'C:/OSGeo4W/bin/geos_c.dll')

```
#### Explanation of the Code
This code sets the paths for the GDAL and GEOS libraries, which are essential for working with geospatial data formats. The GDAL_LIBRARY_PATH and GEOS_LIBRARY_PATH environment variables specify the locations of these libraries.

GDAL: Geospatial Data Abstraction Library, a translator library for raster and vector geospatial data formats.<br>
GEOS: Geometry Engine - Open Source, a C++ port of the Java Topology Suite (JTS).<br>
These libraries provide the necessary functionality for handling geospatial data within your project. The code sets default paths to these libraries, assuming they are installed in the C:/OSGeo4W/bin directory.

#### Important Steps
1- Verify GDAL Library:<br>

Navigate to your OSGeo4W/bin directory.
Check if you have a file named gdal309.dll (the version number might differ, e.g., gdal300.dll, gdal310.dll, gdal308.dll etc.).
If the file exists but with a different version, update the GDAL_LIBRARY_PATH in settings.py accordingly. For example, if you have gdal310.dll, change the line to:
```
GDAL_LIBRARY_PATH = os.getenv('GDAL_LIBRARY_PATH', 'C:/OSGeo4W/bin/gdal310.dll')

```
2- Verify GEOS Library:

Similarly, check for the geos_c.dll file in the same directory.
The file might have a different version or a slightly different name, depending on your installation (e.g., geos_c.dll, geos_c_x.dll).
Ensure the path in settings.py matches the actual file name. For example, if the file is named geos_c_x.dll, change the line to:
```
GEOS_LIBRARY_PATH = os.getenv('GEOS_LIBRARY_PATH', 'C:/OSGeo4W/bin/geos_c_x.dll')

```
By correctly setting these paths, you ensure that the project can locate and use the GDAL and GEOS libraries, which are vital for processing geospatial data. This setup step is crucial for the proper functioning of any geospatial data operations within your project.

#### Database Configuration
In the settings.py file of the eOnsight directory, you will see the following code for configuring the database:
```
DATABASES = {
    "default": {
        "ENGINE": config('DB_ENGINE'),
        "NAME": config('DB_NAME'),
        "USER": config('DB_USER'),
        "PASSWORD": config('DB_PASSWORD'),
        "HOST": config('DB_HOST'),
        "PORT": config('DB_PORT'),
    }
}

# Create DB for test environment
if 'test' in sys.argv:
    DATABASES = {
        'default': {
            'ENGINE': 'django.contrib.gis.db.backends.postgis',
            'NAME': 'test_bridge_db',
            'USER': config('TEST_DB_USER'),
            'PASSWORD': config('TEST_DB_PASSWORD'), 
            'HOST': config('DB_HOST'),
            'PORT': config('DB_PORT'),
        }
    }

    # If no PostGIS extension on test, create it
    def ensure_postgis_extension():
        with connection.cursor() as cursor:
            cursor.execute("CREATE EXTENSION IF NOT EXISTS postgis")

```

#### Explanation
Main Database Configuration: The DATABASES dictionary is configured to use environment variables for sensitive information like the database engine, name, user, password, host, and port. This allows you to securely manage these settings without hardcoding them into your codebase. <br>
Test Database Configuration: When running tests (if 'test' in sys.argv), the configuration switches to a test database setup. It ensures that tests run on a separate database to avoid interfering with the development database. <br>
PostGIS Extension: The function ensure_postgis_extension() checks if the PostGIS extension is installed in the test database and creates it if it is not. PostGIS is necessary for geospatial data operations.

#### Creating the .env File
To provide the necessary configuration values, create a .env file in the root of the server directory with the following content. Replace the placeholder values with your actual database credentials:
```
DB_ENGINE=django.contrib.gis.db.backends.postgis
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=your_db_port

TEST_DB_USER=your_test_db_user
TEST_DB_PASSWORD=your_test_db_password

```

### Running Migrations and Starting the Server
After setting up your .env file and configuring your database settings, you can proceed with running the database migrations and starting the server<br>
1- Return to Your Server root Directory<br>
2- Activate the Virtual Environment:
```
djangoenv\Scripts\activate

```
On macOS/Linux:
```
source djangoenv/bin/activate

```
3- Run the Database Migrations:
```
python manage.py migrate

```
This command will apply all the necessary database migrations to set up your database schema according to your Django models.<br>
4- Start the Server:
```
python manage.py runserver

```
This command will start the Django development server. You should see output indicating that the server is running, and you can access your application by navigating to http://localhost:8000 in your web browser.

## Final Steps

Congratulations! You have successfully completed the server setup. Here is a quick recap of what you have done:

1- Set Up Virtual Environment: You set up and activated your virtual environment.<br>
2- Downloaded Dependencies: You installed the dependencies from requirements.txt.<br>
3- Configured Environment Variables: You created a .env file with your database credentials.<br>
4- Verified GDAL and GEOS Libraries: You ensured that the paths for the GDAL and GEOS libraries are correctly set in settings.py.<br>
5- A Database Migrations: You applied the necessary database migrations to set up your database schema.<br>
6- Started the Server: You started the Django development server.<br>

Your development environment is now ready, and your server is up and running. You can start building and testing your application. If you have any further questions or need additional configurations, refer to the project's documentation or seek assistance from the development community.

You can now use the application if the client is set up. If the client is not set up, proceed with setting it up now that the server is ready.

Happy coding!