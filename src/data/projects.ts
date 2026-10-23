export type ProjectCategory =
  | "Machine Learning"
  | "Backend / Distributed Systems"
  | "Mobile Development"
  | "Game Development"
  | "Web Development"
  | "Software Engineering";

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  fit?: "contain";
}

export interface ProjectFeature {
  title: string;
  description: string;
  image: ProjectImage;
}

export interface JamResults {
  name: string;
  url: string;
  entries: number;
  ratings: number;
  rankings: { criterion: string; rank: number; score: number }[];
}

export interface Project {
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string[];
  role?: string;
  projectDates?: string;
  contribution?: string[];
  technicalChallenges?: string[];
  results?: string[];
  overviewLink?: { intro: string; label: string; url: string };
  personalComments?: string[];
  keyConcepts?: string[];
  technologies: string[];
  category: ProjectCategory;
  githubUrl?: string;
  liveUrl?: string;
  links?: { label: string; url: string }[];
  image?: ProjectImage;
  imageCaption?: string;
  gallery?: ProjectImage[];
  youtubeVideoId?: string;
  features?: ProjectFeature[];
  jamResults?: JamResults;
  commentHighlights?: { author: string; quote: string }[];
  feedbackSummary?: string;
  storyLinks?: { title: string; url?: string; status?: string }[];
  featured: boolean;
  year?: number | string;
}

