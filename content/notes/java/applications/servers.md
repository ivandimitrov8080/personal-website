---
title: "Servers"
date: 2022-07-31T16:34:32Z
tags: ['servers', 'java', 'applications', 'notes']
---

Being a general purpose programming language, Java can be useful in many ways, including server applications.

Java is mostly used as a web server programming language.
Frameworks like [Spring Framework](https://spring.io/) are utilised to help build highly scalable and efficient web services.
It is used by companies like Google, Netflix, Uber and more.

The code for a basic server is less than 30 lines long.

```java
package uk.co.ivandimitrov;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class App {
	public static void main(String[] args) throws Exception {
		final ServerSocket serverSocket = new ServerSocket(1337); // Create a server socket that listens for port 1337.
		final Socket socket = serverSocket.accept(); // Start listening for a connection. This blocks the current thread until a connection is made.
		final BufferedReader reader = new BufferedReader(new InputStreamReader(socket.getInputStream())); // Create a reader to read data from the client.
		final String data = reader.readLine(); // Read a line from the client.
		final PrintWriter writer = new PrintWriter(socket.getOutputStream()); // Create a writer to write data back to the client.
		writer.println(netflix(data)); // Give netflix to the client.
		socket.close(); // Close the server.
		serverSocket.close();
	}

	private static String netflix(final String data) {
		// TODO: Create Netflix.
		return data;
	}

}
```
In practice, real web servers written in Java can reach millions of lines of code.
That's when you really need
[Object Oriented Programming](https://en.wikipedia.org/wiki/Object-oriented_programming)
languages like Java and frameworks like Spring to simplify the inevitable complexity that emerges in real world projects.

