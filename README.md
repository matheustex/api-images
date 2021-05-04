# :city_sunrise: api-images

## Getting Started

First, make sure you have docker installed to run the application.
You can opt to choose your AWS account but the default values uses a custom user
that have access to a test bucket where you can test the application.

Next, clone this repository onto your machine. Then install `make install`:

```
make install
```

To install all dependencies. This might take a while.

## Developing

To start every part of the project, run:

```
make run
```

To test every part of the project, run:

```
pnpm run test
```

Then you can hit the API if using default values `https://localhost:8000/images`



TODO:

Isolate the file service layer
Improve tests on the image service
Improve imports
Better error handle

