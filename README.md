# Mapping Front End

Uses Kemal framework and WebGL to render a 3D map of the terrain.
The terrain data is received via UDP Datagrams.

## Installation

Install crystal and kemal

## Usage

The ultrasonic sensor must be placed on a servo pan and tilt arrangement based on [this](http://keisan.casio.com/exec/system/1359534351) convention.

```
$ crystal build src/mapping-front-end.cr
$ ./mapping-front-end
```

## Contributing

1. Fork it ( https://gitlab.com/prajwaldp/mapping-front-end/fork )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create a new Pull Request


