---
title: "I Spent Weeks Learning Neural Networks. Then Kaggle Taught Me to Look at the Data."
description: "Studying neural networks helped me understand models, but a Kaggle challenge showed me how much the data and feature engineering matter. These were my first steps toward the completed ML From Scratch project."
date: 2026-09-01
datePrecision: month
tags: ["Machine Learning", "Learning in Public"]
draft: false
featured: true
---

After completing the PyTorch bootcamp and building tools for data exploration, I still had a lot on my mind: many questions and few answers. It feels a little strange to write about the simple problems I encountered then, but they became the starting point for my <a href="https://vmirchev.com/projects/ml-from-scratch/" target="_blank" rel="noopener noreferrer">ML From Scratch project</a>.

I tried entering one of the easier Kaggle challenges, with disappointing results. I thought, that's OK. I just need to learn more. At this point, there are usually two ways to go. Either bang my head against the wall for N more projects, or dig deeper into theory.

Until recently, I would have dived straight into code. The PyTorch bootcamp convinced me to take the other route and study the theory.

## Back to School

I bought a physical notebook and started learning. A <a href="https://journals.sagepub.com/doi/abs/10.1177/0956797614524581" target="_blank" rel="noopener noreferrer">2014 study</a> suggested that handwritten notes help students process concepts more deeply, though later research has been mixed. For me, writing by hand was a way to slow down and ask: **What knowledge should I have in my head, and what can I safely outsource to an LLM?** I decided I needed to understand the math behind machine learning models for myself.

<figure class="article-figure">
  <img src="/images/neural-networks-gradient-descent-study.png" alt="Illustration of a ninja studying gradient descent in a notebook beside a sleeping cat" loading="lazy" />
  <figcaption>An illustrated look at my notebook study sessions.</figcaption>
</figure>

