[![Build Status](https://travis-ci.org/telemark/rim-laurentius.svg?branch=master)](https://travis-ci.org/telemark/rim-laurentius)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# rim-laurentius

Rett i mappa for Public 360

## Config

docker.env

```bash
QUEUE_DIRECTORY_PATH=test/data/queue
DONE_DIRECTORY_PATH=test/data/done
STATUS_DIRECTORY_PATH=test/data/status
ERRORS_DIRECTORY_PATH=test/data/error
URL=https://vigo.dummy.allthethings.win
USERNAME=my-username
PASSWORD=my-password
FIREBASE_URL=https://seneca-firebase-test.firebaseio.com
```

## Docker

Build

```bash
$ docker build -t rim-laurentius .
```

### Usage

```bash
$ docker run --env-file=docker.env --volume=/test/data:/src/test/data --rm rim-laurentius
```

or from pre-built image

```bash
$ docker run --env-file=docker.env --volume=/test/data:/src/test/data --rm telemark/rim-laurentius
```

This will start a container. 
- Check for jobs in the queue directory. 
- Format the document.
- Get contact
- Sync contact (if not secret)
- Get case (if no errors)
- Add Case (if not exists && no errors)
- Add document(s) (if document exists && no errors)
- Signs off document (if signOff is true && no errors)
- Save job done (if no errors)
- Save job errors  (if errors)
- Delete job from queue
- Update status
- 
- Save new job to jobs directory. 
- Stop the container and remove it.

## Related

- [rim-vigo-data-pull](https://github.com/telemark/rim-vigo-data-pull) Pulls data from VIGO
- [rim-vigo-saksbehandling](https://github.com/telemark/rim-vigo-saksbehandling) Formats documents for archive
- [rim-vigo-update-status](https://github.com/telemark/rim-vigo-update-status) Updates archive status for document

# License

[MIT](LICENSE)
