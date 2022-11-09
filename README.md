
# What sine-messaging-react is
A website that uses javascript's web apis to send and receive data wirelessly between devices using only sound.

# How it works
The text is converted to binary using Utf-8.
Using a AudioContext oscilator it generates and transmits trough the speakers a sine wave of a specified frequency for some pre-determined milliseconds. The frequency depends on the pair of bits currently being broadcast. 
Ex: `00` -> ``18200hz`` 
    `01` -> ``18400hz``

The listner then analises the amplitude of each frequency using a fast fourier transform to detect the distinct signature of a signal over the background noise.
When that happens it'll log the frequencies received over the duration of the message.
Finally it will read the data and decode it to binary by counting how long each sine wave lasted.
Ex: Ìf it recorded `18200hz, 18200hz, 18200hz, 18200hz, 18400hz, 18400hz` and we know that each pair of bits should show up twice based on the sample rate and transmition time then we know that the signal was `00001100` = `?`

# How to use it
Navigate to https://gugajazz.github.io/sine_messaging_react on a chromium based browser.

## Send data
![](imgs/send1.png)
Type your message ( Expect arround 10s for word on default settings )

## Receive data
![](imgs/receive1.png)
![](imgs/receive2.png)
While waiting the red light will look as shown ![](imgs/receive3.png)
When a signal is comming in ripples will appear as shown ![](imgs/receive4.png)

# Warnings
By default sine-messaging-react uses frequencies between 18200hz and 18800hz. Frequencies in this range usually arent audible by humans but can and will still cause hearing damage if listened to at unsafe levels.
It is then recomended that for short range communication ( <5m ) the users use a low volume which usualy is enough and increase it progressivly if nessesary to achieve reliable opperation at longer ranges.  

# Results
This project was mostly a proof of concept to show that data can be transmited through sound at inaudible frequencies using common, every-day hardware, across platforms and fully offline (excluding loading the website).

With that being said there are multiple paths that could and perhaps will be taken in the future to improve performance and relliability.
The default settings aim to work across the wider range of hardware, from phones to tablets, PCs and maybe some fridges. For those reasons they can be tweaked to vastly improve the trasmition times. 

Results with default settings:

- Baud rate:

- Bit rate:

- Range:


# For future me

**Building and deploying to github pages**

On main branch run `npm run build`.
Copy the contents of the ``build`` folder, go to the build branch and paste them.
Then just commit and push.

Warning : Make sure that on `package.json` there is the folowing line ``"homepage": ".",``.
