# GENERATOR-DJANGULAR-GIFT

Full Stack DjangularJS Yeoman Scaffolding Generator. Yeoman generator optimized for the USF-GIFT project.

Global Interdisciplinary Food Technologies (GIFT) Knowledge Repository,
[University of South Florida](http://www.usf.edu/).

### [This project is possible thanks to generous funding provided by the Patel Center for Global Sustainability](http://www.usf.edu/pcgs/).

**OSX/Linux Only**

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

**Digital Credits**
[Based on the Full Stack DjangularJS Project](https://github.com/nicolaspanel/djangularjs) [and DjangularJS Yo Generator](https://www.npmjs.com/package/generator-djangularjs) by Nicolas Pane.

His excellent work I have only modified in small part in order to conform with [John Papa's AngularJS Style Guide.](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md). I have also added provisioning for a postgres server as well as a few small project-driven needs.

---

## Contents
* [Preface](#preface)
* [Credits](#project-credits)
* [Pre-Configuration](#pre-configuration)
* [Generating the Scaffolding](#generating-the-scaffolding)
* [Installing the Virtual Machine](#installing-the-vm)
* [Configuring the Virtual Machine](#setting-up-the-vm)
* [Yo Generator Cheat Sheet](#yo-cheat-sheet)
* [Stack Components](#stack-components)
* [Digital Credits](#digital-credits)
* [License](#license)

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

For other systems, use your system package manager.

## Generating the Scaffolding

**All systems**
``` shell
# Node Package Manager to install Yeoman Scaffolding tool
@host $ sudo npm install -g yo generator-djangular-gift
# Ansible's Galaxy to download pre-defined provisioning roles
@host $ ansible-galaxy install -r provisioning/requirements.yml
```

Create a project directory, navigate inside, and then...
``` shell
# Launches the djangular-gift generator
@host $ yo djangular-gift
```

When prompted, enter the desired name of your project. You should see an output listing all the files created. Now that we have the dependencies on the host system installed, we can launch the virtual machine using the configuration files created by the generator.

## Installing the VM

Let's generate the bare app scaffold files
``` shell
# Create the directory for your app and navigate inside
@host $ mkdir your_app && cd "$_"
# Run the yo generator, when prompted, confirm or set the app name
@host $ yo djangular-gift
```

If everything went well, start the VM.
``` shell
vagrant up
```

Vagrant will now start the virtual machine and begin provisioning it. You will likely be asked to enter your password after several minutes. This portion may take a long time on slower machines.

After the machine is started the first time, Ansible will run and ask you for the vault password, which is the same as the user login/pass (vagrant). Ansible will then install several package managers (nodejs, npm, bower, & pip) which we will use to install all of our application's dependencies. Once it is finished, you will be back at the command line prompt.

---

## Setting Up the VM

Now that the machine is operating, time to connect and configure. The next commands will connect you and take you to the folder inside the VM that is synced with the the project directory on your host machine.
``` bash
# Connect to the VM from your host machine through ssh as user dev0
@host $ vagrant ssh dev0
# Change to the /vagrant directory (which is the synced repo folder)
@dev0 $ cd /vagrant
# Activate development environment
@dev0 $ source bin/activate
```

Next, install your server and client-side dependencies with npm and bower.
``` bash
# Install server-side dependencies on vm with npm
@dev0 $ npm install
# Install client-side dependencies on vm with bower
@dev0 $ bower install
```

Time to set up the PostgreSQL server. You will temporarily switch into the 'postgres' user mode, create the database and then enter into its shell.
``` bash
# Sudo as postgres user
@dev0 $ sudo -i -u postgres
# Create development database 'gift_dev' as postgres
@postgres $ createdb gift_dev
# Launch into the PostgreSQL shell
@postgres $ psql
```

Now you are inside the postgres shell. Lets create our apps credentials and grant it privileges.
``` sql
# Create new credentials
@ psql $ CREATE ROLE vagrant WITH LOGIN PASSWORD 'vagrant';
# Give new user 'vagrant' all priveleges on the development db
@ psql $ GRANT ALL PRIVILEGES ON DATABASE gift_dev TO vagrant;
# Change create of 'gift_dev' to 'vagrant'
@ psql $ ALTER USER vagrant CREATEDB;
# Quit the PostgreSQL shell and then exit out of postgres
@ psql $ \q
@ postgres $ exit
# You should now be back inside the ssh of your VM, as dev0
```

Now to install Python dependencies and migrate the initial models.
``` bash
# Use pip to read and d/l project module dependencies
@dev0 $ pip install -r requirements/dev.txt
# Migrate over the default models (auth, etc...)
@dev0 $ python manage.py migrate
```

If everything has worked, run testing, build css, and start the server.
``` bash
# Grunt task-runner performs automated testing with karma/protractor
@dev0 $ grunt test
# Convert sass to css
@dev0 $ grunt sass translate
# Compile static files and start the server
@dev0 $ grunt serve
```

That's it! You should (hopefully) be able to go to your [localhost (http://localhost:9000)](http://localhost:9000) on your browser to see the splash page.

You can exit the VM on the terminal by typing `exit`. To shut the VM down and free memory, exit the VM, and then while in the project directory, type either of the following.
``` bash
# Shuts down the VM (execute from host machine, in project directory)
@host $ vagrant halt
# Once you halt, suspend frees up system memory (use vagrant up to restart)
@host $ vagrant suspend
# After you halt and/or suspend the VM, you can free up space by removing it
@host $ vagrant destroy
```

---

## Yo Cheat-Sheet

**AngularJS**
```
yo djangular-gift:angular-controller NAME
yo djangular-gift:angular-directive NAME
yo djangular-gift:angular-filter NAME
yo djangular-gift:angular-modal NAME
yo djangular-gift:angular-module NAME
yo djangular-gift:angular-route NAME
yo djangular-gift:angular-service NAME
```

**Django**
```
yo djangular-gift:django-api-view NAME
yo djangular-gift:django-filter NAME
yo djangular-gift:django-module NAME
yo djangular-gift:django-serializer NAME
yo djangular-gift:django-templatetag NAME
yo djangular-gift:django-viewset NAME
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
        * AngularUI
        * Angular-Translate
        * AngularMaterial
        * MaterialDesignIcons
    * Bootstrap
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
