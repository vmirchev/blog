---
title: "I Tried Giving My Blog My Own Voice. Things Got Weird."
description: "I gave my blog audio narration, experimented with cloning my voice, and learned why a good similarity score can hide bad speech."
date: 2026-11-14
tags: ["Machine Learning", "Text-to-Speech", "Learning in Public"]
draft: false
featured: true
---

I recently stumbled upon an old <a href="https://www.linkedin.com/pulse/audioboost-leading-way-audio-industry-where-ai-revolutionizing-whzze/" target="_blank" rel="noopener noreferrer">LinkedIn article</a> about how AI is changing the audio industry. It mentioned an interesting statistic from the Reuters Institute's *Journalism, Media, and Technology Trends and Predictions 2025* report: 75% of surveyed media leaders were exploring ways to turn text articles into audio.

That got me interested in Text-to-Speech (TTS) models. Now, I don't have the resources to train a model from scratch, but thanks to open-weight models and free Google Colab, I don't really have to. I can experiment with pretrained models without buying a GPU or paying for cloud infrastructure. Even with 15 years of software development experience, and about a year in Machine Learning, I am still fascinated by what these models can do.

In contrast to my usual posts, I will show the result here in a video. Those who are lucky enough to study Shakespeare in English class (a big shoutout here to Mr. Edvard Karakashian) remember the long nights staying up with a dictionary trying to understand what Shakespeare actually wrote. So that was my inspiration for generating this video. So enjoy my little ninja avatar reciting the famous monologue with a very similar to mine voice.

<!-- tts:skip:start -->
<iframe class="article-video" src="https://www.youtube-nocookie.com/embed/JxIcaOMB7Kg" title="Ninja avatar reciting Shakespeare in my cloned voice" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<!-- tts:skip:end -->

## Giving my blog a voice

A simple Google search for TTS models led me to <a href="https://huggingface.co/hexgrad/Kokoro-82M" target="_blank" rel="noopener noreferrer">Kokoro</a>, an open-weight model with just 82 million parameters. Despite its relatively small size, it delivers impressive speech quality while being fast and efficient. Which I think makes it a perfect fit for my little blog. And most importantly, I managed to get it working for free.

I don't like using big products to solve simple problems. This is a personal blog, and it doesn't need WordPress or a complicated content management system. I tried a few alternatives over the years, including a Chinese open-source blogging platform, but eventually settled on <a href="https://astro.build/" target="_blank" rel="noopener noreferrer">Astro</a>. Now I don't even have to navigate an admin panel just to write something. I open TextMate, write my article, and commit it. And yes, as a developer, I prefer to **push instead of publish**.

The source code lives on GitHub. When I push a commit to the main branch, **GitHub Actions** builds the Astro website and uploads the generated files to my shared hosting at Jump.bg over SFTP. And voilà, the article is live.

With my latest addition, the same workflow generates audio for my articles. Of course, it isn't as simple as passing the entire article to Kokoro and getting a perfect recording. I wrote a script that prepares the text using a few simple rules. It respects a maximum segment length, takes titles and paragraphs into account, and avoids splitting sentences in the middle. I also ignore image captions, code blocks, raw links, and other elements that don't make sense when listening to an article.

Once the audio is generated, it gets committed to the repository and published along with the website. I also use a hash of the text being narrated to determine whether the audio needs to be regenerated. If the text hasn't changed, there is no reason to run the model again.

I love small optimizations like that! And just like that, my little blog has a narrator.

## But why shouldn't it sound like me?

At first, I used a female voice because I liked the quality better. But after listening to a few articles, something felt a bit strange. These were my articles, written in my words, but narrated by someone who sounded nothing like me. My immediate thought was: why not generate them using my own voice?

And that sparked my interest in voice cloning.

Again, I had no intention of renting a GPU or buying one just for this experiment. I wanted to see how far I could get with free resources, so I tried <a href="https://huggingface.co/ResembleAI/chatterbox-turbo" target="_blank" rel="noopener noreferrer">Chatterbox Turbo</a> and <a href="https://huggingface.co/SWivid/F5-TTS" target="_blank" rel="noopener noreferrer">F5-TTS</a>. Both support zero-shot voice cloning, meaning they can generate speech resembling a speaker from a short reference recording without fine-tuning the model weights.

