---
tags: [voiceover]
video: V-2-pickups-2
voice: hi_IN-pratham-medium
---
# V-2-pickups-2 · How to add a run by hand

From [[pickups]]. Made by `npm run make` in `kit\`; don't edit by hand, it is written again on every make.

**Voice:** AI voice `hi_IN-pratham-medium` (OpenMontage Piper), files in `voiceover\ai\V-2-pickups-2\`. Each line starts at its step (after 0.3 s of quiet).

| # | phone start | phone end | desktop start | desktop end | Voice says | Caption | AI reads |
|---|---|---|---|---|---|---|---|
| 0 | 3.3 | 6.7 | 3.3 | 6.7 | Station se haveli tak gaadi kaun legi, yeh tay karna hai. | Who drives to the station? | स्ततिओं से हवेली तक गाड़ी कौन लेगी, यह तय करना है। |
| 1 | 8.3 | 9.5 | 8.3 | 9.5 | Pickups tab kholo. | Open Pickups | पिकअप्स टैब खोलो। |
| 2 | 13.3 | 14.5 | 13.3 | 14.5 | Add a run pe tap karo. | Tap Add a run | ऐड अ रन पे टैप करो। |
| 3 | 18.3 | 21.7 | 18.3 | 21.7 | Kahan se, kis din aur kis time nikalna hai, woh bharo. | Place, date and time | कहाँ से, किस दिन और किस टाइम निकल्ना है, वो भरो। |
| 4 | 25.3 | 26.7 | 25.3 | 26.7 | Gaadi aur seats likho. | Vehicle and seats | गाड़ी और सेअत्स लिखो। |
| 5 | 30.3 | 31.2 | 30.3 | 31.2 | Driver chuno. | Choose the driver | ड्राइवर चुनो। |
| 6 | 35.3 | 36.6 | 35.4 | 36.7 | Save run pe tap karo. | Tap Save run | सेव रन पे टैप करो। |
| end | 40.3 | 42.6 | 40.4 | 42.6 | Ho gaya. Run list mein aa gaya. | The run is on the list | हो गया। रन लिस्ट में आ गया। |

Times are seconds from the start of each finished video (the 3 s intro title included).

## Check these words

The AI voice spelled these by rule, so they may sound a little off: **station**, **haveli**, **legi**, **nikalna**, **seats**. Add them to `kit\voice\hinglish-words.json` and run make again.

## Record your own voice for this video

Read the **Voice says** lines in order, calmly, with about one second of quiet between lines. Save it as `voiceover\my-voice\V-2-pickups-2.wav`, then run `npm run make -- --id V-2-pickups-2` in `kit\`. The kit cuts it into lines, the robot records again so every step fits your voice, and both videos are made again with your voice.

## Files

- `videos\final\2-guests\V-2-pickups-2-phone.srt`
- `videos\final\2-guests\V-2-pickups-2-phone.mp4`
- `videos\final\2-guests\V-2-pickups-2-desktop.srt`
- `videos\final\2-guests\V-2-pickups-2-desktop.mp4`
