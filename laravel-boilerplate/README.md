<div align="center">
<a href="https://imgbb.com/"><img src="https://i.ibb.co/XtFkC4R/ang-lar.png" alt="ang-lar" border="0"></a>
</div>

<p align="center">
<a href="https://github.com/Aashishb4u/indistays-angular-laravel-tech-stack.git"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
</p>

## About Tech Stack

This boilerplate is created by [Aashish Bhagwat](https://www.instagram.com/aashu.bhagwat) (Creative Hand) built in Angular version 15 & Php laravel 10. This Tech Stack has following pre-built functionalities -

- JWT Auth Token Authentication
- Angular Interceptor for Bearer Token
- Image Compression before sending to back end
- Text Editor (ngx-editor version - 15.3.0)

## Installation

### Version Dependency 

- Node Version `Node v ^14.2.0`
- npm Version `npm v ^6.14.17`

###Angular Project Structure

<pre>
laravel-boilerplate/
└── angular/
    └── indistays/
        └── src/
            └── app/
                ├── authentication/
                │   └── https-interceptors/  // This is an interceptor to handle HTTPS calls
                ├── custom-directives/
                │   └── debounce-directives/  // Handles debounce for search box key-up
                ├── pages/
                ├── services/
                │   ├── api-service/          // Handles all RESTful API calls
                │   ├── auth/                 // Handles Auth Guards
                │   ├── shared/               // Declares all shared variables and functions
                │   └── storage/              // Handles storage services
                ├── shared-components/
                │   ├── app-header/           // Global header in the application
                │   └── popup/                // Global reusable popup
            └── assets/
                ├── company-logo/             // Company logo
                ├── constants/                // All constants used in the application
                ├── fonts/                    // Lato font
                ├── images/                   // All images used in the application
                └── theme/                    // All custom themes for style.scss
                    └── custom-theme/         // Angular custom theme

</pre>

- Go to the root folder of angular setup
  `cd angular/indistays/`

- Install packages using following command 
`npm install`
 
- Run Application
`npm start`
  
###Php Laravel Project Structure

<pre>
laravel-boilerplate/
├── app/
│   └── Http/
│       ├── Controllers/      // All controllers
│       ├── Middleware/
│       │   └── AuthCheck/   // Check User Authorization middleware
│       └── Requests/         // All Custom Requests
├── Models/                   // All models
├── database/
│   ├── migrations/           // All migrations
│   └── seeders/              // Custom seeders added
</pre>


## Installation of Pre-requisites: 

- Install PHP 
`sudo apt install php8.1-cli`

- Install PHP XML
`sudo apt-get install php-xml`

- Install PHP Curl
`sudo apt-get install php-curl`

- Install Composer to run Php Laravel
`sudo apt install composer`

## Install Database (MySql)

- Install mysql (Ubuntu)
`sudo apt update && sudo apt install mysql-server`

- Start the Server
`sudo systemctl start mysql`

- Enable My Sql 
`sudo systemctl enable mysql`

- Verify Mysql is installed and running
`sudo systemctl status mysql`

##### After Installation of My Sql, We need to create a database for our application

- Enter in MySQL Command
`sudo mysql`

- Setup My Sql Password 
`mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'new_password'`
[Remember to add your own password]

- Always login with password
`mysql -u root -p`

- Create Your Database 
`create database indistays;`

- then hit `exit` to come of out mysql & install mysql drivers
`sudo apt-get install php-mysql`

- Copy .env.exaple -> .env file, Add password of your data base.


- Install packages using following command
  `composer install`
  
### Generate Laravel Secret Keys & JWT Secrets 

- Generate PHP Laravel Secrets
    `php artisan key:generate`
    
- Generate JWT Secrets
    `php artisan jwt:secret`
    
### Run PHP Laravel Application (Serve)

- Run Application
  `php artisan serve`
  
- Run Migrations 
    `php artisan migrate`
    `php artisan migrate --path=database/migrations/<migration_file>.php`
  
- Run Seeders
    `php artisan db:seed --class=UserRolesSeeder && php artisan db:seed --class=UserSeeder && php artisan db:seed --class=AmenitiesSeeder`
  
- Create storage link, so that we can access stored images
`php artisan storage:link`
  



