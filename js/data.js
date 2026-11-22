// All site content lives here so the team can edit words without touching layout code.

window.SUCCESSOR = {
  people: {
    alex: {
      name: "Alex", age: 23, colour: "#7FD1B9",
      role: "Autistic, with high support needs. Left school last year.",
      detail: "Loves his playlist and knows exactly which song comes next. Communicates mostly through gestures, sounds and taps."
    },
    linda: {
      name: "Linda", age: 61, colour: "#F3B33D",
      role: "Alex's mum. Knows everything about his care.",
      detail: "Twenty-three years of routines, triggers and small fixes, all of it in her head and nowhere else."
    },
    rose: {
      name: "Rose", age: 84, colour: "#B9A7F0",
      role: "Linda's mother. Her health is declining.",
      detail: "Since her fall, Linda now cares for two people, in two rooms, often at the same time."
    },
    sam: {
      name: "Sam", age: 28, colour: "#8FB8E8",
      role: "Alex's brother. Lives across town.",
      detail: "Wants to help, but has never done Alex's routines on his own."
    },
    jordan: {
      name: "Jordan", age: null, colour: "#E8A2B8",
      role: "Support worker at the supported-living home Alex moves to.",
      detail: "Good at the job, new to Alex. Has a week to learn what took Linda twenty years."
    }
  },

  modes: {
    learning: { label: "Learning", colour: "#B9A7F0" },
    guiding: { label: "Guiding a helper", colour: "#F3B33D" },
    running: { label: "Running a routine", colour: "#7FD1B9" },
    resting: { label: "Resting", colour: "#8A97B3" }
  },

  safety: {
    alone: { label: "Can run alone", colour: "#3FB27F" },
    person: { label: "Needs a person present", colour: "#F08A3C" },
    none: { label: "No routine running", colour: "#5B6680" }
  },

  features: {
    handle: { name: "Carry handle", text: "Goes with the person, not the house. Light enough (under 2 kg) for an older parent to carry one-handed." },
    dome: { name: "Tap surface", text: "Tap the top for \"again\" or \"next\". Works without words, so it suits people who communicate by touch." },
    head: { name: "Turning head", text: "The robot's one motor. It turns toward the sink, the bed or the shelf, and toward the right room when a routine is due." },
    eye: { name: "Learning eye with a lid", text: "Records only while the lid is open, so everyone can see when it is learning. There is no always-on camera." },
    voice: { name: "Parent's voice", text: "Plays the parent's own recorded tips, step by step, in the way they would say them." },
    mode: { name: "Mode light", text: "Shows what the lantern is doing: learning, guiding a helper, running a routine or resting." },
    projector: { name: "Step projector", text: "Shows the next step on a counter, wall or bed edge, so hands stay free." },
    record: { name: "Record button", text: "Press, talk, done. It opens the lid and files the tip under the right moment: bath time, meals, going out, bedtime." },
    dial: { name: "Person dial", text: "Switches between care profiles, for the adult child and a grandparent, so one helper can cover both." },
    safety: { name: "Safety light", text: "Green means this routine can run alone. Amber means a person must be present. The parent decides for each routine." },
    keys: { name: "Playback keys and call key", text: "Again, next and volume, usable by the adult child too. An optional blue key starts a live call with the parent, only if the family turns it on." },
    dock: { name: "Room docks", text: "A low-cost dock in each care room charges the lantern and tells it which room it is in, so it knows which routines belong there." },
    pad: { name: "\"That worked\" pad", text: "Tap the handle and say a few words after something goes well. Everyday care becomes the record, with no separate recording sessions." },
    sweep: { name: "Head sweep", text: "About 300 degrees of turn, enough to face any part of a room from a counter or shelf." }
  },

  // Which view shows each feature, and where its hotspot sits (in the 700 x 560 drawing).
  hotspots: {
    front: { handle: [220, 192], dome: [220, 236], eye: [220, 271], voice: [220, 342], mode: [220, 407], projector: [262, 445] },
    side: { head: [290, 266], handle: [220, 168], projector: [283, 444], dock: [220, 487] },
    back: { record: [220, 271], dial: [220, 340], safety: [220, 385], keys: [220, 423], dock: [220, 489] },
    top: { eye: [230, 221], sweep: [322, 226], pad: [230, 290], handle: [175, 290] }
  },

  scenarios: [
    {
      id: "playlist", title: "The playlist loop", tag: "Repeat requests",
      room: "Living room, Tuesday afternoon",
      summary: "Alex wants the same songs, in the same order, again and again. Linda has been the remote control.",
      steps: [
        { title: "Before the lantern", mode: "resting", safety: "none", feature: null, projected: "",
          lines: { alex: "Wants the same song again. It's the fifth time, and that's how he likes it.", linda: "Gets up to change it, for the twelfth time this hour. She can't leave the room." } },
        { title: "Alex taps the dome", mode: "running", safety: "alone", feature: "dome", projected: "Again",
          lines: { alex: "Taps the top of the lantern, his sign for \"again\".", lantern: "Plays the song again. No one else has to move." } },
        { title: "It learns the order", mode: "running", safety: "alone", feature: "keys", projected: "Next: song 4",
          lines: { alex: "Taps for the next one.", lantern: "Has noticed that song 4 always follows song 2, so it's ready. It learns from his taps, not from a camera." } },
        { title: "Linda sits down", mode: "running", safety: "alone", feature: "mode", projected: "",
          lines: { linda: "Makes tea and calls her mother.", lantern: "Keeps the loop going. It never tries to stop the repetition; it just frees Linda from being the remote control." } }
      ]
    },
    {
      id: "teaching", title: "Teaching the lantern", tag: "Learning mode",
      room: "Bathroom, Monday evening",
      summary: "Linda records what she knows while she does it, not in a separate session.",
      steps: [
        { title: "Press, talk, done", mode: "learning", safety: "none", feature: "record", projected: "",
          lines: { linda: "Presses the record button. The lid on the lantern's eye opens, so everyone can see it is learning." } },
        { title: "She says it out loud", mode: "learning", safety: "none", feature: "eye", projected: "",
          lines: { linda: "\"Blue towel first, always. If he hums low, give him a minute.\"", lantern: "Files the tip under bath time." } },
        { title: "Alex has a say", mode: "learning", safety: "none", feature: "keys", projected: "Keep this tip?",
          lines: { alex: "Hears the clip played back and taps \"keep\". He can remove any clip about him.", linda: "Waits for his answer." } },
        { title: "\"That worked\"", mode: "resting", safety: "none", feature: "pad", projected: "",
          lines: { linda: "After a calm evening, taps the handle: \"That worked. Lavender soap, not the mint one.\"", lantern: "Adds it to tomorrow's routine." } }
      ]
    },
    {
      id: "winddown", title: "The 7pm wind-down", tag: "Routine runner",
      room: "Alex's bedroom, every evening",
      summary: "A routine Alex can do on his own, with the lantern showing the way.",
      steps: [
        { title: "It's 7pm", mode: "running", safety: "alone", feature: "head", projected: "",
          lines: { lantern: "Turns toward Alex's room and starts the evening routine. Nobody has to remember.", alex: "Sees the light change and knows what comes next." } },
        { title: "The first step appears", mode: "running", safety: "alone", feature: "projector", projected: "Pyjamas: second drawer",
          lines: { lantern: "Projects the first step onto the bed edge and plays Linda's voice: \"Second drawer, the soft ones.\"" } },
        { title: "At his own pace", mode: "running", safety: "alone", feature: "dome", projected: "Teeth: blue brush",
          lines: { alex: "Works through each step and taps when he's ready for the next.", lantern: "Waits. There's no timer and no rush." } },
        { title: "Linda gets her evening back", mode: "running", safety: "alone", feature: "safety", projected: "Lights low",
          lines: { linda: "Reads in the kitchen for forty minutes.", lantern: "The safety light is green: Linda has marked this routine as one Alex can do alone." } }
      ]
    },
    {
      id: "tworooms", title: "Two rooms at once", tag: "Compound caregiving",
      room: "Living room and Rose's room, Thursday evening",
      summary: "Rose needs Linda at the same moment Alex's routine is due.",
      steps: [
        { title: "Two people need her", mode: "resting", safety: "none", feature: null, projected: "",
          lines: { rose: "Calls for Linda. It's time for her evening medication.", alex: "It's also time for his evening routine.", linda: "Can only be in one room." } },
        { title: "Linda turns the dial", mode: "running", safety: "alone", feature: "dial", projected: "",
          lines: { linda: "Turns the person dial to Alex and starts his routine on the way to Rose's room." } },
        { title: "The lantern covers the living room", mode: "running", safety: "alone", feature: "projector", projected: "Shoes off, by the door",
          lines: { lantern: "Guides Alex through the routine in Linda's voice.", rose: "Gets Linda's full attention.", alex: "Follows the steps he knows." } },
        { title: "Back together", mode: "resting", safety: "none", feature: "mode", projected: "",
          lines: { linda: "Comes back and sees the routine finished from the mode light.", alex: "Is already settled." } }
      ]
    },
    {
      id: "sunday", title: "Sunday handover", tag: "Everyday handover",
      room: "Kitchen, Sunday lunch",
      summary: "Sam takes over lunch for the first time, so Linda can spend the day with Rose.",
      steps: [
        { title: "Sam arrives", mode: "guiding", safety: "person", feature: "dock", projected: "",
          lines: { sam: "Has never done Alex's lunch on his own.", lantern: "Sits on the kitchen dock and knows which routines belong in this room." } },
        { title: "Step by step", mode: "guiding", safety: "person", feature: "voice", projected: "Plate first, then the yellow cup",
          lines: { lantern: "Projects each step and plays Linda explaining why: \"The yellow cup tells him lunch has started.\"", sam: "Follows along." } },
        { title: "Sam gets stuck", mode: "guiding", safety: "person", feature: "head", projected: "Radio on, then sit",
          lines: { sam: "\"He won't sit down.\"", lantern: "Turns to the radio and plays Linda's clip: \"He sits once the radio is on.\"" } },
        { title: "Nothing changed", mode: "resting", safety: "none", feature: null, projected: "",
          lines: { alex: "Stays calm, because lunch went the way it always goes.", sam: "Offers to come every Sunday.", linda: "Spends the day with Rose." } }
      ]
    },
    {
      id: "crisis", title: "The crisis night", tag: "Emergency handover",
      room: "Bathroom, 9pm, the night Linda is in hospital",
      summary: "Linda has a fall. For the first time, nobody who knows Alex's care is in the house.",
      steps: [
        { title: "The phone call", mode: "resting", safety: "none", feature: null, projected: "",
          lines: { linda: "Has a fall and is taken to hospital.", sam: "Drives over at 9pm. He has never done bath time." } },
        { title: "Amber means stay", mode: "guiding", safety: "person", feature: "safety", projected: "",
          lines: { lantern: "Bath time shows an amber safety light: a person must be present. It guides Sam, never Alex alone.", sam: "Stays in the room." } },
        { title: "Linda's voice in the room", mode: "guiding", safety: "person", feature: "voice", projected: "Blue towel first",
          lines: { lantern: "\"Blue towel first, always. If he hums low, give him a minute.\"", alex: "Hears his mum's voice and relaxes." } },
        { title: "A call from the ward", mode: "guiding", safety: "person", feature: "keys", projected: "",
          lines: { sam: "Presses the blue key when he isn't sure about the next step.", linda: "Talks him through it from her hospital bed. (Live calls are opt-in.)" } }
      ]
    },
    {
      id: "movingon", title: "Moving on", tag: "Passing the lantern",
      room: "Alex's new room, a year later",
      summary: "Alex moves into supported living. His care moves with him.",
      steps: [
        { title: "He carries it in himself", mode: "resting", safety: "none", feature: "handle", projected: "",
          lines: { alex: "Carries the lantern into his new room by the handle.", jordan: "Meets Alex for the first time." } },
        { title: "A new dock, the same routines", mode: "running", safety: "alone", feature: "dock", projected: "Pyjamas: second drawer",
          lines: { lantern: "Clicks onto the new room's dock and runs the same 7pm wind-down.", jordan: "Learns in a week what took Linda twenty years." } },
        { title: "\"When is mum coming?\"", mode: "running", safety: "alone", feature: "voice", projected: "",
          lines: { alex: "Asks the question he asks every evening.", lantern: "Answers in Linda's voice: \"Sunday, after lunch.\"" } },
        { title: "Sunday", mode: "resting", safety: "none", feature: null, projected: "",
          lines: { linda: "Visits as his mum, not as his carer.", alex: "Shows her the new room." } }
      ]
    }
  ],

  arc: [
    { title: "The cliff", tension: 0.45, text: "Alex finishes school. Overnight, Linda becomes his teacher, therapist, scheduler and remote control." },
    { title: "Two people, one head", tension: 0.72, text: "Rose falls ill. Linda now cares for two people, and she is the only one who knows how either likes things done." },
    { title: "Linda gets her evenings back", tension: 0.42, text: "The lantern starts helping every day: the playlist, the wind-down, Sunday lunch with Sam." },
    { title: "The phone call", tension: 0.95, text: "Linda has a fall and is taken to hospital. Sam has to step in that night." },
    { title: "Mum's voice in the room", tension: 0.5, text: "The lantern guides Sam through bath time in Linda's own words. Alex stays calm. So does Sam." },
    { title: "Passing the lantern", tension: 0.22, text: "A year later Alex moves into supported living, carrying the lantern himself. Linda's care goes with him." }
  ]
};
