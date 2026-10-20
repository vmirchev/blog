---
title: "My Model Was 99% Confident. And Wrong."
description: "A flower classifier's confident mistake led me to inspect Grad-CAM heatmaps, similar training images, and the limits of confidence thresholds."
date: 2026-08-02
datePrecision: month
tags: ["Machine Learning", "PyTorch", "Learning in Public"]
draft: false
featured: true
---

In my [previous post](/blog/what-95-percent-accuracy-didnt-tell-me-about-my-flower-classifier/), I described building a flower classifier that achieved over 95% accuracy on its test set.

But when I started testing it with my own photographs, the results were disappointing. My validation set held surprises too.

I had spent quite some time tuning hyperparameters and improving the model. What I hadn't spent enough time on was understanding *why it made mistakes*.

So I decided to investigate.

![Illustration of a Hippeastrum flower being misclassified as a rose](/images/hippeastrum-debugging-desk.png)

## Looking Inside the Black Box

I wanted to answer two questions.

First, which parts of an image influenced the model's prediction the most?

Second, could I find training images that the model considered similar to my own photographs?

The second problem seemed easier to approach. I thought I could extract feature vectors from the model, just before the classifier, and compare them using cosine similarity.

That would let me look for images that were similar *from the model's perspective*, rather than simply relying on what looked similar to me.

![Training images ranked by cosine similarity to a flower photograph, including roses and an anthurium](/images/flower-cosine-similarity.png)

The first problem was more difficult. I had no idea where to start.

After reading a little about model interpretability, I came across an interesting paper:

[Grad-CAM: Visual Explanations from Deep Networks via Gradient-based Localization](https://arxiv.org/abs/1610.02391)

Thankfully, nowadays it's easy to ask questions to a virtual helper buddy who can explain these concepts in simpler terms.

Implementing Grad-Cam visualization meant learning how to hook into the model's architecture and extract intermediate information.

And so I did.

I also wrote a helper function to generate Grad-CAM heatmaps.

And voilà! I could now visualize which regions of an image were influencing the model's prediction.

I also had a way to retrieve similar images by comparing their feature embeddings.

Finally, I had some tools to investigate the mistakes rather than just guess how to fix them.

![Rose photograph beside a Grad-CAM heatmap highlighting the area that influenced the rose prediction](/images/rose-grad-cam.png)

## What Was the Model Actually Learning?

I started examining images that the model had difficulty classifying.

A few interesting patterns emerged.

Sometimes the model seemed to associate features in the background with particular flower classes.

![Bougainvillea photo and Grad-CAM views showing the model's petunia and bougainvillea scores, with attention on parts of the surroundings](/images/bougainvillea-env-example.png)

*Original bougainvillea photo: <a href="https://guzmansgreenhouse.com/bougainvillea-flowering-plant/" target="_blank" rel="nofollow noopener noreferrer">Guzman’s Garden Centers</a>. No images outside the Oxford 102 Flowers dataset were used for training or the formal test set; this outside image was used only for this example.*

Another problem appeared when multiple flowers were present in a single image.

And a third issue occurred when stems were visible. The model sometimes appeared to rely on them as important features.

From these observations, I came up with four possible directions for improvement.

1. **The environment affects predictions.** One possible solution would be to remove the background and make the model focus on the flower itself.

2. **Multiple flowers create problems.** A possible approach would be to segment individual flowers and classify each one separately.

3. **The training data doesn't fully represent real-world photographs.** Many Oxford Flowers images focus on flower heads, without visible pots or much of the surrounding plant. I could improve the dataset by collecting more diverse images or experimenting with synthetic data.

4. **Unknown flower classes remain a problem.** My first idea was to tune a confidence threshold, below which the model would reject a prediction rather than confidently assign one of the known classes.

That last point was particularly interesting.

## The Most Interesting Mistake

I ran threshold-tuning experiments to see how different confidence thresholds affected the predictions.

![Confidence-threshold results showing coverage, accepted accuracy, and mistakes still accepted at each threshold](/images/flower-confidence-calibration.png)

But a confidence threshold isn't a perfect solution. A model can be extremely confident and still be wrong.

And I had an excellent example of that.

After applying my chosen threshold, I was left with an image in my validation set that the model classified incorrectly with approximately 99% confidence.

99% confident. And wrong.

Those were exactly the cases I wanted to investigate.

Instead of immediately changing hyperparameters again, I started asking questions:

- Which regions of the image influenced the model's decision?
- Did changes in lighting, image size, or cropping affect the prediction?
- Were there similar photographs in the training data or elsewhere in the Oxford Flowers dataset?
- Could the model correctly recognize smaller crops of the misclassified image?

For this Hippeastrum image, I compared the regions linked to the incorrect rose prediction with those linked to the correct class.

![Hippeastrum image and Grad-CAM heatmaps for rose and Hippeastrum scores](/images/hippeastrum-rose-mistake-grad-cam-result.png)

I also tested crops and rotations of the same image. Some changes made the model predict Hippeastrum, while others left it predicting rose.

![Crops and rotations of a Hippeastrum flower with their predicted classes and confidence scores](/images/crop-and-rotation-results.png)

My hope was that investigating these failures would help me understand what kind of additional data I needed and how to improve the model.

I was no longer simply trying to improve an accuracy number. I was trying to understand what the model had actually learned and why it was making mistakes.

## What Comes Next

I started this project thinking that training a flower classifier would be the difficult part.

As it turned out, training was relatively easy.

I had learned how to fine-tune a pretrained model, run experiments, deploy it, and achieve good accuracy on a test set.

But every time the model made a mistake, I found myself asking questions I couldn't fully answer.

Why did some hyperparameters affect training more than others? What was happening inside the network? Why was the model so confident when it was wrong?

I now had two possible paths forward and a decision to make. One was to learn more about segmentation and collect better data. The other was to dive deeper into the mathematics behind machine learning.

Since I still had unanswered questions about how ML actually works under the hood, I decided to start with the fundamentals and build a machine learning system from scratch.

And a little note from future me: I eventually improved the dataset too, but that’s a story for another post.

For now, my next post will be about building a machine learning system from scratch.
