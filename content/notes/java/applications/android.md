---
title: "Android"
date: 2022-07-30T15:41:03Z
tags: ['java', 'android', 'applications', 'notes']
---

[Android](https://www.android.com/) is an [open source](https://source.android.com/setup/contribute/code-search) mobile operating system based on a modified version of the [Linux kernel](https://kernel.org/) created by [Google](https://www.google.com/). [This](https://source.android.com/devices/architecture/) is its architecture. We're interested in the `APPLICATION FRAMEWORK` component, because that's where all the JVM stuff happens. Notice that I said JVM and not Java, because [Kotlin](https://kotlinlang.org/) is also used in app development.

Android utilises the [event-driven architecture](https://www.redhat.com/en/topics/integration/what-is-event-driven-architecture) to interact with the app user. Programmer-defined `EventListener`s listen for [events](https://developer.android.com/guide/topics/ui/ui-events) and when the appropriate event is fired then all listeners listening for that event execute their business logic.

For example, a [View](https://developer.android.com/reference/android/view/View) could have an `OnClickEventListener` registered to it, and when that view is clicked, an event is fired and the appropriate listener executes whatever is in the `onClick` function.

```java
// Create an anonymous implementation of OnClickListener
private OnClickListener corkyListener = new OnClickListener() {
    public void onClick(View v) {
      // do something when the button is clicked
    }
};

protected void onCreate(Bundle savedValues) {
    ...
    // Capture our button from layout
    Button button = (Button)findViewById(R.id.corky);
    // Register the onClick listener with the implementation above
    button.setOnClickListener(corkyListener);
    ...
}

```

This is just scratching the surface, so if the reader wants to learn more, I'd recommend [the udacity course](https://www.udacity.com/course/new-android-fundamentals--ud851) that got me started developing Java. I am not sponsored or anything, I just like the free material.

