---
tags: [guides, needs-app-changes]
lane: 5
written: 2026-11-14 (2E)
updated: 2026-11-15 (Wave 5, lane 5)
---
# Lane 5 · needs app changes

Written by the Wave 5 recording session for lane 5. Nothing in `app\` was changed. Each row is a screen or a bit of demo data the robot could not reach through the app's own screens, so its video is not made yet. 6B or an app session can add what is asked here, then 6A makes those videos.

## Videos not made, and why

| Video | Screen | What is missing | Why it can't be recorded |
|---|---|---|---|
| `V-5-team-1`, `V-5-team-2` | **Team** (business) | A second person on the team with the **Staff** role, and a **Staff** demo login | The Team page says invites come later (`Business.team.invitesLater`). There is no screen that adds a team member, so the robot can't set one up. The lane 5 seed adds only the owner. Needs: either an invite screen, or the seed adding `guide-l5-staff@example.test` as **Staff** of Utsav Planners |
| `V-5-planning-team-1` | **Members** > **Planning team** (wedding) | The same second team member, listed under **Planning team** | The panel lists the business's team. With only the owner there is nobody to make a coordinator. Same fix as above |
| `V-5-family-feedback-1` | **Family feedback** (planner Home) | One made-up family rating for Utsav Planners (5 out of 5, with a short note) | A rating is sent from the family's **Wrap-up**, which opens only after the last function (Mon 15 Feb in the demo, 3 months away). The robot can't open it yet. Needs: a rating row in the lane 5 seed, or a date-shifted copy of the wedding |

The four guides stay `status: draft`, `video: script`. The written steps were checked on the running app as far as the screens allow (see `_lane-status.md`).

## For 6B: selectors the recorder needs

None so far. Every recorded step was found by its role and label.

## Notes for the app session

- **A planner or vendor with one business** is sent straight to it from `/business`, so they never see the **Set up your business** form from **Your weddings**. The set-up video uses the host login (Riya Sharma, who has a wedding and no business). The guide's **Set up another business** tip applies only to someone with two or more businesses.

## Moved by 3A (14 Nov 2026)

**Demo data.** The robot sets data up **off camera** before each video, through the app's own screens, with no seed change. Each video's set-up is in the "Set up off camera" column of [[_video-list]]. The cases the app has no screen for are the rows above.

**App fixes** (hide **Ask for a wedding** from vendors, "Krama pays it out", "workspace" in `Proposal.donePlanner`, the business (+) title) are in [[_app-fixes]]. The Leads empty state stays as it is: the guide tells people to ignore its enquiry form line until the form is live.