// These are editable examples. Replace descriptions and links with verified project details.
export const projects: Project[] = [
  {
    title: "Volume Glance",
    slug: "volume-glance",
    year: 2026,
    shortDescription:
      "An Android app that shows Media and Ring volume together in a temporary popup, with quick presets and home-screen widgets.",
    role: "Independent designer and developer",
    projectDates: "2026–present",
    longDescription: [
      "Volume Glance is an independent Android app I designed and developed after running into a frustrating problem with Android's volume controls: it was too easy to adjust Media volume while leaving Ring volume unnoticed.",
      "I wanted a simple way to see both levels whenever I pressed the hardware volume buttons, without interrupting what I was doing. The temporary popup can show Media and Ring over other apps when optional background monitoring is enabled. The app also offers sound presets and home-screen widgets for quick changes.",
      "What started as a small utility grew into a complete app with a customizable popup and an optional Pro upgrade. The popup requires Android's Display over other apps permission.",
    ],
    contribution: [
      "I handled the entire development process, from the initial implementation and interface design to testing, onboarding, Google Play preparation, and gathering user feedback.",
      "I built background monitoring, the popup, sound presets, home-screen widgets, and the optional Pro features. Based on closed-testing feedback, I added direct volume adjustments from the popup and more customization options.",
      "During closed testing, testers found that background monitoring could stop after app updates, Pro feature restrictions were confusing, and the initial setup was difficult. I fixed the monitoring issue and improved onboarding based on their feedback.",
    ],
    personalComments: [
      "I built Volume Glance after missing an important call because I had raised Media volume instead of Ring. Later, a ringtone woke our baby. Both experiences made me want a quick way to see the two levels together.",
      "The challenge was making that check available wherever I was on the phone, without turning it into another screen I had to open. The popup is brief, while presets and widgets make common volume changes just as quick.",
      "Building Volume Glance has been an opportunity to make decisions not just as a developer, but as someone responsible for the whole product experience, including usability, reliability, and distribution.",
    ],
    results: [
      "The app is currently in a 14-day closed testing period, so the Google Play listing is available to testers rather than the public. The core app is free, with no ads or subscription. An optional one-time Pro upgrade adds popup customization, including position, size, duration, opacity, and the volume streams shown.",
      "I chose not to include advertising, analytics, or tracking to keep the app simple and respect user privacy.",
    ],
    technologies: ["Android", "Kotlin"],
    category: "Mobile Development",
    image: {
      src: "/images/volume-glance-promo.png",
      alt: "Volume Glance app icon beside a phone showing Media and Ring volume sliders",
      width: 1774,
      height: 887,
    },
    imageCaption:
      "Illustrative promotional artwork; the gallery below shows app screenshots.",
    gallery: [
      {
        src: "/images/volume-glance-popup-and-widgets.png",
        alt: "Volume Glance popup showing Media and Ring volume above preset widgets",
        width: 1080,
        height: 2400,
        caption:
          "The popup shows Media and Ring together; preset widgets sit on the home screen.",
      },
      {
        src: "/images/volume-glance-home-screen.png",
        alt: "Volume Glance home screen with sound levels, monitoring, and quick presets",
        width: 1080,
        height: 2400,
        caption:
          "The app's home screen shows the current levels and quick sound presets.",
      },
    ],
    links: [
      {
        label: "Volume Glance on Google Play (testing)",
        url: "https://play.google.com/store/apps/details?id=com.vmirchev.volumeinspector",
      },
      {
        label: "Privacy policy",
        url: "https://vmirchev.com/vg-privacy-policy.html",
      },
    ],
    featured: false,
  },
  {
    title: "PetalPaws",
    slug: "flower-image-classification",
    year: 2026,
    shortDescription:
      "Inspired by my cat Misho, I’m building a flower classifier to help others recognize potentially dangerous plants before their pets are harmed.",
    longDescription: [
      "The idea began after my cat Misho became sick from drinking water beneath a lily pot. I want to help other pet owners recognize dangerous plants before their pets have the same experience.",
      "The engineering focus is repeatable data preparation, meaningful evaluation, and a clear handoff between model training and inference.",
    ],
    overviewLink: {
      intro: "The original 16-class prototype is available as a",
      label: "Gradio demo on Hugging Face",
      url: "https://huggingface.co/spaces/vmmirchev/oxford-flowers-16-classifier",
    },
    storyLinks: [
      {
        title: "What 95% Accuracy Didn’t Tell Me About My Flower Classifier",
        url: "/blog/what-95-percent-accuracy-didnt-tell-me-about-my-flower-classifier/",
      },
      {
        title: "My Model Was 99% Confident. And Wrong.",
        url: "/blog/my-model-was-99-percent-confident-and-wrong/",
      },
      {
        title: "Data Collection",
        status: "Done; blog post coming soon",
      },
      {
        title: "Building a system around the model",
        status: "In progress",
      },
      {
        title: "Mobile application for a client",
        status: "In progress",
      },
    ],
    personalComments: [
      "The project is in progress and will be released in Q4 2026. Details coming soon.",
    ],
    technologies: ["Python", "PyTorch", "FastAPI", "Docker"],
    category: "Machine Learning",
    image: {
      src: "/images/flower-cover.webp",
      alt: "Illustrative collection of flowers framed for classification",
      width: 1200,
      height: 800,
    },
    gallery: [
      {
        src: "/images/cozy-pytorch-ninja-coding-den.png",
        alt: "Illustration of a PyTorch coding scene with a cat and lilies",
        width: 1448,
        height: 1086,
        caption: "The project began with PyTorch and a question inspired by Misho.",
        fit: "contain",
      },
      {
        src: "/images/rose-grad-cam.png",
        alt: "Rose photo beside a Grad-CAM heatmap for the rose prediction",
        width: 1764,
        height: 904,
        caption: "Grad-CAM highlights regions associated with a rose prediction.",
        fit: "contain",
      },
      {
        src: "/images/hippeastrum-rose-mistake-grad-cam-result.png",
        alt: "Hippeastrum image beside Grad-CAM heatmaps for rose and Hippeastrum scores",
        width: 2576,
        height: 888,
        caption: "Investigating a Hippeastrum the model misclassified as a rose.",
        fit: "contain",
      },
    ],
    featured: true,
  },
  {
    title: "ML From Scratch",
    slug: "ml-from-scratch",
    year: 2026,
    shortDescription:
      "NumPy implementations of neural network forward passes, loss functions, backpropagation, and optimization.",
    longDescription: [
      "High-level frameworks make it easy to train models, but they can hide details that matter when debugging, improving, and reasoning about learning systems. This project explores how models work internally by implementing their components manually using only NumPy.",
      "Each notebook builds on the previous one, covering the mathematics and engineering of model training, from propagation and optimization to regularization and evaluation. The goal is to bridge the gap between theory and practical implementation without relying on high-level ML frameworks.",
    ],
    personalComments: [
      "When you enter a new field, the first projects are usually the hardest. Even after completing two Machine Learning courses — a PyTorch bootcamp and Deep Understanding of Deep Learning — I can say that writing an ML model from scratch was a real brain teaser.",
      "Now that I have created multiple ML models and a few systems around them, I can say that understanding the fundamentals helps a lot. It also removes some of the mystery behind how a bunch of numbers running through a GPU can actually produce a useful output.",
      "I am really glad I pushed this project all the way to the end and finished with a system ready to be deployed, rather than yet another notebook.",
      "Now, looking at loss curves and comparing models using different metrics is no longer that confusing. Regularization techniques are not just something to add without knowing whether they are actually needed. Gradient descent isn't just a set of arrows pointing toward the lowest point, and backpropagation isn't just some magical process hidden behind `loss.backward()` — I now understand what is actually being calculated and why.",
      "And it is actually fun.",
      "Doing ML work gives you an excuse to explore areas of knowledge you would probably never dive into otherwise.",
    ],
    keyConcepts: [
      "Forward and backward propagation",
      "Gradient descent and backpropagation",
      "Loss functions and their derivatives",
      "Model evaluation and validation",
      "Cross-validation",
      "L2 regularization and Dropout",
      "Accuracy, Precision, Recall, and F1",
      "Threshold tuning for binary classification",
    ],
    technologies: ["Python", "NumPy", "Jupyter"],
    category: "Machine Learning",
    githubUrl: "https://github.com/vmirchev/ml-from-scratch",
    image: {
      src: "/images/ml-from-scratch-cover.webp",
      alt: "Illustrative notebook of machine learning plots and diagrams",
      width: 1200,
      height: 800,
    },
    featured: true,
  },
  {
    title: "IEEE-CIS Fraud Detection",
    slug: "ieee-cis-fraud-detection",
    year: 2026,
    shortDescription:
      "Imbalanced fraud classification with missing-data analysis, metric selection, gradient boosting, and Optuna tuning.",
    longDescription: [
      "A fraud detection project built around the IEEE-CIS dataset.",
    ],
    personalComments: [
      "Working on the IEEE-CIS Fraud Detection dataset was actually a suggestion from ChatGPT, and it turned out to be a very good one.",
      "The first thing it forced me to improve was my Exploratory Data Analysis. I had to move away from “let's look at everything” and focus on a more useful question: what information will actually affect my modeling decisions?",
      "The dataset contains a large number of anonymized Vesta engineered features, many of which have a strong relationship with the target despite having no obvious meaning. It is also fairly large, with 590,540 rows, so working within the limits of the free Colab tier became part of the challenge. By downcasting numeric columns, I reduced the DataFrame's memory usage by 36.2%.",
      "I also had to deal with severe class imbalance, missing data, and the question of whether missingness itself carried useful signal. Choosing the right evaluation metric was important as well, since accuracy would have been misleading for this task.",
      "For modeling, I used smaller experiments to identify the most useful feature groups, then settled on a gradient boosting model. I wrapped the workflow into a pipeline and used Optuna to tune the hyperparameters.",
      "Finally, I moved the project into Kedro with separate entry points for training and inference, so it ended as something structured with deployment in mind rather than just another notebook.",
    ],
    technologies: ["Kedro", "Optuna", "Gradient Boosting"],
    category: "Machine Learning",
    image: {
      src: "/images/ieee-cis-fraud-detection-cover.webp",
      alt: "Illustration of many legitimate transactions, a few fraud cases, and a tunable prediction threshold",
      width: 1536,
      height: 1024,
    },
    featured: false,
  },
  {
    title: "Outwalk",
    slug: "outwalk",
    year: "2015–2018",
    shortDescription:
      "A data-driven activity app turning steps and distance into social leaderboards, weekly reports, challenges, and badges.",
    role: "Team lead, iOS and backend developer",
    longDescription: [
      "Outwalk is a data-driven activity app that tracks steps and distance while walking, running, or jogging. It turns that activity into daily, weekly, and monthly leaderboards, personalized reports, challenges, and nearly 100 unlockable badges.",
      "Built for iOS and Android with companion watch experiences, it also includes automatic tracking, chat, a timeline built from activity data, and location-based comparisons between users. The idea was to make activity more engaging through friends, shared goals, and friendly competition.",
    ],
    contribution: [
      "I led the Outwalk team, built the backend, and was one of the two iOS developers. I worked with two Android developers, the other iOS developer, several UI/UX designers, and a QA engineer.",
      "Alongside writing code, I spent considerable time mentoring the other developers and coordinating work across the team as we built an app that combined activity tracking with social features, leaderboards, challenges, and personalized reports.",
    ],
    personalComments: [
      "Outwalk was built before modern activity-tracking apps became as common as they are today. At its core, it was a social network with a simple idea: make people more active by letting them compare their step count and distance with others.",
      "And it worked.",
      "Even in the early prototypes we shared with friends and family, we saw a huge increase in their daily activity. Some of them became so determined to take first place in the weekly ranking that they would spend their Sunday evenings walking for hours just to increase their step count.",
      "We added everything we could think of: leaderboards for different periods — day, week, and month — custom-made badges for daily steps and total distance, challenges, chats, a timeline with data-based information, and location-based comparisons between users.",
      "But somewhere along the way, we got lost in the details, and development went on for much longer than it should have. We thought that because we had a working proof of concept, if we just built everything properly, success would follow. Meanwhile, bigger competitors moved faster, captured a larger share of the market, learned from their users' feedback, and kept improving.",
      "I learned a lot from Outwalk, but two lessons stand out.",
      "First, adding more features doesn't always make a product better — something that later became very useful to me in game development.",
      "Second, when you're building something with a small team, release an MVP and listen to your users. Iterate often. Don't spend years building a massive application without real user interaction, even if a small group of testers gives you very positive feedback.",
      "That experience changed how I approached later projects. I became much more conscious of defining a manageable scope, getting a product into users' hands, and improving it based on their feedback.",
    ],
    results: [
      "We had a working prototype that encouraged friends and family to become more active, but we kept adding features instead of releasing a smaller product and learning from a wider group of users. Outwalk was developed for iOS and Android; its product and store pages are linked below.",
    ],
    technologies: ["iOS", "Android", "Apple Watch", "Wear OS"],
    category: "Mobile Development",
    image: {
      src: "/images/outwalk-cover-v2.webp",
      alt: "Outwalk app screen on a phone beside notes about steps, friends, and badges",
      width: 1536,
      height: 1024,
    },
    imageCaption:
      "Cover based on the official app screen in an illustrative outdoor mockup",
    features: [
      {
        title: "Built-in chat",
        description: "Keep in touch with friends inside the app.",
        image: {
          src: "/images/outwalk-feature-chat.png",
          alt: "Outwalk chat shown on a phone",
          width: 234,
          height: 234,
        },
      },
      {
        title: "Automatic activity tracking",
        description:
          "Track steps and distance while walking without keeping the app open.",
        image: {
          src: "/images/outwalk-feature-automatic-tracking.png",
          alt: "Outwalk running figure on a phone",
          width: 234,
          height: 234,
        },
      },
      {
        title: "Personalized weekly reports",
        description:
          "Review a weekly summary of steps, distance, and progress.",
        image: {
          src: "/images/outwalk-feature-weekly-reports.png",
          alt: "Outwalk weekly activity report",
          width: 234,
          height: 234,
        },
      },
      {
        title: "Progress transfer",
        description:
          "Transfer progress to a new device through Facebook login.",
        image: {
          src: "/images/outwalk-feature-progress-transfer.png",
          alt: "Outwalk profile and progress screen",
          width: 234,
          height: 234,
        },
      },
      {
        title: "Today Extension",
        description: "Check activity directly from the Notification Center.",
        image: {
          src: "/images/outwalk-feature-today-extension.png",
          alt: "Outwalk activity widget in Notification Center",
          width: 234,
          height: 234,
        },
      },
      {
        title: "Apple Watch",
        description:
          "Follow daily activity and friends, with steps or distance available in an Apple Watch complication.",
        image: {
          src: "/images/outwalk-feature-apple-watch.png",
          alt: "Outwalk activity display on Apple Watch",
          width: 234,
          height: 234,
        },
      },
    ],
    links: [
      { label: "Product site", url: "https://macropinch.com/outwalk/" },
      {
        label: "App Store",
        url: "https://apps.apple.com/us/app/outwalk/id1006583272",
      },
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.macropinch.treadmill",
      },
    ],
    featured: false,
  },
  {
    title: "MyGrocery",
    slug: "mygrocery",
    shortDescription:
      "Shared shopping lists with smart suggestions and device sync.",
    longDescription: [
      "MyGrocery helps households build and share shopping lists, with suggestions that speed up item entry.",
      "Lists can be imported, exported, and accessed from phones, watches, and home screen widgets.",
    ],
    technologies: ["iOS", "Android", "Apple Watch", "Wear OS"],
    category: "Mobile Development",
    image: {
      src: "/images/mygrocery-screen.png",
      alt: "MyGrocery shopping list displayed on a phone",
      width: 362,
      height: 575,
    },
    links: [
      { label: "Product site", url: "https://multipinch.com/mygrocery.html" },
      {
        label: "App Store",
        url: "https://apps.apple.com/us/app/mygrocery-shopping-list/id1514353107",
      },
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.macropinch.kaiju",
      },
    ],
    featured: false,
  },
  {
    title: "Candy Champions",
    slug: "candy-champions",
    year: "2019–now",
    shortDescription:
      "Competitive online match-3 battles with timed combos and hero skills.",
    longDescription: [
      "Candy Champions is an online player-versus-player match-3 game set in the candy-fantasy world of Cakery. Instead of stopping after one swap, players can make multiple changes to the board during a timed move, building combos and choosing how to attack.",
      "Each hero class has different strengths and weaknesses. Players choose which hero to charge during a move, then use special skill blocks to activate hero abilities and shift the battle.",
      "The setting centers on Cakery's Imperial Tournaments, where competitors battle for the Cake Throne and the title of Candy King.",
    ],
    personalComments: [
      "Candy Champions is a game I have worked on since 2017. In its first prototype, it was simply two knights being fed bubbles and then sent off to fight.",
      "The game is a parody of all the sweet and colorful mobile match-3 games. It creates a world where fat is sacred, and the more you eat, the stronger you become.",
      "Everyone in this world strives to become stronger and eventually reach the Impervium Arena in the capital city, where they can fight in front of the Fat King. For many of them, it is the only way to make something of themselves.",
      "The proof of concept worked great. In fact, maybe a little too well — we spent months playing the game instead of working. Since 2021, the five-person NoSixFive team has been working on it full-time and continuously expanding its world.",
      "Working in such a small team meant that my role covered a lot. I worked on the battle system, created the first version of the skill system that was later expanded significantly, helped balance skills, and developed behavior for bot players when live opponents were not available.",
      "I also learned about Elo rating systems and spent a lot of time thinking through their problems and limitations for our game. Beyond the technical side, I was involved in brainstorming story ideas, new arenas, gameplay systems, and the direction in which the world itself could grow.",
      "From end to end, I have been involved in almost every aspect of making Candy Champions.",
      "And by far, it is the biggest bet we have ever made at NoSixFive.",
    ],
    technologies: ["Mobile", "Game Development", "PvP"],
    category: "Game Development",
    image: {
      src: "/images/candy-champions-cover.webp",
      alt: "Candy Champions match-3 battle on a phone in a room with board games and comics",
      width: 1536,
      height: 1024,
    },
    imageCaption:
      "Game art and gameplay shown in an illustrative game-room mockup",
    gallery: [
      {
        src: "/images/candy-champions-battle.webp",
        alt: "Candy Champions arena battle above a colorful match-3 board",
        width: 1284,
        height: 2778,
        caption: "A PvP battle and the match-3 board",
      },
      {
        src: "/images/candy-champions-combos.webp",
        alt: "Highlighted matches and hero skill bars during a Candy Champions turn",
        width: 1284,
        height: 2778,
        caption: "Building combos during a timed turn",
      },
      {
        src: "/images/candy-champions-hero-upgrade.webp",
        alt: "Fiona hero upgrade panel showing stats and a skill in Candy Champions",
        width: 1284,
        height: 2778,
        caption: "Hero stats and skill upgrades",
      },
      {
        src: "/images/candy-champions-victory.webp",
        alt: "Candy Champions victory screen showing rewards and battle statistics",
        width: 1242,
        height: 2688,
        caption: "Victory rewards and battle statistics",
      },
      {
        src: "/images/candy-champions-promo.webp",
        alt: "Candy Champions promotional art with characters in a PvP battle",
        width: 1284,
        height: 2778,
        caption: "Candy Champions promotional artwork",
      },
    ],
    links: [
      { label: "Game site", url: "https://candychampions.com/f/" },
      {
        label: "App Store",
        url: "https://apps.apple.com/us/app/candy-champions/id1366149876",
      },
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.nosixfive.chaos",
      },
    ],
    featured: false,
  },
  {
    title: "Cosmo Run",
    slug: "cosmo-run",
    year: 2017,
    shortDescription:
      "An arcade runner with shifting paths and 1M+ downloads on Google Play.",
    longDescription: [
      "Cosmo Run is an arcade game built around an ever-changing path. Players guide a glowing orb through sharp turns and gaps, using precise timing to stay on the route as the world shifts around them.",
      "Surviving longer reveals alternative paths. Some are harder to navigate but offer greater rewards, giving each run a choice between safety and risk.",
      "Google Play lists 1M+ downloads for Cosmo Run.",
    ],
    personalComments: [
      "Cosmo Run is a small 3D endless one-tap game that builds quickly and is easy to work with. Because of that, it became the game where we tested pretty much everything.",
      "Want to introduce Asset Bundles to our games? Do it in Cosmo Run first and test it there. Want to start using Sprite Atlases? Try them in Cosmo Run. Apple introduces Challenges? Put them in Cosmo Run. Want to experiment with sound and background music? Cosmo Run again. Want to try AI-generated marketing videos? Test them on Cosmo Run. Want to make a watchOS game? Port Cosmo Run.",
      "Over time, Cosmo Run became our go-to game for experimenting with and validating new systems, technologies, and ideas before rolling them out across the rest of our portfolio. Interestingly, Cosmo Run also had the highest conversion rate in our portfolio. I think a big reason for that was simply that having a cool little 3D game available on the Apple Watch made it stand out.",
    ],
    technologies: ["Mobile", "Game Development", "Arcade"],
    category: "Game Development",
    image: {
      src: "/images/cosmo-run-cover.webp",
      alt: "Cosmo Run gameplay on a phone beside an illuminated angular path",
      width: 1536,
      height: 1024,
    },
    imageCaption:
      "Official gameplay imagery in an illustrative arcade-inspired mockup",
    gallery: [
      {
        src: "/images/cosmo-run-screen.png",
        alt: "Cosmo Run gameplay and title screens on two phones",
        width: 708,
        height: 602,
        caption: "Cosmo Run product imagery",
      },
    ],
    links: [
      { label: "Game site", url: "https://nosixfive.com/cosmorun/" },
      {
        label: "App Store",
        url: "https://apps.apple.com/us/app/cosmo-run/id997685344",
      },
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.nosixfive.verto",
      },
      { label: "TouchArcade", url: "https://toucharcade.com/games/cosmo-run" },
    ],
    featured: false,
  },
  {
    title: "Jump Drive",
    slug: "jump-drive",
    year: 2018,
    shortDescription:
      "A space survival arcade game with 1M+ downloads on Google Play.",
    longDescription: [
      "Jump Drive is a semi-endless space survival game built around the ship's hyper jump. Players time each dash to slip past laser traps, rotating force fields, moving barriers, energy saws, and other hazards.",
      "Energy Cells and power-ups help players push through five unlockable zones. Each zone ends with a challenging gate, and the Final Zone tests everything learned along the way. The game also offers 20 ships with different capabilities, achievements, and leaderboards.",
      "Google Play lists 1M+ downloads for Jump Drive.",
    ],
    personalComments: [
      "Jump Drive was a learning experience for me. I came straight out of working on Outwalk, an iOS app with a PHP backend, and jumped straight into space with this one.",
      "As an introduction to Unity, I first developed a mini-game inside the main Jump Drive game, where the player shoots in all directions while rotating, as flying eyes come to get them. It was a hidden Easter egg inside the larger game. Afterwards, I worked on movement, game mechanics for boosters, score multipliers, and other gameplay elements.",
      "Overall, Jump Drive was a really fun way for me to get introduced to Unity.",
    ],
    technologies: ["Mobile", "Game Development", "Arcade"],
    category: "Game Development",
    image: {
      src: "/images/jump-drive-cover.webp",
      alt: "Jump Drive gameplay on a phone in a room with a star chart and model spaceship",
      width: 1536,
      height: 1024,
    },
    imageCaption:
      "Official gameplay imagery in an illustrative space-themed room",
    gallery: [
      {
        src: "/images/jump-drive-screen.png",
        alt: "Three Jump Drive gameplay scenes showing ships and space hazards",
        width: 883,
        height: 609,
        caption: "Jump Drive gameplay imagery",
      },
    ],
    links: [
      { label: "Game site", url: "https://nosixfive.com/jumpdrive/" },
      {
        label: "App Store",
        url: "https://apps.apple.com/us/app/jump-drive/id1261011382",
      },
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.nosixfive.nemesis",
      },
      { label: "TouchArcade", url: "https://toucharcade.com/?p=226512" },
    ],
    featured: false,
  },
  {
    title: "VideoNystagmoGraph To Go",
    slug: "vng-tg",
    year: "2025–now",
    shortDescription:
      "A smartphone app for recording eye movements alongside 3D head orientation.",
    role: "Application developer and ML developer",
    longDescription: [
      "VideoNystagmoGraph To Go (VNGTG) is a demonstration app for capturing eye movements associated with nystagmus while recording head position and orientation. Its playback pairs eye video with a real-time 3D reconstruction of head movement.",
      "The app supports separate profiles for saved recordings, which can be shared with colleagues for consultation. A companion desktop viewer can preview the phone screen during recording on macOS or Windows, and the project site provides a printable headset model.",
      "A note from me: VNGTG is an experimental demonstration prototype. It is not a medical device and is not intended for diagnosis or treatment.",
    ],
    contribution: [
      "I built the recording workflow: profiles, saving and loading videos, sharing recordings, and visualizations of head rotation and rotation speed. I also debugged issues with screen recording and streaming the phone's screen to other devices.",
      "I used OpenCV to detect a person's eyes and automatically start recording when they were detected. I also took responsibility for communicating the technical details of integration issues to the third-party providers.",
      "More recently, I began developing an ML component for analyzing eye movements, with the intention of integrating it into the application.",
    ],
    technicalChallenges: [
      "Integrating third-party libraries for video streaming and screen recording was not always straightforward. Some problems required working directly with the providers to identify the cause and find a solution. I investigated the failures, explained what we were seeing, and proposed possible fixes as we worked through them together.",
    ],
    personalComments: [
      "VideoNystagmoGraph To Go was developed in association with Georgi Kukushev, MD.",
      "The project has also been presented in academic work related to innovations and new technologies in the diagnosis and management of vestibular disorders.",
      "Working on VNGTG gave me the opportunity to develop software in a field where I had no previous professional experience: medical applications. It fulfilled a long-standing wish to work on software that could support professionals studying vestibular disorders.",
      "The project has also given me my first opportunity to work with machine learning in a professional setting. It has been valuable to bring together my application development experience and my growing knowledge of ML.",
    ],
    results: [
      "The project site and demonstration video are available below. The eye-movement ML component remains in development and is intended for future integration into the application.",
    ],
    technologies: ["OpenCV", "ML", "3D visualization", "Desktop viewer"],
    category: "Mobile Development",
    liveUrl: "https://macropinch.com/vng/",
    image: {
      src: "/images/vng-tg-cover-v4.webp",
      alt: "Landscape phone displaying VNG To Go beside synchronized recording traces and handwritten notes",
      width: 1536,
      height: 1024,
    },
    imageCaption: "Actual app screenshot in an illustrative phone mockup",
    youtubeVideoId: "GDKhlGss_xM",
    featured: false,
  },
  {
    title: "Cardiograph",
    slug: "cardiograph",
    year: 2016,
    shortDescription:
      "A heart rate app with pulse measurements, history, and watch support.",
    longDescription: [
      "Cardiograph measures heart rate by illuminating a fingertip with the device's camera flash and detecting the subtle color changes caused by a pulse. The app presents the reading in a simple interface and keeps a history of measurements.",
      "The redesigned app is available on Android, iOS, watchOS, and macOS. On Android, separate profiles let people sharing a device keep their own measurement histories. The iOS version includes Health app support and an iMessage extension for sharing a reading.",
      "The earlier version of the app remains available as Cardiograph Classic.",
    ],
    personalComments: [
      "After I became a professional developer, I always wanted to make some software used in medicine. Since I was into mobile applications at the time, I couldn't really get close to medical software, but this was about as close as I could get.",
      "It works in a simple way: place your finger over the camera, and the app detects tiny changes in color caused by blood flowing through your fingertip with each heartbeat. From those changes, it calculates your pulse.",
      "Working on it was again a learning experience, as I was mentoring yet another developer. We hired a junior iOS developer with little to no experience, but with a real passion for Apple and iOS in general. Over more than two years, he learned a lot and eventually went on to become a senior iOS developer — a role he still holds today.",
    ],
    technologies: ["iOS", "Android", "watchOS", "macOS"],
    category: "Mobile Development",
    liveUrl: "https://macropinch.com/cardiograph/",
    image: {
      src: "/images/cardiograph-cover.webp",
      alt: "Illustrative Cardiograph phones and watches showing heart rate readings beside a measurement note",
      width: 1536,
      height: 1024,
    },
    imageCaption:
      "App interfaces based on official Cardiograph imagery in an illustrative mockup",
    featured: false,
  },
  {
    title: "Train Merger",
    slug: "train-merger",
    year: 2018,
    shortDescription:
      "A train-merging game about building a railway empire through changing seasons.",
    longDescription: [
      "Train Merger centers on buying, merging, and managing trains to earn gold and grow a railway empire. The game features 60+ trains inspired by real-life historic locomotives.",
      "The game moves through four seasons, with dynamic weather changing the look of the railway as players build and expand their collection.",
    ],
    personalComments: [
      "Train Merger has a really special meaning to me, as it was the first game entirely developed by me. At the time, idle merge games were really popular, and I wanted to jump on the hype train.",
      "One of the things I find important about the game is that it features 60+ authentic trains inspired by real-life historic locomotives. If you are a train enthusiast, I bet you can find and recognize your favorite one in the game. Even small details mattered to me. For example, steam engines and diesel engines produce different types of smoke, while electric trains produce sparks from time to time.",
      "It also became the first game in NoSixFive's portfolio to generate a more serious income, which made me a bit proud!",
    ],
    technologies: ["Mobile", "Game Development", "Idle Game"],
    category: "Game Development",
    liveUrl: "https://nosixfive.com/trainmerger/",
    image: {
      src: "/images/train-merger-cover.webp",
      alt: "Train Merger gameplay on a phone surrounded by a miniature railway and seasonal scenery",
      width: 1536,
      height: 1024,
    },
    imageCaption:
      "Gameplay from the supplied image in an illustrative railway diorama",
    gallery: [
      {
        src: "/images/train-merger-seasons.webp",
        alt: "Train Merger railway boards shown across four seasons",
        width: 870,
        height: 352,
        caption: "Official game imagery showing seasonal variations",
      },
    ],
    featured: false,
  },
  {
    title: "Diamonds Are Forever",
    slug: "diamonds-are-forever",
    year: 2025,
    shortDescription:
      "A sci-fi rover game about mining diamonds on a planet where time has collapsed.",
    longDescription: [
      "Diamonds Are Forever is a 3D action-adventure game made for the Unity 20th Anniversary Game Jam. In its timeless sci-fi setting, Dr. Alaric Kane pilots a mining rover across an alien planet where diamonds have become humanity's source of energy and value.",
      "Each expedition combines exploration, diamond mining, and combat with hostile creatures. Players return to base to bank their haul and upgrade the rover's drill, storage, weapons, and mobility before heading out again. The game has no timer or day-night cycle, reinforcing its theme of a world where time no longer matters.",
    ],
    personalComments: [
      "Diamonds Are Forever is a game I made for a Unity Game Jam. It is not the biggest game I have worked on, nor the most important one, but in a way, it is a miniature version of what I originally set out to make when I was 14 years old.",
      "It is a third-person action game with multiple weapons, different enemies, a main quest, a small story, and a boss fight.",
      "The game is set in a future where humanity has already solved almost everything worth solving. The universe is known, explored, and understood, and the only thing really left is greed.",
      "People travel from planet to planet searching for diamonds — one of the few things that still have value.",
      "As the player, you arrive on one of those planets in a rover, ready to mine some diamonds. But it quickly turns out that the world is hostile, and you have to defend yourself against the dangers that begin to unfold.",
      "Technically, getting the game to run well in a web browser was a bit of a challenge. I spent quite a lot of time optimizing it using static batching, occlusion culling, LODs, and mipmaps. I also used an object pooling system to reuse objects and made additional code-level optimizations wherever possible.",
    ],
    technologies: ["Game Jam", "Unity", "HTML5", "3D"],
    category: "Game Development",
    image: {
      src: "/images/diamonds-are-forever-cover.webp",
      alt: "Mining rover approaching red diamond crystals on an alien planet at sunset",
      width: 1536,
      height: 1024,
    },
    imageCaption:
      "Illustrative key art based on the game's official screenshots",
    gallery: [
      {
        src: "/images/diamonds-are-forever-base.webp",
        alt: "Mining rover parked outside the alien base",
        width: 1221,
        height: 798,
        caption: "Official game screenshot: the base and mining rover",
      },
      {
        src: "/images/diamonds-are-forever-gameplay.webp",
        alt: "Mining rover facing a red diamond crystal and an enemy",
        width: 1485,
        height: 941,
        caption: "Official game screenshot: mining and combat",
      },
    ],
    jamResults: {
      name: "Unity 20th Anniversary Game Jam",
      url: "https://itch.io/jam/unity-20th-anniversary-game-jam/rate/4023963",
      entries: 431,
      ratings: 47,
      rankings: [
        { criterion: "Overall", rank: 28, score: 3.438 },
        { criterion: "Art", rank: 15, score: 4.064 },
        { criterion: "Fun Factor", rank: 36, score: 3.511 },
        { criterion: "Sound Design", rank: 41, score: 3.383 },
        { criterion: "Narrative Design", rank: 54, score: 2.915 },
        { criterion: "Uniqueness / Creativity", rank: 84, score: 3.319 },
      ],
    },
    commentHighlights: [
      {
        author: "foxbotsoftware",
        quote: "The driving and shooting was very smooth!",
      },
      {
        author: "Fenantren",
        quote:
          "Good balancing in terms of weapons and both rover and enemy movements.",
      },
      { author: "Zig-Art Studio", quote: "Really polished game" },
    ],
    feedbackSummary:
      "Players also suggested quicker rover handling, clearer warnings before enemies appear, and gentler audio levels.",
    links: [
      {
        label: "Play the game",
        url: "https://vellar92.itch.io/diamonds-are-forever",
      },
      {
        label: "Jam results and comments",
        url: "https://itch.io/jam/unity-20th-anniversary-game-jam/rate/4023963",
      },
    ],
    featured: false,
  },
  {
    title: "Balkan Journal of Philosophy — Journal Management System",
    slug: "balkan-journal-of-philosophy",
    year: "2025–2026",
    shortDescription:
      "An editorial system for manuscript submission, peer review, decisions, and archiving at the Balkan Journal of Philosophy.",
    role: "System designer and developer",
    longDescription: [
      "The Balkan Journal of Philosophy is a peer-reviewed academic journal published under the auspices of the Bulgarian Academy of Sciences. Its public website presents the journal, editorial policies, submission guidelines, and published issues.",
      "The accompanying editorial system lets authors submit manuscripts online and supports the journal's workflow through editorial review, peer review, decisions, and archiving.",
      "The system grew out of a conference management application I had developed for my Master's thesis at Sofia University. When the journal needed an editorial system, much of that earlier work could be adapted to its process.",
    ],
    contribution: [
      "For my thesis, I worked with two professors from the Faculty of Mathematics and Informatics and **gathered feedback from 20 academics across six faculties**. I used their input to refine the requirements and build a working conference management application.",
      "When the Balkan Journal of Philosophy needed an editorial system, I compared its requirements with the existing application and found that about 90% of the functionality overlapped. I adapted the system for manuscript submission, editorial and peer review, decisions, and archiving.",
    ],
    technicalChallenges: [
      "The main engineering challenge was turning a conference management system into one that matched a journal's editorial workflow. I mapped the journal's stages against the existing functionality, retained what fit, and adapted the rest. The result was a working system for the journal rather than a separate build from scratch.",
    ],
    personalComments: [
      "The university never adopted the original conference management system, so I was especially glad when the journal gave the work a new purpose.",
      "What started as an academic project became a system used by a real journal. Seeing the thesis prove useful beyond the university was satisfying, and working with real operational requirements gave me a chance to revisit and improve the application.",
    ],
    results: [
      "The Balkan Journal of Philosophy uses the adapted system to manage its editorial process. The journal website and editorial system are linked below.",
    ],
    technologies: [],
    category: "Web Development",
    links: [
      {
        label: "Journal website",
        url: "https://www.balkanjournalofphilosophy.eu/",
      },
      {
        label: "Editorial system",
        url: "https://balkanjournalofphilosophy.eu/jms/",
      },
    ],
    image: {
      src: "/images/balkan-journal-jms-cover.webp",
      alt: "Illustrative academic desk with a laptop showing a manuscript dashboard",
      width: 1536,
      height: 1024,
    },
    imageCaption:
      "Conceptual illustration of an academic editorial workspace; the interface shown is not a screenshot.",
    featured: false,
  },
  {
    title: "VMStudio",
    slug: "vmstudio",
    year: 2023,
    shortDescription:
      "A website presenting VMStudio's wellness, fitness, and massage services in Sofia.",
    longDescription: [
      "VMStudio is a family-run studio in Sofia focused on movement and physical wellbeing. Its website introduces the studio and its services, including yoga, ELDOA, TRX, XBody, and Thai massage.",
      "Service pages and contact information give visitors a clear path from exploring an activity to getting in touch with the studio.",
    ],
    personalComments: [
      "VM Studio is the studio created by my physiotherapist. I built this website as a small thank-you for helping me through my recovery.",
      "A big shoutout to Milen @ VM Studio!",
    ],
    technologies: [],
    category: "Web Development",
    liveUrl: "https://vmstudio.bg/",
    image: {
      src: "/images/vmstudio-cover-v2.webp",
      alt: "Actual VMStudio website screenshot displayed in a yoga studio setting",
      width: 1536,
      height: 1024,
    },
    imageCaption:
      "The actual VMStudio website screenshot, presented in an illustrative yoga studio setting.",
    featured: false,
  },
  {
    title: "keytex-bg.com",
    slug: "keytex-bg",
    year: 2009,
    shortDescription:
      "A long-running website for Keytex locksmith services in Sofia.",
    longDescription: [
      "An early web project for Keytex, a locksmith business in Sofia. The site presents emergency assistance, residential and automotive locksmith services, pricing, and contact details.",
      "The website is still live today, making it a lasting example of practical service information built for a local business.",
    ],
    personalComments: [
      "KeyText was my first paid project, back in 2009, and that is the main reason it earned a spot on my projects page.",
      "It was a custom Content Management System that allowed the customer to manage dynamic page content. The customer was also very interested in SEO at the time, so together we explored different optimization opportunities. Eventually, we managed to get KeyText onto the first page of Google results, where it stayed until around 2018, when Google's increasing focus on mobile-friendly and responsive websites started working against the old layout.",
      "Still, I am glad that something I created back in 2009 is still live today.",
    ],
    technologies: [],
    category: "Web Development",
    liveUrl: "https://www.keytex-bg.com/",
    image: {
      src: "/images/keytex-bg-cover-v3.webp",
      alt: "Actual Keytex website screenshot displayed in a locksmith shop scene",
      width: 1536,
      height: 1024,
    },
    imageCaption:
      "The actual Keytex website screenshot, presented in an illustrative locksmith shop setting.",
    featured: false,
  },
];
