# rim-vigo-saksbehandling
Klargjør jobber for arkivering

## Config

docker.env

```bash
QUEUE_DIRECTORY_PATH=test/data/queue
JOBS_DIRECTORY_PATH=test/data/jobs
ERRORS_DIRECTORY_PATH=test/data/error
URL=https://vigo.dummy.allthethings.win
USERNAME=my-username
PASSWORD=my-password
```

## Docker

Build

```bash
$ docker build -t rim-vigo-saksbehandling .
```

### Usage

```bash
$ docker run --env-file=docker.env --volume=/test/data:/src/test/data --rm rrim-vigo-saksbehandling
```

or from pre-built image

```bash
$ docker run --env-file=docker.env --volume=/test/data:/src/test/data --rm telemark/rim-vigo-saksbehandling
```

This will start a container. 
Check for jobs in the queue directory. 
Format the document. 
Save new job to jobs directory. 
Stop the container and remove it.

# License
[MIT](LICENSE)