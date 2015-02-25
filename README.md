> Import/Export Labels between two github projects
> You have to have an account who have enough rights for that kind of process


## Install

```sh
$ npm install --g
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
- publish package on npm
- Make some other cool thing :D

## License

MIT © [Vidal Julien](julien-vidal.fr)


[npm-url]: https://npmjs.org/package/github-label-manager
[npm-image]: https://badge.fury.io/js/github-label-manager.svg
[travis-url]: https://travis-ci.org//github-label-manager
[travis-image]: https://travis-ci.org//github-label-manager.svg?branch=master
[daviddm-url]: https://david-dm.org//github-label-manager.svg?theme=shields.io
[daviddm-image]: https://david-dm.org//github-label-manager
