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

- Better error handling
- Make some other cool thing :D

## License

MIT © [Vidal Julien](http://www.julien-vidal.fr)
