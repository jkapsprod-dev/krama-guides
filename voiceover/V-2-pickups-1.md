---
tags: [voiceover]
video: V-2-pickups-1
voice: hi_IN-pratham-medium
---
# V-2-pickups-1 · How to plan pickup runs

From [[pickups]]. Made by `npm run make` in `kit\`; don't edit by hand, it is written again on every make.

**Voice:** AI voice `hi_IN-pratham-medium` (OpenMontage Piper), files in `voiceover\ai\V-2-pickups-1\`. Each line starts at its step (after 0.3 s of quiet).

| # | phone start | phone end | desktop start | desktop end | Voice says | Caption | AI reads |
|---|---|---|---|---|---|---|---|
| 0 | 3.3 | 7.8 | 3.3 | 7.8 | Teen flight subah chhe baje ke aas paas aa rahi hain. Ek hi gaadi kaafi hai. | Three flights, one car | तीन फ़्लिघ्त सुबह छे बजे के आस पास आ रही हैं। एक ही गाड़ी काफ़ी है। |
| 1 | 8.6 | 10.1 | 8.7 | 10.1 | Stays and Travel kholo. | Open Stays & Travel | स्टेज़ ऐंड ट्रैवल खोलो। |
| 2 | 13.7 | 15.1 | 13.7 | 15.1 | Pickups tab pe tap karo. | Open Pickups | पिकअप्स टैब पे टैप करो। |
| 3 | 18.7 | 20.5 | 18.7 | 20.5 | Time window mein minutes likho. | Set the time window | टाइम विंदोव में मिनुतेस लिखो। |
| 4 | 23.7 | 25.2 | 23.7 | 25.2 | Suggest runs pe tap karo. | Tap Suggest runs | सुग्गेस्त रुंस पे टैप करो। |
| 5 | 28.7 | 31.9 | 28.7 | 32.0 | Yeh sujhaaye hue runs hain. Abhi kuch save nahi hua. | Nothing is saved yet | यह सुझाये हुए रुंस हैं। अभी कुछ सेव नहीं हुआ। |
| 6 | 34.7 | 36.4 | 34.7 | 36.4 | Make these runs pe tap karo. | Tap Make these runs | मेक थेसे रुंस पे टैप करो। |
| end | 39.7 | 42.7 | 39.7 | 42.7 | Ho gaya. Ab run mein driver aur gaadi jodo. | The run is ready | हो गया। अब रन में ड्राइवर और गाड़ी जोड़ो। |

Times are seconds from the start of each finished video (the 3 s intro title included).

## Check these words

The AI voice spelled these by rule, so they may sound a little off: **flight**, **chhe**, **baje**, **aas**, **kaafi**, **window**, **minutes**, **suggest**, **runs**, **sujhaaye**, **hue**, **these**. Add them to `kit\voice\hinglish-words.json` and run make again.

## Record your own voice for this video

Read the **Voice says** lines in order, calmly, with about one second of quiet between lines. Save it as `voiceover\my-voice\V-2-pickups-1.wav`, then run `npm run make -- --id V-2-pickups-1` in `kit\`. The kit cuts it into lines, the robot records again so every step fits your voice, and both videos are made again with your voice.

## Files

- `videos\final\2-guests\V-2-pickups-1-phone.srt`
- `videos\final\2-guests\V-2-pickups-1-phone.mp4`
- `videos\final\2-guests\V-2-pickups-1-desktop.srt`
- `videos\final\2-guests\V-2-pickups-1-desktop.mp4`
