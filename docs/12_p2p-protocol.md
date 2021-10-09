---
tags:
  - lib2p2
  - Discovery
  - Subscribing
  - Peering
  - Message
  - Gossip
---

# Peer-to-peer protocol

## lib2p2

Publish/Subscribe is a system where peers congregate around topics they are interested in. Each topic in our case represent a separate market (e.g. “BTC/USDT”). Peers interested in a topic are said to be subscribed to that topic. Peers can send messages to topics. Each message gets delivered to all peers subscribed to the topic:

![Topic, peer, message](../static/img/image1.png)

## Design goals

In a peer-to-peer pub/sub system all peers participate in delivering messages throughout the network. There are several different designs for peer-to-peer pub/sub systems which offer different trade-offs. Desirable properties include:
- Reliability: All messages get delivered to all peers subscribed to the topic.

- **Speed:** Messages are delivered quickly.
- **Efficiency:** The network is not flooded with excess copies of messages.
- **Resilience:** Peers can join and leave the network without disrupting it. There is no central point of failure.
- **Scale:** Topics can have enormous numbers of subscribers and handle a large throughput of messages.
- **Simplicity:** The system is simple to understand and implement. Each peer only needs to remember a small amount of state.

Libp2p currently uses a design called **gossipsub**. It is named after the fact that peers gossip to each other about which messages they have seen and use this information to maintain a message delivery network.

## Discovery

Before a peer can subscribe to a topic it must find other peers and establish network connections with them. The pub/sub system doesn’t have any way to discover peers by itself. Instead, it relies upon the application to find new peers on its behalf, a process called **ambient peer discovery**.

Potential methods for discovering peers include:

- distributed hash tables;
- local network broadcasts;
- exchanging peer lists with existing peers;
- centralized trackers or rendezvous points;
- lists of bootstrap peers.

Discovered peers are asked if they support the pub/sub protocol, and if so, are added to the pub/sub network.

## Types of peering

In gossipsub, peers connect to each other via either **full-message peerings** or metadata-only peerings.

Full-message peerings are used to transmit the full contents of messages throughout the network. This network is sparsely-connected with each peer only being connected to a few other peers. 

Limiting the number of full-message peerings is useful because it keeps the amount of network traffic under control; each peer only forwards messages to a few other peers, rather than all of them. Each peer has a target number of peers it wants to be connected to. In this example each peer would ideally like to be connected to 3 other peers, but would settle for 2–4 connections:

![Full-message network](../static/img/image2.png)

## Subscribing and unsubscribing

Peers keep track of which topics their directly-connected peers are subscribed to. Using this information each peer is able to build up a picture of the topics around them and which peers are subscribed to each topic:

![Peers tracking](../static/img/image3.png)

Keeping track of subscriptions happens by sending **subscribe** and **unsubscribe** messages. When a new connection is established between two peers they start by sending each other the list of topics they are subscribed to:

![Subscription list sharing](../static/img/image4.png)

Then over time, whenever a peer subscribes or unsubscribes from a topic, it will send each of its peers a subscribe or unsubscribe message. These messages are sent to all connected peers regardless of whether the receiving peer is subscribed to the topic in question:

![Unsubscription list sharing](../static/img/image5.png)

Subscribe and unsubscribe messages go hand-in-hand with graft and prune messages. When a peer subscribes to a topic it will pick some peers that will become its full-message peers for that topic and send them graft messages at the same time as their subscribe messages:

![Full-message peering settlement](../static/img/image6.png)

When a peer unsubscribes from a topic it will notify its full-message peers that their connection has been pruned at the same time as sending their unsubscribe messages:

![Full-message peering disconnection](../static/img/image7.png)

## Sending messages

When a peer wants to publish a message it sends a copy to all full-message peers it is connected to:

![Message sending](../static/img/image8.png)

Similarly, when a peer receives a new message from another peer, it stores the message and forwards a copy to all other full-message peers it is connected to:

![Message receiving](../static/img/image9.png)

Peers are also known as **routers** because of this function they have in routing messages through the network.

Peers remember a list of recently seen messages. This lets peers act upon a message only the first time they see it and ignore retransmissions of already seen messages.

Peers might also choose to validate the contents of each message received. What counts as valid and invalid depends on the internal logic described further.

## Gossip

Peers gossip about messages they have recently seen. Every 1 second each peer randomly selects 6 metadata-only peers and sends them a list of recently seen messages.

![Sending the list of recently seen messages](../static/img/image10.png)

Gossiping gives peers a chance to notice in case they missed a message on the full-message network. If a peer notices it is repeatedly missing messages then it can set up new full-message peerings with peers that do have the messages. A specific message can be requested across a metadata-only peering:

![Gossip1](../static/img/image11.png)
![Gossip2](../static/img/image12.png)
![Gossip3](../static/img/image13.png)
![Gossip4](../static/img/image14.png)
![Gossip5](../static/img/image15.png)
![Gossip6](../static/img/image16.png)

Gossip announcing recently seen messages are called **IHAVE** messages and requests for specific messages are called **IWANT** messages.

### Flow of the Order sharing to the Topic (Network) Orderbook


<Mermaid chart='
sequenceDiagram
Peer A--> Topic Orderbook: connect
Topic Orderbook--> Peer B: connect
User A->> Peer A: Create order
Note over User A,Peer A: Order gets peer_ID
Peer A->> Peer A: update of the local Orderbook of Peer A
Peer A->> Topic Orderbook: Push order
Note over Peer A, Topic Orderbook: Order with peer_ID of Peer A
Topic Orderbook->> Peer B: Gossip
Note over Peer B: at this point Peer B has a local order to be matched
Peer B->> Peer B: Order execution
Peer B->> Topic Orderbook: Event
Note over Peer B, Topic Orderbook: the state of the order is changed
Topic Orderbook->> Peer A: Full Connection/Gossip
Peer A->> Peer A: update of the local Orderbook of Peer A' />

### Flow of the getting a snapshot

<Mermaid chart='
sequenceDiagram
Peer A->> Bootstrap: Connect
Bootstrap ->> Bootstrap: Update local DHT
Peer A->> Network: Advertise (via Rendezvous string)
Network->> Peer A: Share matched rendezvous Peers (N total)
Peer A->> Peer X1: RPC call
Peer X1-->> Peer A: 
Peer A->> Peer X2: RPC call
Peer X2-->> Peer A:  
Peer A->> Peer XZ: RPC call
Peer XZ-->> Peer A: 
Note over Peer A, Peer XZ: RPC calls are made to random Peers (among N) according to Round Robin Algorithm, with total amount of RPC calls: Z=N/3
Peer A->> Peer A: Merge results' />

### Flow of the initial Peer connect

<Mermaid chart='
sequenceDiagram
Peer A->> Peer A: local Orderbook
Peer A->> Bootstrap: Connect
Bootstrap ->> Bootstrap: Update local hash table
Note over Bootstrap, Network: at this point Network knows about Peer A
Peer A->> Network: Advertise (via Rendezvous string)
Network->> Peer A: Reply with Array of Peers for this Topic
Note over Network, Peer A: [Peer X, Peer Y, Peer Z...]
Peer A->> Peer X: Snapshot request
Peer X->> Peer A: Snapshot
Peer A->> Peer A: local Orders matching' />