---
title: "Volume"
date: 2022-08-06T16:59:58Z
tags: ['notes', 'suckless', 'dwmblocks']
---

[My dwmblocks volume script](https://gitlab.com/ivandimitrov8080/scripts/-/blob/master/volume)
can show the volume and it can set it.
It does so for the currently used sink.

For dwmblocks to update the value on the screen I've set up an update signal so that 
it doesn't get updated every second unnecessarily.
There's a keybind for increasing and decreasing the volume that I've added to my
[sxhkd](https://github.com/baskerville/sxhkd) config.

```
super + i
	volume set -i 5
super + o
	volume set -d 5
```

The way it works step by step:

1. When I press the `super + i` keys `sxhkd` calls my volume script with an increase
 argument of 5%.
1. My volume script uses [pactl](https://linux.die.net/man/1/pactl)
to get the currently used sink id.
If there are multiple sinks in use, it gets the one with the lowest ID value (numerical).
1. The script uses [pamixer](https://github.com/cdemoulins/pamixer)
to increase the volume of that sink by 5%.
1. After the volume has been increased, the script sends a signal to dwmblocks
to update the volume information.
1. My volume script uses [pactl](https://linux.die.net/man/1/pactl)
to get the currently used sink id.
If there are multiple sinks in use, it gets the one with the lowest ID value (numerical).
1. dwmblocks calls the same script again, but with a `get` argument, which
makes it output the current volume level for the provided sink.
That gets displayed on my status bar.

Same thing happens for the `super + o` keybind, except it decreases the volume.

