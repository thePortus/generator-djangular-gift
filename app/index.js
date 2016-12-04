'use strict';

var util = require('../util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    format = require('string-format'),
    uuid = require('node-uuid'),
    _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
    init: function() {
        this.secretKey = uuid.v4();
        this.log(chalk.green('/=============================================================================\\'));
        this.log(chalk.magenta('|                       You\'re using the USF-GIFT generator                   |'));
        this.log(chalk.green('|=============================================================================|'));
        this.log(chalk.magenta('|                                                                             |'));
        this.log(chalk.magenta('|                               Optimized for the                             |'));
        this.log(chalk.white('|       Global Interdisciplinary Food Technologies Knowledge Repository       |'));
        this.log(chalk.magenta('|                   Hosted at the University of South Florida                 |'));
        this.log(chalk.magenta('|             Funding for the GIFT project generously provided by             |'));
        this.log(chalk.magenta('|                                                                             |'));
        this.log(chalk.white('|                  The Patel College for Global Sustainability                |'));
        this.log(chalk.magenta('|                                                                             |'));
        this.log(chalk.green('\\=============================================================================/'));
    },
    askForApplicationDetails: function() {
        var done = this.async();

        var prompts = [{
            name: 'appName',
            message: 'What would you like to call your application?',
            default: path.basename(process.cwd())
        }];

        this.prompt(prompts, function(props) {
            this.appName = props.appName;
            this.slugifiedAppName = _.kebabCase(this.appName);
            done();
        }.bind(this));
    },

    copyApplicationFolder: function() {
        var blacklist = ['contributing.md', 'README.md', 'package.json', 'bower.js', 'Vagrantfile', '.gitignore'];
        var rendered = {
            'provisioning/group_vars/dev':  'provisioning/group_vars/dev',
            'public/config.js':  'public/config.js',
            '_README.md': 'README.md',
            '_bower.json': 'bower.json',
            '_package.json': 'package.json',
            '_Vagrantfile': 'Vagrantfile',
            '_.gitignore': '.gitignore'
        };
        util.readdirrecSync(this.sourceRoot()).forEach(function (file) {
            var relativePath = file.replace(this.sourceRoot()+'/','');
            if (_.contains(blacklist, relativePath)){
                return;
            }
            if (rendered[relativePath]){
                this.template(relativePath, rendered[relativePath]);
            }
            else {
                this.bulkCopy(relativePath, relativePath);
            }
        }.bind(this));
    }
});
