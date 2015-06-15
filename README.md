> Toolbox for Manage your Labels on Github projects
> You have to have an account who have enough rights for that kind of process

## Why this package

One day with a teammate, we have many repositories and one of them only have been set with 
labels we use everyday. So we have to copy all of them in each repository. So we go on github
labels interface and suprise ! You have to create your labels one by one...

This project was born. Some other packages allow you to do such things.

I just want to group them here and maybe add some more.

## Install

```sh
$ npm install github-label-manager --g
```
## Settings 

This command have need your Github username and a generate token provided by Github

### Generate a new token

Create a Personal access token on GitHub is really easy. Go to [this page](https://github.com/settings/tokens) and create a new token with the **repo** and **public_repo** permissions enabled.

### Authentication via environment variable
 
Then add the following environment variables in your .bashrc (Linux) or .bash_profile (Mac).

```
export GITHUB_USER = "youtGithubUsername"
export GITHUB_TOKEN = "yourfreshlygeneratedToken"
```

### Authentication via command options

You can authenticate via options if you prefer, this will override environment variables in case of you set it.
  
```sh
$ #Use clear command with command authentication
$ glm -u <yourGithubUsername> -t <yourfreshlygeneratedToken> <command> 
$ glm -u minion -t grusupertokenforminion clear evil-project-from-gru 
```

## Usage

### Copy

This command allow you to copy all your labels from the origin repository to the destination repository. If a label already exist this command dosen't override it.
 
```sh
#Copy labels from origin to destination
glm copy <origin-repo-name> <destination-repo-name>
```

### Clear

This command will clear all labels in targeted repository

```sh
#Clear all labels from origin
glm clear <origin-repo-name>
```

### Import

This command allow you to import a JSON file which contains your labels for the targeted repository.
This JSON file have to contains your labels which need to follow this pattern 

```json
[{
  "name": "Error",
  "color": "FF0000"
},
{
  "name": "Done",
  "color": "15BD0A"
},
{
  "name": "...",
  "color: "..." 
}]
```

And finally the example of this command usage

```sh
#Import labels from JSON file to repository
glm import <repo-name> <path-to-json-file>
```

### Export

The opposite of import command, this will export all your labels for a repository in a JSON file following the import JSON pattern

```sh
#Export labels from repository to json file  
glm export <repo-name> <path-to-json-file>
```
### Misc

You can use help if you need it

```sh
#Detail about all available commands
glm --help
```

## Todo

- Can import only label and randomly create a color for it
- Make some other cool thing :D

## License

MIT © [Vidal Julien](http://www.julien-vidal.fr)
