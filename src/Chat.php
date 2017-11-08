<?php

namespace MyApp;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;


class Chat implements MessageComponentInterface {
  protected $clients;

  public function __construct() {
    $this->clients = new \SplObjectStorage;
  }

  public function onOpen(ConnectionInterface $conn) {
    $this->clients->attach($conn);
    echo sprintf('%s :: new connection: %d ', $this->getDate(), $conn->resourceId) . "\n";
  }

  public function onMessage(ConnectionInterface $from, $msg) {
    $numRecv = count($this->clients) -1;
    echo sprintf('%s :: %d sending message', $this->getDate(), $from->resourceId) . "\n";
    /*, $msg, $numRecv, $numRecv ==1 ? "" : 's'*/

    foreach ($this->clients as $client) {
      if($from !== $client) {
        $client->send($msg);
      }
    }
  }

  public function onClose(ConnectionInterface $conn) {
    $this->clients->detach($conn);
    echo "Conection {$conn->resourceId} has disconnected \n";
  }

  public function onError(ConnectionInterface $conn, \Exception $e) {
    echo "An error has occured: {$e->getMessage()} \n";
    $conn->close();
  }

  protected function close( ConnectionInterface $conn ) {
  		$conn->send( $this->response );
  		$conn->close();
  	}

    protected function getDate() {
      return date('d.m.Y h:i:s A');
    }

}
