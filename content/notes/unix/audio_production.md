---
title: "Audio production"
date: 2022-08-14T19:49:15Z
tags: ['notes', 'unix', 'linux', 'audio']
---

This is how you can configure Artix Linux for audio production.
The steps should work for any Arch-based linux distro.

# tl;dr

Run `paru -S jack2 qjackctl ardour guitarix a2jmidid pro-audio lv2-plugins`.

Run `sudo usermod -aG audio $USER`.

Create the files with the content inside code blocks below.

Reboot.

Make sure you run the configured pulseaudio and jackd when you want sound.

If you have a MIDI device, run `a2jmidid -e` to add it as an input device.

---

# What you'll need

- An Arch-based linux distro
- An AUR helper like `yay` or `paru`
- About 1 hour

---

# Install [jack2](https://github.com/jackaudio/jack2)

[Reference](https://jackaudio.org/faq/pulseaudio_and_jack.html)

Run `paru -S jack2`. This will install the server,
after which you'll want some configuration.

While pulseaudio is running, jack2 cannot access the same soundcard that PA is using.
A solution to this can be to turn off PA while jack2 is running,
but that is not optimal for general use.

The approach I took is to route PA to jack2. To do that you need some config files.

To redirect ALSA to PA create `$HOME/.asoundrc` and add the following

```txt
pcm.pulse {
    type pulse
}

ctl.pulse {
    type pulse
}

pcm.!default {
    type pulse
}
ctl.!default {
    type pulse
}
```

To redirect PA to jack2 create `$HOME/.config/pulse/default.pa` and add the following

```txt
load-module module-native-protocol-unix
load-module module-jack-sink channels=2
load-module module-jack-source channels=2
load-module module-null-sink
load-module module-stream-restore
load-module module-rescue-streams
load-module module-always-sink
load-module module-suspend-on-idle
set-default-sink jack_out
set-default-source jack_in
```

And another one `$HOME/.config/pulse/daemon.conf`

```txt
default-sample-format = float32le
default-sample-rate = 48000
realtime-scheduling = yes
exit-idle-time = -1
```

PA should now be routing to jack2.

#### [Enable realtime scheduling](https://jackaudio.org/faq/linux_rt_config.html)

Add yourself to the `audio` group.

`sudo groupadd audio`

`sudo usermod -aG audio $USER`

Create/edit `/etc/security/limits.d/audio.conf` and make sure it has the following
2 lines

```txt
@audio   -  rtprio     95
@audio   -  memlock    unlimited
```

For additional configuration, install `qjackctl` `paru -S qjackctl`.

You can control jack2 from the command line as well.
qjackctl creates the file `$HOME/.jackdrc`, which you can use to launch jackd.
This file looks something like this:
`/usr/bin/jackd -v -dalsa -r96000 -D -Phw:3 -Chw:3`.
`-Phw:3` is the playback port AKA output device and
`-Chw:3` is the capture port AKA input device.
You can see the device number in qjackct.
I have a script that takes the contents and runs jackd
thus managing sound.

```bash
#!/usr/bin/env bash

jackd_cmd=$( cat "$HOME/.jackdrc" )
pa_cmd="pulseaudio --start -D"

startAll() {
        $jackd_cmd &
        sleep 1
        $pa_cmd
}

killAll() {
        killall -9 jackd
        killall -9 pulseaudio
}

[[ "$1" = "start" ]] && startAll
[[ "$1" = "restart" ]] && killAll && startAll
[[ "$1" = "kill" ]] && killAll
```

---

# DAWs and utilities.

You're gonna need a
[Digital Audio Workstation](https://en.wikipedia.org/wiki/Digital_audio_workstation)
to produce audio on any
operating system. For this task, I chose [ardour](https://ardour.org/).
To install, run `paru -S ardour`.

I use this mainly to listen to my MIDI keyboard while playing.
For `ardour` to detect the MIDI keyboard,
[a2jmidid](https://github.com/jackaudio/a2jmidid)
is required. Install it by running `paru -S a2jmidid`.
After it's installed, run it from the terminal `a2jmidid -e`.
The `-e` flag bridges hardware ports as well as software ports.
This will show the keyboard as an input device in ardour.

[Here&apos;s a nice tutorial](https://www.youtube.com/watch?v=bfTAKv4htDE)
I found on ardour that helped me configure things.

There's a few package groups on the AUR that hold some utilities
and plugins. To install them, run `paru -S pro-audio lv2-plugins`.

I've also got an electric guitar, for which I've installed
[guitarix](https://guitarix.org/) for special effects and such.
If you've configured jack correctly, this should just connect and work.
Make sure your audio interface is jack's input device and your speakers
or headphones are the output device.

# Realtime Kernel

You can also compile the `linux-rt` kernel found on the
[AUR](https://aur.archlinux.org/packages/linux-rt).
It improves latency a bit, but I don't find it necessary.

If you decide to go down that route, know that you're
going to need to configure an `nvidia-rt` driver
if you have an Nvidia graphics card. That can be a huge pain.
I configured `nouveau` to test the latency improvements,
and found that it's just not worth it for what I do.

