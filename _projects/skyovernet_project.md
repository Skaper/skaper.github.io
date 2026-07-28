---
layout: page
title: "Skyovernet: A Physical Avatar for Twitch"
description: A Physical Avatar for Twitch
img: assets/img/projects/skyovernet/cover.jpg
importance: 5
category: personal projects
published: true
---

In 2016, I decided to try a different kind of livestream. Instead of putting a person in front of the camera, I wanted a physical robot to host the show.

The robot was a humanoid torso based on the open-source InMoov project. It could move its head and open its jaw. I added a metal chest plate, lighting, an oversized hat, and a moustache. That was how Skyovernet came to life: both a robot and the on-screen persona of a Twitch channel.

The robot sat in front of the camera while I stayed behind it. I wore a small IMU tracker on my head, with a microphone nearby. Skyovernet mirrored my head movements and moved its jaw whenever I spoke.

The most important part of the experiment was the control system. I did not want to trigger a set of pre-made animations or spend the entire stream working with a control panel. I wanted my own movements to become the input.

For the head tracker, I designed a separate board with an Arduino, an IMU, and an nRF24 radio module. The sensor measured the rotation and tilt of my head, then sent the data directly to another microcontroller inside the robot. There was no computer in the loop: my movements were translated straight into commands for the servo motors.

In effect, my body became the controller.

That is still one of my favorite parts of the project. The motion data were not being recorded to create an animation that could be played back later. They were a live control signal. A movement began with the person behind the camera and continued through the physical object in front of it. The robot was not performing a prepared routine; it was reacting along with me.

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/skyovernet/skyovernet-side.jpg" title="Side view of the Skyovernet humanoid robot" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/projects/skyovernet/skyovernet-streaming.jpg" title="Skyovernet seated at the livestream computer" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

## Voice as a Second Input

Voice provided the second input signal. The software analyzed the volume, frequency content, and pauses in my speech, then mapped them to movements of the robot’s jaw. This was not precise lip-sync or speech recognition. The goal was simpler: to create the impression that the robot was actually talking.

At the same time, the audio passed through real-time distortion effects. Viewers saw the robot moving and heard the character’s voice. Together, the head movements, moving jaw, and processed audio created a surprisingly convincing sense of presence.

Skyovernet also had a manual control panel for the servos, arms, and lighting colors. I wrote the main software in Python and the microcontroller firmware in C++ for Arduino. The project used two custom circuit boards: one for the tracker and another for controlling the robot.

## The Robot Goes Live

The project began as a conceptual experiment on Twitch. I wanted to find out whether a real robot could host a livestream and become the basis of a new format.

I streamed this way for about two or three months. A typical broadcast lasted two to three hours, and the most successful stream had around 350 concurrent viewers.

At first, many people did not believe the robot was real. They assumed it was CGI or a character composited over the video. I had to show them that there really was a physical machine in front of the camera, complete with servo motors, wires, and 3D-printed parts.

A 26-minute recording of one of the streams, published in May 2016, is still available.

<div class="project-video">
  <iframe
    src="https://www.youtube.com/embed/1JfsPayV82c"
    title="Skyovernet Twitch stream recording"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</div>

## The Physical Cost of Conversation

Streaming demands consistency. If you want a channel to grow, you need to go live regularly and stay on air for a reasonable amount of time. This is where the main difference between a physical avatar and a digital one became obvious: a digital model does not get tired, but a robot certainly does.

The servos in the head overheated during long sessions. I modified their housings, installed heat sinks, and added active cooling.

The jaw mechanism was a more difficult problem. A streamer needs to keep talking to the audience, which meant that this motor ran almost continuously. Over the course of several broadcasts, I burned through a pile of standard servos. Sometimes I had to replace the jaw actuator after almost every stream.

The mechanics themselves added even more strain. The parts were 3D-printed and their surfaces were not perfectly smooth. To reduce friction, I sanded them, smoothed the outer layers with acetone vapor, and used generous amounts of silicone lubricant.

After several weeks of experiments and plenty of burned-out actuators, it became clear that an ordinary servo was not enough for the jaw. I built my own actuator instead, using a more powerful motor, a precise magnetic position sensor, and a separate control board. I also wrote a PID controller to manage the movement.

After this upgrade, the jaw became more precise and overheated far less often. What started as a practical repair turned into a small engineering project of its own: the robot had to survive several hours of continuous conversation with an audience.

## What the Experiment Left Behind

Skyovernet showed that body position and voice can work as natural inputs for a physical machine. Just two degrees of head movement and a simple jaw response were enough for viewers to perceive the robot as a living host.

The project also revealed the gap between a demonstration and continuous operation. Building a working prototype is one challenge. Making it perform reliably through hours of regular livestreams is another.

Skyovernet never became a product, nor was that the goal. For me, it was an experiment at the intersection of robotics, streaming, and human–computer interaction. It showed that an interface does not have to be a set of buttons, a mouse, or a text field. The body itself can become the interface: its position, its movements, and its voice.
