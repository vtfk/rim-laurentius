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
TFK_LAURENTIUS_P360WS_USER=username
TFK_LAURENTIUS_P360WS_PASSWORD=password
TFK_LAURENTIUS_P360WS_BASEURL=http://360test.no:4000/SI.WS.Core/SIF/
TFK_LAURENTIUS_P360WS_SECURE_USER=secureUsername
TFK_LAURENTIUS_P360WS_SECURE_PASSWORD=securePassword
TFK_LAURENTIUS_P360WS_SECURE_BASEURL=http://360testSecure.no:4001/SI.WS.Core/SIF/
P360_VTFK_TOKEN=p360_token
P360_VTFK_BASEURL=http://360test.no:3001
PAPERTRAIL_DISABLE_LOGGING=false
PAPERTRAIL_HOST=https://logs.collector.solarwinds.com/v1/log
PAPERTRAIL_TOKEN=your-token
NODE_ENV=production
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
- Sync contact (if not secret)
- Get case (if no errors)
- Add Case (if not exists && no errors)
- Add document(s) (if document exists && no errors)
- Signs off document (if signOff is true && no errors)
- Save status jobs (callback)
- Save job done (if no errors)
- Save job errors  (if errors)
- Delete job from queue

# License

[MIT](LICENSE)
