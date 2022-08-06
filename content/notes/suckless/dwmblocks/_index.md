---
title: "Dwmblocks"
date: 2022-08-06T16:35:35Z
tags: ['notes', 'suckless', 'dwmblocks']
---

[dwmblocks](https://gitlab.com/ivandimitrov8080/dwmblocks) is a modular status bar written in [c](https://www.w3schools.com/c/index.php).
It is used with [dwm](https://gitlab.com/ivandimitrov8080/dwm) to display status bar information.

![dwmblocks status bar image](dwmblocks.png)

The status bar is at the top right corner.
It shows information like current date, time, weather, network IO, RAM usage and volume.
That information gets updated based on predefined rules in your configuration file, which might look something like this:

```c
//Modify this file to change what commands output to your statusbar, and recompile using the make command.
static const Block blocks[] = {
	/*Icon*/	/*Command*/		/*Update Interval*/	/*Update Signal*/
	{"", "volume get", 							0,		10},
	{"", "netstat",								1,		0},
	{"", "curl wttr.in/Nottingham\?format=\"%C+%t+%p\"",			3600,		0},
	{"", "free -h | awk '/^Mem/ { print $3\"/\"$2 }' | sed s/i//g",	5,		0},
	{"", "date '+%b %d (%a) %I:%M%p'",					60,		0},
};

//sets delimeter between status commands. NULL character ('\0') means no delimeter.
static char delim[] = " | ";
static unsigned int delimLen = 5;
```

The `blocks` array has some objects that each contain the icon to show,
 command to execute, the update interval (seconds) and update signal.
The command output is what is displayed on the status bar.

Here are some things I've had to deal with when configuring my status bar:

