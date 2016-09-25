# generator-djangular-gift
---

Global Interdisciplinary Food Technologies (GIFT) Knowledge Repository,
[University of South Florida](http://www.usf.edu/).

### [This project is possible thanks to generous funding provided by the Patel Center for Global Sustainability](http://www.usf.edu/pcgs/).

---

**OSX/Linux Only**

---

Scaffolding based on the [DjangularJS Project](https://github.com/nicolaspanel/djangularjs) and the [DjangularJS Generator](https://github.com/nicolaspanel/generator-djangularjs).

---

## Preface

GIFT (Global Interdisciplinary Food Technologies) Knowledge Repository is a data curation and analysis app allowing scholars from any field relating to food sustainability issues to upload data, link to previously exisiting collections, and perform mass aggregates.

---

## Credits

**Project Credits**
* Michael J. Decker, Project Director
* David J. Thomas, Developer
* Howard Kaplan, Developer
* Herbert Maschner, Project Partner
* Diane Wallman, Project Parter
* George Philippidis, Project Partner
* Qiong Zhang, Project Partner

---

## Contents
* [Preface](#preface)
* [Credits](#project-credits)
* [Pre-Configuration](#pre-configuration)
* [Configuring the Virtual Machine](#set-up-the-vm)
* [Create the DB](#create-the-db)
* [Install App Dependencies](#install-app-dependencies)
* [Set Up Google Authentication](#set-up-google-authentication)
* [Launch the Server](#launch-the-server)
* [Managing the VM](#managing-the-vm)
* [Digital Credits](#digital-credits)
* [Yo Generator Cheat Sheet](#yo-cheat-sheet)
* [Stack Components](#stack-components)
* [License](#license)

---

**NOTE ON COMMANDS BELOW**
```
@host $ # indicates a command executed on your physical machine
@dev0 $ # indicates a command executed on the VM
@postgres $ # indicates a command executed on the VM as user postgres
```

---

## Pre-Configuration

**OSX Pre-Configuration**
``` shell
# Brings up dialog to download & install X-Code's minimal command-line tools
@host $ xcode-select --install
# Issue command to d/l and install OSX's package manager, Homebrew
@host $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
# Homebrew to install NodeJS and Node Package Manager (npm)
@host $ brew install node
# Homebrew Cask to install the VirtualBox VM and Vagrant VM Manager
@host $ brew cask install virtualbox vagrant
# Homebrew to install Ansible provisioning for the VM
@host $ brew install ansible
```

**Ubuntu Pre-Configuation**
``` shell
# Install legacy nodejs (for ubuntu) and npm
@host $ sudo apt-get install nodejs-legacy npm
# If the command below fails, download virtualbox and vagrant from the web
@host $ sudo apt-get install virtualbox vagrant
@host $ sudo apt-get install ansible
```

**All systems**
``` shell
# Node Package Manager to install Yeoman Scaffolding tool
@host $ sudo npm install -g yo generator-djangular-gift
# Ansible's Galaxy to download pre-defined provisioning roles
@host $ ansible-galaxy install -r provisioning/requirements.yml
```

Navigate inside the directory where you want to create your project...
``` shell
# Run the Djangular-Gift Yeoman generator
@host $ yo djangular-gift
```

Now, launch the VM...
``` shell
# Launch and provision the VM
@host $ vagrant up
```

Vagrant will now start the virtual machine and begin provisioning it. You will likely be asked to enter your user password after several minutes.

You will also have to enter the ansible password. When asked for the 'vault password', enter `vagrant`.

Ansible will then install several package managers (nodejs, npm, bower, & pip) which we will use to install all of our application's dependencies. Once it is finished, you will be back at the command line prompt. This portion may take a long time on slower machines.

---

## Set Up the VM

Now that the machine is operating, time to connect and configure. The next commands will connect you and take you to the folder inside the VM that is synced with the the project directory on your host machine.
``` shell
# Connect to the VM from your host machine through ssh as user dev0
@host $ vagrant ssh dev0
# Change to the /vagrant directory (which is the synced repo folder)
@dev0 $ cd /vagrant
# Activate development environment
@dev0 $ source bin/activate
```

Next, install your server and client-side dependencies with npm and bower.
``` shell
# Install server-side dependencies on vm with npm (include bower dependencies)
@dev0 $ npm install
```

---

## Create the DB

Time to set up the PostgreSQL server. You will temporarily switch into the 'postgres' user mode, create the database and then enter into its shell.
``` shell
# Sudo as postgres user
@dev0 $ sudo -i -u postgres
# Create development database 'dev_db' as postgres
@postgres $ createdb dev_db
# Launch into the PostgreSQL shell
@postgres $ psql
```

Now you are inside the postgres shell. Lets create our apps credentials and grant it privileges.
``` sql
# Create new credentials
@psql $ CREATE ROLE vagrant WITH LOGIN PASSWORD 'vagrant';
# Give new user 'vagrant' all priveleges on the development db
@psql $ GRANT ALL PRIVILEGES ON DATABASE dev_db TO vagrant;
# Change create of 'dev_db' to 'vagrant'
@psql $ ALTER USER vagrant CREATEDB;
# Quit the PostgreSQL shell and then exit out of postgres
@psql $ \q
@postgres $ exit
# You should now be back inside the ssh of your VM, as dev0
```

---

# Install App Dependencies

Now to install Python dependencies and migrate the initial models.
``` shell
# Use pip to read and d/l project module dependencies
@dev0 $ pip install -r requirements/dev.txt
# Migrate over the default models (auth, etc...)
@dev0 $ python manage.py migrate
# Create a super admin account, follow the on-screen inscriptions
@dev0 $ python manage.py createsuperuser
```

---

## Set Up Google Authentication

This build is optimized to use Google authentication. So, you will need to use a Google account to manage your app. To do this, log in to [Google Developers Console](https://console.developers.google.com/project). Once logged in, click 'Create Project', and then decide on a name/ID.

To manage your app in the [Developers Console](https://console.developers.google.com/project), make sure your project is selected. Then, choose the API manager on the left-hand panel. Then click 'Credentials'.

Click the 'Create Credentials' button. Enter whatever name you wish for your credentials. Then, add two addresses to the 'Authorized Javascript origins'... `http://localhost:9000` and `http://localhost:9001`.

Then, under 'Authorized redirect URLs' add the following two addresses `http://localhost:9000/accounts/google/login/callback/` and `http://localhost:9000/accounts/google/login/callback`.

Finally, head to the OAuth consent screen tab and fill in whatever details you want.

---

## Launch the Server

If everything has worked, run testing, build css, and start the server.
``` shell
# Grunt task-runner performs automated testing with karma/protractor
@dev0 $ grunt test
# Convert sass to css
@dev0 $ grunt sass translate
```

When you run the last command, you will get a warning about a number of keys being obsolete. For now, you want to ignore this warning, so use the arrow keys and space bar to de-select every key. When you have finished, press 'enter' to finish.

Now it is time to finally start the server.
```
# Compile static files and start the server
@dev0 $ grunt serve
```

You should (hopefully) be able to go to your [localhost (http://localhost:9000)](http://localhost:9000) on your browser to see the splash page.

There is one final step that you need to do in order to set up Google Authentication. Now that your server is running, head to `http://localhost:9000/admin/socialaccount/socialapp` and login with the superuser you created in the [Install App Dependencies](#install-app-dependencies) section above. 

Create a 'Add New Social Application' using the details below. For your ClientID and Secret Key, head to the [Developers Console](https://console.developers.google.com/project). Go to the API manager, and you will find it in the Credentials tab.

```
Provider: Google
Name: Google
Client ID : YOUR_CLIENT_ID
Secret Key: YOUR_SECRET_KEY
Key: (Leave Blank)
Site: (Select and add 'example.com')
```

* Google Authentication based upon the tutorial of [Marina Mele](http://www.marinamele.com/user-authentication-with-google-using-django-allauth).

---

## Managing the VM

You can exit the VM on the terminal by typing `exit`. To shut the VM down and free memory, exit the VM, and then while in the project directory, type either of the following.
``` shell
# Shuts down the VM (execute from host machine, in project directory)
@host $ vagrant halt
# Once you halt, suspend frees up system memory (use vagrant up to restart)
@host $ vagrant suspend
# After you halt and/or suspend the VM, you can free up space by removing it
@host $ vagrant destroy
```

---

## Digital Credits

This project is indebted to [Nicolas Panel](https://github.com/nicolaspanel), whose work on the [DjangularJS Project](https://github.com/nicolaspanel/djangularjs) and the [DjangularJS Generator](https://github.com/nicolaspanel/generator-djangularjs) formed the intial scaffolding for this project.

---

## Yo Cheat-Sheet

**AngularJS**
```
@dev0 $ yo djangular-gift:angular-controller NAME
@dev0 $ yo djangular-gift:angular-directive NAME
@dev0 $ yo djangular-gift:angular-filter NAME
@dev0 $ yo djangular-gift:angular-modal NAME
@dev0 $ yo djangular-gift:angular-module NAME
@dev0 $ yo djangular-gift:angular-route NAME
@dev0 $ yo djangular-gift:angular-service NAME
```

**Django**
```
@dev0 $ yo djangular-gift:django-api-view NAME
@dev0 $ yo djangular-gift:django-filter NAME
@dev0 $ yo djangular-gift:django-module NAME
@dev0 $ yo djangular-gift:django-serializer NAME
@dev0 $ yo djangular-gift:django-templatetag NAME
@dev0 $ yo djangular-gift:django-viewset NAME
```

---

## Stack Components

+ Virtual Machine: VirtualBox/Vagrant
+ Provisioning: Ansible
+ OS: Ubuntu/Trusty64
+ Backend:
    * NodeJS
    * Django
    * Django Rest Framework
    * Django Compressor
    * Django Rest Pandas
+ Frontend:
    * AngularJS
    * Angular-Material
    * Material Design Icons
    * Angular-Translate
    * Angular-Aria
    * Sass
    * Moment.js
+ Scaffolding/Automation/Testing:
    * Yeoman
    * Grunt
    * Karma
    * Protractor

---

## License

The MIT License (MIT)

Copyright (c) 2016 David J. Thomas, thePortus.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
