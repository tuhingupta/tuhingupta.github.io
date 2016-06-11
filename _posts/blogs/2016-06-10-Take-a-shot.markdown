---
layout: page
title: Take a shot with Firebase Test Lab
summary: You should be testing your apps. In this post, we'll walkthrough how AMEX integrates Screenshot Testing with Firebase Test Lab to improve app quality
date: 2016-06-10
author: Kylan Johnson
permalink: /blogs/:year/:month/:day/:title/
---

## Take a Shot ##

As a Mobile Developer there are a few aspects to my job that are especially rewarding. (Bet you can't guess).  Yes, contributing to an well-known app and working on new features that get 5-star reviews are nice.  But, perhaps greater than both is seeing all-green on my test suite.

That may sound lame initially, but think about it: if your app were used by millions of people, how much assurance would you want that it's doing what you intended? Anything to give more confidence to a dev team is worth pursuing and nothing quite gives our team confidence like a slew of green builds on a CI server  **\*\*Nerd Alert\*\* **

###You should be testing
Android developers have a lot to choose from these days to [test our apps](https://developer.android.com/studio/test/index.html).  There is jUnit for unit tests, Espresso and UI Automator for Integration tests, and even Monkey Testing for extra special circumstances.  But, have you also heard of Screenshot testing?  *(Hear more about how we test [here](https://www.youtube.com/watch?v=-xQCNf_5NNM))*  

It's actually just as it sounds: a screenshot test is one where a part of the UI is captured and compared to a known Master Copy.  If the images match, the test passes, if not, the test fails.  By being just-another-test, we're able to include them with all other tests and in our development process as a whole.

Obviously, we do this for the sake of app quality, but there are plenty of other reasons.

1. **Testing of the View Layer:**    Screenshot Tests are a good way to check all the states a particular View may be in so you can find layout bugs sooner.  Any UI element can be the target of a screenshot test and you can prime it with all sorts of test data and capture it.  You can render all kinds of character sets, ascenders/descenders, height and widths and verify that it looks just right.

2. **Better-than-Human Verification:**   Image processing libraries can perform diffs on pictures and detect if even 1 pixel changes.  Your 1-line change on one screen could affect an entirely different screen too and you may never know it until it's too late.  If you're about to refactor your UI layer, but don't want a visible change to the user, then screenshot testing will be invaluable.

3. **Auto Cataloging:**  Every screenshot can be saved as a test artifact and then displayed for all to see.  You don't have build and install an app to see what the current screen looks like, you can just send a URL! 

4. **A Picture is Worth 1024 words:**  Many times, teams work best off of screenshots for collaboration.  If screenshots are part of your test harness then they can be part of your Peer Review Process too.  We regularly pull in designers on PRs to get approval sooner and in context of the change.

Now that we all think we should be testing, how can we include this in everyday development?  

###Testing Locally
For Android, we've begun using [Facebook Screenshot Tests for Android](https://github.com/facebook/screenshot-tests-for-android).  The tool provides a Java library to capture the screenshot during a test and a Gradle plugin that can be used to execute your tests and display the results.  

Here is an example screenshot capture for a single view.  This snippet will create PNG file locally on the target device.  Here we're specifying a width in DP, but there are other parameters you can pass into the API.


```
ViewHelpers.setupView(view)
        .setExactWidthDp(widthInDp)
        .layout();

Screenshot.snap(view)
        .record();
```
 
Next, execute your tests however you like.  Here are a couple examples.

```
./gradlew connectedAndroidTest    # Runs all the tests
```
 
If you want to get fancy, you can also just execute one test class.  Here the application package name is com.example.app and our class is called oneTestClass.  Go [here](https://developer.android.com/studio/test/command-line.html) for more details.

```
adb shell am instrument -e class com.example.app.oneTestClass   # Runs one Test Class
```
 
To compare it to our Master copy, all we need to do is call the Gradle plugin.  This command will capture the screenshots taken from the most recent test run and verify them against your Master set

```
./gradlew verifyMode pullScreenshots
```

###Testing at Scale
But does this approach scale?  If our test suite was on the smaller side (say, < ~100 tests) this approach may be ok, but since it only works on one device at once it will be difficult to move beyond that.  At AMEX, our app has over 1100 integration tests it needs to run so testing them locally on one device wouldn't be very practical.   We could get more devices and run tests in parallel but who will maintain them?  (not me)  And each developer can't possibly have the same setup.

Fortunately, there are cloud-hosted solutions that will run your tests for you!  I won't go over the various options, but here at AMEX we use [Firebase Test Lab](https://firebase.google.com/docs/test-lab/) to execute of all our Instrumentation tests. (We recently shared our story at [Google I/O](https://www.youtube.com/watch?v=4fyhgHQYG1U))

###Making it work on Firebase Test Lab

Since we have no direct access to our test device, the Screenshot plugin will not work out of the box.  We could modify it by integrating it with our Firebase bucket, but not all users will chose Firebase.  Our solution was to provide another Gradle task that used a given directory for the reference-set rather than depending on ADB to provide it:  
 
Here is the updated command (Note that we're no longer running `connectedAndroidTest` or calling ADB because Firebase Test Lab will run our tests for us)

```
./gradlew verifyMode pullScreenshotsFromDirectory
```
 
The new pullScreenshotsFromDirectory behaves just as pullScreenshots does except with no dependency on a device.  Since no ADB device is necessary it's easy to run this on a CI server; all you need is Gradle.  We simply need to configure the plugin to know where there recorded and reference screenshots are for the test run.  We can do that in our `build.gradle` file with the following config.

```
screenshots {
  // This parameter points to the directory containing all the files pulled from a device
  recordDir = "${projectDir}/screenshots"
 
  // For verification against local files, this parameter can be specified to point to the directory
  referenceDir = "${projectDir}/.screenshots"

  // Your app's application id
  targetPackage = "your.application.package"
}
```
 
###TL;DR Putting it all Together
Here's the basic flow of our CI Setup with Screenshot Testing Included.

<img src="/img/blogs/CI_Setup.jpg" alt="" title="CI Flow" height="700" width="600"/>

####The Basic Process
1. We submit our job to be run on our CI Server. 
1. The Job individually runs each test on Firebase
1. As part of each run, the artifacts are collected by the CI server
1. Our Gradle Plugin is called by the server to verify the screenshots
1. If the screenshots in referenceDir match those found in recordDir, then the CI server can approve the test run.  Otherwise, the run will fail and generate a report just as any other failure would!

###Next Steps
The addition of Screenshot Tests into our normal workflow has certainly improved our process and certainly increase our app quality but more can be done.  We're actively developing in this domain, so stay tuned for more announcements.
 
 
