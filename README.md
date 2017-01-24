# rim-laurentius
Arkiverer ting i 360

## Config

docker.env

```bash
QUEUE_DIRECTORY_PATH=test/data/queue
JOBS_DIRECTORY_PATH=test/data/jobs
STATUS_DIRECTORY_PATH=test/data/status
ERRORS_DIRECTORY_PATH=test/data/error
URL=https://vigo.dummy.allthethings.win
USERNAME=my-username
PASSWORD=my-password
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
Check for jobs in the queue directory. 
Format the document. 
Save new job to jobs directory. 
Stop the container and remove it.

# License
[MIT](LICENSE)
