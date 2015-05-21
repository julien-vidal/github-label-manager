> Import/Export Labels between two github projects
> You have to have an account who have enough rights for that kind of process


## Install

```sh
$ npm install github-label-manager --g
```

In your env variable you have to put this keys :

GITHUB_USER = "userWhoWillDoProcess"

GITHUB_TOKEN = "yourToken"


## Usage

```sh
$ #Import labels from origin to destination
$ glm import <origin-repo-name> <destination-repo-name>
$ #Clear all labels from origin
$ glm clear <origin-repo-name>
$ glm --help
```

## Todo

- Import/Export json to/from a repository
- Better error handling
  + Decrypt github error and display message accordingly
- Improve credential process
  + Keep existing
  + Add params in cmd line
  + Is it possible to configure it via a config command?
  + 3 levels
    * 1) Check command params
    * 2) Check global config
    * 3) Check env variables
    * 4) Sorry dude I can't do anything for you...
- Make some other cool thing :D

## License

MIT © [Vidal Julien](http://www.julien-vidal.fr)
