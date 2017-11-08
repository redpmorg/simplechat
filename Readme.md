# Websockets with Ratchet - the proof of concept #

## very, very, very simple chat application ##

### WAMP Server - Ratchet PHP ###

### Client chat server nodeJS & Vanilla JS ###

### Dependencies ###

- PHP
- composer
- nodeJS
- npm


Open new terminal (ctrl+alt+t) and clone the project:
```
$ git clone ~/chatServer
$ cd ~/chatServer
```

Update dependencies
```
$ composer update
$ npm update
```

Open new terminal and start Chat Server
```
$ php ./bin/chat-server.php
```

Open new terminal and start Client Server
```
$ npm run client-server
```

Open several browsers tabs/windows and navigate to http://localhost:8081

Have fun!!!