I found <a href="https://www.udemy.com/user/mike-x-cohen/" target="_blank" rel="noopener noreferrer">Mike X Cohen</a>, a former neuroscience professor who teaches machine learning. His approach differed from [Daniel's in the PyTorch bootcamp](/blog/back-to-machine-learning-with-pytorch/): we started with the mathematics behind neural networks, often using generated data. We still built models in PyTorch, but the goal was to understand what was happening inside them.

## What's Really Going On Inside a Neural Network?

We started with feed-forward networks, gradient descent, and backpropagation. I began to understand how weights are updated, where derivatives and the chain rule fit, and why optimization can struggle. Learning about evaluation, learning rates, and regularization also helped me structure experiments instead of changing parameters at random. I explore these concepts in more detail in my <a href="https://vmirchev.com/projects/ml-from-scratch/" target="_blank" rel="noopener noreferrer">ML From Scratch project</a>.

We went on to CNNs, transfer learning, autoencoders, and recurrent networks. The last of those caught my attention because I already had a time-series project in mind.

Learning wasn't nearly as straightforward as I'm making it sound here. I went back and forth between CNNs, scikit-learn pipelines, and simple ANNs, sometimes revisiting things I thought I already understood. I loved experiencing it that way: in the morning, I might be applying convolutions to image data and inspecting gradient heatmaps; by evening, I'd be trying to separate dots on a 2D plot.

I was finally starting to understand *why* models behaved the way they did.

## Moving a Few Pixels Can Break Your Model

An MNIST digit-classification exercise, which I later recreated in a <a href="https://www.kaggle.com/code/velimirmirchev/mnist-shift-experiment" target="_blank" rel="noopener noreferrer">Kaggle notebook</a>, showed me how easily a model can fail when its inputs change. A linear classifier scored **92.6%** on the original test digits, but only **15.6%** after I shifted them five pixels right.

A CNN with convolution and max pooling scored **98.7%** on the originals and **49.2%** on the shifted digits. Convolution helped, but it did not make the model immune to the shift. When I trained another CNN with random translations, it scored **97.2%** and **97.3%**, respectively. That model also trained for more epochs, so I can't credit augmentation alone for the improvement.

Seeing the difference helped me understand what convolution could and couldn't solve. I could also inspect kernels and intermediate activations, skills I used in [the debugging tools I wrote about previously](/blog/my-model-was-99-percent-confident-and-wrong/).

<figure class="article-figure">
  <img src="/images/mnist-shift-results.png" alt="Bar chart comparing original and shifted digit accuracy: linear classifier 92.6% and 15.6%; CNN 98.7% and 49.2%; translation-trained CNN 97.2% and 97.3%" loading="lazy" />
  <figcaption>Accuracy on original and shifted MNIST digits for the three models.</figcaption>
</figure>

These figures come from one saved Colab run, trained on 56,000 digits and evaluated on MNIST's separate 10,000-image test set. They describe this setup, not a general guarantee of translation invariance.

You can also try the <a href="https://vmirchev.com/mnist/" target="_blank" rel="noopener noreferrer">MNIST application</a>.

With a better grasp of how models behave, I returned to the Kaggle challenge that had sent me back to theory.

## Back to Kaggle — The Titanic Problem

The Titanic challenge asks you to predict whether a passenger survived from information such as age, sex, passenger class, and fare. After weeks studying neural networks, I thought I was ready.

But there was something I hadn't fully appreciated during my studies. **In most of my exercises, I had a dataset that was already suitable for the problem I was trying to solve.**

With real-world data, that isn't necessarily the case. Data can be messy, incomplete, or inconsistent. And the Titanic dataset was no exception.

Suddenly, my biggest challenge wasn't building a model. It was understanding the data.

## The Rabbit Hole of Feature Engineering

I looked at correlations, missing values, and relationships between passengers. Could missing values be estimated? Could family relationships become useful features? I tried creating new fields and had a blast doing it. I've always had a soft spot for exploring data.

I was doing feature engineering.

And of course, with my newly acquired deep learning skills, I immediately jumped to a neural network. With accuracy around 80% on my validation split, I thought I was doing great.

But then I remembered something Daniel had taught me during the PyTorch bootcamp: **Always compare your model against alternatives.**

That was my proper introduction to Random Forests, followed by gradient boosting algorithms. I trained different models, compared the results, and experimented with their parameters.

But switching algorithms wasn't the whole story. In my <a href="https://www.kaggle.com/code/velimirmirchev/titanic-features-and-models-comparison" target="_blank" rel="noopener noreferrer">Titanic notebook on Kaggle</a>, I compared each model with basic passenger fields and with features such as family size, title, cabin availability, and fare per person. I used the same 223-passenger validation split for all six runs.

<figure class="article-figure">
  <img src="/images/titanic-feature-results.png" alt="Comparison of Titanic validation accuracy for gradient boosting, a neural network, and a random forest using basic and engineered features" loading="lazy" />
  <figcaption>Validation accuracy with basic and engineered passenger features.</figcaption>
</figure>

The best score on this split was **81.2%** from the random forest with engineered features. The feature changes helped the neural network most. The gains for the two tree models were smaller than one percentage point, so I wouldn't claim they are reliable from a single split. Still, exploring the data led to concrete features I could test, instead of changing models at random.

On this split, feature engineering moved the neural network from **76.7%** to **80.3%**; choosing a random forest with basic features reached **80.7%**. Both choices mattered.

## So, Was Studying All That Theory Worth It?

Absolutely. I now had a better understanding of what could go wrong during training, how to evaluate results, and how to compare models.

Coming from software development, I'm used to thinking about code and architecture. This challenge showed me that a working pipeline and a well-designed network can still disappoint when I haven't understood the data. For Titanic, exploring the passengers was where much of the value came from.

**Now, if I had one hour to build a model, I would probably spend 45 minutes exploring and working with the data, and only the last 15 minutes on the model itself.**

At least, that's what my Titanic experience taught me.

And after spending so much time experimenting with different features, algorithms, and hyperparameters, I discovered another problem: keeping track of what actually worked.

But that's a topic for another post.
