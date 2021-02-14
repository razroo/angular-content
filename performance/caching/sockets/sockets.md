---
title: Sockets
---

When using caching withing an angular application, the only dilemma that
will come to play is how update that cache. For most
applications,especially the nature of Angular, is that it will the data
will need to be updated frequently.

 Understanding Internals of Sockets 
-----------------------------------

Sockets are that way of updating a cache. It sets up a hook to the
server so that whenever the server is ready to respond it does.

When ever the cache has been updated, another socket goes out, to get
it's data when needed. With every request that is sent an id(requestId)
is sent over, so that server knows exactly where to send the data back,
and it allows for a bi-directional flow between the server and client.

 Handshake Protocol 
-------------------

When creating a websocket request,

    GET ws://websocket.example.com/ HTTP/1.1
    Origin: http://example.com
    Connection: Upgrade
    Host: websocket.example.com
    Upgrade: websocket

the http header îs simply given an upgrade HEADER request. That will
then go to the server. If the server can accept the websocket request,
the request will be made.
/footnotehttps://medium.com/\@SunCerberus/setup-apollo-client-2-0-with-websocket-example-a879ca81aa83