I recorded five samples of my voice: 12, 14, 20, 24, and 44 seconds. I tracked the experiments using MLflow on DagsHub and compared the generated audio with an original recording using cosine similarity between speaker embeddings. In simple terms, this measures how similar the voice characteristics are, rather than whether the generated speech actually sounds good. And of course, I also used Character Error Rate (CER) and Word Error Rate (WER) to evaluate how accurately the generated speech reproduced the intended text.

![Voice cloning experiment results comparing reference lengths and model scores](/images/voice-cloning-experiment-results.png)

My initial hypothesis was that a longer reference recording would produce better results. Sounds reasonable, doesn't it? Well, my experiments showed the opposite. The shortest reference gave the best results, although that doesn't mean shorter recordings are always better.

Initially, F5-TTS achieved a higher cosine similarity score than Chatterbox Turbo. Great, I thought I had found the better model. Then I listened to the audio.

It was awful. You can listen to one of the problematic experiment results.

<!-- tts:skip:start -->
<audio controls preload="none" aria-label="Problematic F5-TTS voice cloning example">
  <source src="/audio/voice-cloning-problematic-example.mp3" type="audio/mpeg" />
  <a href="/audio/voice-cloning-problematic-example.mp3">Download the problematic voice cloning example</a>
</audio>
<!-- tts:skip:end -->

Remember Shakespeare? Instead of "To be, or not to be, that is the question," I got something closer to **"To to be, or not to be to, that is the question to."**

It turned out that F5-TTS trims longer reference recordings to around 12 seconds. Its documentation even recommends using a recording shorter than 12 seconds, preferably ending with a little silence. My recording had been cut in the middle of speech, leaving the word "to" at the end. That appeared to be contributing to the repeated word in the generated audio.

So the problem wasn't necessarily that F5-TTS was worse. I was giving it a poorly prepared reference. And despite the higher speaker similarity score, the actual narration was terrible.

After shortening the recordings properly, I managed to get good results from both models. But to my ear, Chatterbox Turbo still sounded better. So Chatterbox won that round, at least for my voice and my experimental setup.

I wouldn't claim that one model is generally better based on such a small experiment. But it was a useful reminder that **a better numerical score doesn't necessarily mean a better result**. Cosine similarity can help evaluate speaker identity, but it won't tell you whether the model repeats words, mispronounces something, or produces unpleasant speech. You still have to listen.

## The other side of voice cloning

After finishing the experiment, I got curious about the company behind Chatterbox Turbo, <a href="https://www.resemble.ai/" target="_blank" rel="noopener noreferrer">Resemble AI</a>. Interestingly, alongside developing voice generation technology, the company focuses on deepfake detection and protection against AI-generated impersonation and fraud.

Which, after running my little experiment, suddenly seemed like a very real concern. I had managed to generate speech resembling my own voice using only a few seconds of recorded audio, pretrained models, and free computational resources. The results weren't perfect, but convincing enough to make me think about how easily the same technology could be misused.

I find it interesting that a company making voice generation accessible is also investing in technologies to detect its misuse. Chatterbox even includes an audio watermarking mechanism intended to help identify generated speech.

As for my blog, I eventually returned to Kokoro. Not because voice cloning didn't work, but because I didn't really need it. My goal was to let readers listen to my articles, not to convince them that I had personally recorded every word. Kokoro does the job well without the extra complexity of maintaining a cloned voice. I also got a bit of a weird feeling about having my voice cloned.

So now I write an article in TextMate, commit it, and push it to GitHub. My workflow prepares the text, generates audio when needed, builds the website, and publishes everything automatically. No complicated admin panel, no paid GPU infrastructure, just a simple blog with a little Machine Learning added to it.

Kinda cool, right?

What started with a LinkedIn article ended up teaching me quite a bit about TTS models, zero-shot voice cloning, speaker similarity, and the limitations of numerical evaluation. And I got a useful feature for my blog out of it.

I am also interested in experimenting with TTS and Speech-to-Text models for Bulgarian, but that will have to wait. I still have a fraud detection project and a flower classifier to finish, and Candy Champions is keeping me busy. I'll definitely return to audio.

**P.S.** If you want to add high-quality audio to your blog or newsroom without building the infrastructure yourself, have a look at <a href="https://mediathrive.com/" target="_blank" rel="noopener noreferrer">Media Thrive</a>. I know their CTO personally, and I know how much effort they've put into audio quality. I can genuinely recommend their work.
