---
title: "What 95% Accuracy Didn’t Tell Me About My Flower Classifier"
description: "A flower classifier reached 95% test accuracy, but 14 experiments and my own photos exposed what that number missed."
date: 2026-08-01
datePrecision: month
tags: ["Machine Learning", "PyTorch", "Learning in Public"]
draft: false
featured: true
---

So I decided to continue learning.

During Daniel Bourke's PyTorch course, I learned about transfer learning, a powerful technique that allows me to take a pretrained model and fine-tune it for a specific problem. Training from scratch could work for simpler problems, but I was fascinated by CNNs and wanted to continue learning in that direction.

## A Real-World Problem to Solve

I decided to build something I would actually find useful.

A few years ago, my cat Misho got sick after drinking water from beneath a plant pot that had been gifted to my family on my wedding day.

I later learned that the plant was a lily (*Lilium*), which is extremely toxic to cats. The petals, leaves, stems, pollen, and even water contaminated by lilies can cause severe poisoning.

Thankfully, I got Misho to the vet just a few hours after he drank the water, and he recovered.

But the experience stayed with me. What if I could build a flower classifier, connect its predictions to a plant toxicity database, and create something useful?

Finally, I had a real-world problem to solve! Awesome!

And yes, nowadays I could simply upload a photo to ChatGPT and ask what the plant is. But how would that help me learn machine learning?

![A PyTorch coding scene with a cat, lilies, and a model training on screen](/images/cozy-pytorch-ninja-coding-den.png)

## My First Model

Having written plenty of parsers and APIs over the years, I knew how to fetch and scrape data. But my focus was on learning, and I wanted to do things by the book. No random image downloads. I wanted openly available data with clear permission to use it for training.

Naturally, I ended up choosing the [Oxford 102 Flowers Dataset](https://www.kaggle.com/datasets/nunenuh/pytorch-challange-flower-dataset).

The official dataset comes with predefined training, validation, and test splits, with relatively few training examples per class. I wanted more images for training, so I combined the original splits and created my own train, validation, and test sets.

> **Note from future me:** At the time, just after finishing the course, I didn't fully understand why a validation set was necessary. It had been mentioned, but we often skipped it in the learning exercises. Now, in the implementation I share, I use a validation split. In the production application I'm developing, I also use K-fold cross-validation for model selection, while keeping a separate test set for final evaluation.

Reusing code I'd written during Daniel's course, I trained a model that achieved over 95% accuracy on 16 of the 102 flower classes.

I decided to start with fewer classes and gradually increase their number. Seemed logical to me.

I built a simple interface with Gradio and deployed it to Hugging Face.

My first ML project was online!

A smaller version of that original model is still available here:

<a href="https://huggingface.co/spaces/vmmirchev/oxford-flowers-16-classifier" target="_blank" rel="noopener noreferrer">Oxford Flowers – 16 Classifier</a>

## 14 Experiments Later

I started uploading a few images to test the model. Some predictions were correct, but the mistakes immediately caught my attention.

Why did the model get certain images wrong?

At the time, my understanding was that neural networks were essentially black boxes. You could observe their inputs and outputs, modify the architecture, and see whether the results improved.

So I decided to build a system for running experiments.

My thinking was simple: I knew there were plenty of hyperparameters I could tune. If I ran enough experiments, surely I could improve my model.

I still think experimentation is the right approach, just not the way I was doing it back then.

I created a simple form with lots of hyperparameters I could adjust. I also learned a few new techniques that I thought might improve the model.

I added learning rate schedulers, label smoothing, dropout, and weight decay to my toolset and created an <a href="https://vmirchev.com/ml/" target="_blank" rel="noopener noreferrer">experimentation page</a>.

Fourteen experiments later, I realized that unstructured experimentation—trying to guess which parameters would help the model learn better without really understanding the underlying mechanics—was mostly a waste of time and resources.

I had even hit Google’s free-tier GPU usage limits.

I had built a tool for running experiments, but I didn’t really have a method for deciding which experiments were worth running. There had to be a better way to approach this. And of course, there was.

For me, the solution had three parts.

**The first was planning.** I started organizing hyperparameters based on how strongly I expected them to affect training, experimenting with the most important ones first. Once I found a promising value, I moved on to another parameter. Sometimes I grouped related parameters, such as learning rate and learning rate scheduler, because they are closely connected.

It wasn't a guarantee of finding the optimal configuration, but it was much better than changing things randomly.

**The second was evaluation.** I realized that accuracy alone wasn't telling me enough about how well the model was actually performing. It could even be misleading, especially if some classes appeared more frequently than others.

After learning about different evaluation metrics, I decided that macro F1-score would be a better fit for my problem. Unlike accuracy, macro F1 gives equal importance to every class by averaging their individual F1-scores, regardless of how frequently they appear in the dataset.

This gave me a more balanced picture of how well the model was performing across all classes. And by looking at the individual class scores, I could identify which classes the model struggled with and where I needed to focus my attention.

**The third was tooling.** Writing my own experimentation tool wasn't particularly useful. MLflow would have been a better choice, but at the time, I saw learning another tool as a distraction.

Together, these changes gave me a more structured way to experiment, evaluate results, and make informed decisions instead of relying on guesswork.

This was my plan for the next round of experiments, after those first 14 runs.

![Experiment map showing a baseline and planned changes to learning rate, optimizer, augmentation, dropout, fine-tuning, and random seed](/images/experiment-map.png)

With this new approach, I started running more structured experiments and comparing their results.

I was getting useful results faster, and more importantly, I was learning at the same time.

In my particular experiments, I found that changes to learning rate and batch size had a much larger effect than dropout or small amounts of weight decay.

But I still couldn't fully explain why.

## A Reality Check

After all that experimentation, I finally had a model I was happy with.

I deployed it again, but this time I started testing it with photographs I'd taken myself.

And that was a disappointment.

The model didn't perform nearly as well as I'd expected from its 95%+ test accuracy.

Sure, my photos were different from the Oxford dataset images. Different lighting, backgrounds, angles, and compositions.

But shouldn't the model still recognize the important features of a flower?

I also hadn't handled flowers belonging to classes the model had never seen.

My model worked well on the dataset I was using, but that didn't necessarily mean it would work well on real-world photographs.

I had learned how to train a model, tune hyperparameters, and deploy it.

But now I had a different problem.

I needed to understand **why my model was making mistakes**.

And as I was about to discover, that was a much more interesting problem.
