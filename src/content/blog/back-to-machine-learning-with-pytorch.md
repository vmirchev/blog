---
title: "Back to Machine Learning: What PyTorch Taught Me"
description: "Returning to ML with PyTorch brought early wins, confusing setbacks, and a much longer list of questions than I expected."
date: 2026-07-01
datePrecision: month
tags: ["Machine Learning", "PyTorch", "Learning in Public"]
draft: false
featured: true
---

I returned to machine learning in 2025 after several years away from it.

I assumed my background would make the transition fairly easy. I had years of development experience, knew SQL, had worked with data, and came from game development, so I figured the mathematical side wouldn't be too intimidating.

I was wrong.

Years ago, I started with TensorFlow because I wanted to get the Google TensorFlow Developer Certificate. For me, that gave the learning process a clear roadmap.

When I came back to ML in 2025, I discovered that Google had closed the certification exam. At the same time, PyTorch had become extremely common across both research and industry, so I decided to switch.

Its developer experience immediately clicked with me.

So, with little background in ML and a lot of development experience, I decided that I'd better jump straight into it with Daniel Bourke's PyTorch for Deep Learning bootcamp.

And as any student should do, I made a list of things I had to go through to be able to follow the course.

Then came the first surprise: before I could really follow the course, I needed to get comfortable with NumPy, pandas and Matplotlib. I had created multiple charts by writing the visuals myself up to that point, so a library to visualize data was easy to grasp. Then NumPy for math operations was really cool, and pandas for me was just learning syntax, as I have worked with MySQL and PostgreSQL and already knew how to manage data. And frankly, to this day I Google/GPT how to do group by, sum and order in pandas.

By that point, I was feeling pretty confident about starting the course.

Tensors? Sure. Moving them from the CPU to the GPU and back? Fine. Manipulating tensor shapes? No problem.

![A game character moves a glowing tensor between CPU and GPU platforms](/images/pytorch-cpu-gpu.png)

Then came reproducibility — and, more importantly, why it matters in machine learning.

This was where I made my first mistake: I moved on before really understanding what was happening under the hood.

If I didn't understand where randomness was being introduced, how could I be sure my code was actually reproducible?

In the course, we usually just set the random seeds at the beginning of each notebook and moved on. So I didn't think too much about it at the time.

But what happens in a real-world application?

> Note from future me: Randomness can enter training in more places than I realised — weight initialization, data shuffling, augmentation, dropout and more. Initializers such as Xavier and Kaiming are part of that story, but that's a topic for another day.

Nevertheless, I continued with the course. Suddenly there was a wall of terminology: neural networks, layers, activation functions, loss functions, optimizers, training loops, epochs, gradient descent, `inference_mode`, logits, entropy, cross-entropy. Questions — How is gradient descent related to linear algebra? Do I need to refresh my linear algebra, or should I do it later? I was overwhelmed, but as a developer, I knew that I had to break things down into chunks, and so I did.

After reading the first half of the PyTorch classification notebook and learning [the unofficial PyTorch Optimization Loop Song](https://www.mrdbourke.com/the-unofficial-pytorch-optimization-loop-song/) by heart, I was finally ready for my first model. With all the excitement, I did a regression model, predicting a straight line. And even more exciting, a classification model trying to separate points scattered in circles. The excitement quickly de-escalated, because after reaching nearly 100% accuracy on predicting points on a straight line, I created a linear model for classification with 50% accuracy — basically guessing.

And there I was: a game developer by day, making dragons fly, breathe fire and destroy battlefields — and a dot-separating ML villain by night.

Quite a contrast.

![A game character faces a dragon and a plot of circular classification data](/images/game-dev-classification.png)

Eventually, I understood the problem: I was asking a linear model to solve a nonlinear problem. That was my first introduction to nonlinearity and activation functions like ReLU. At the time I also spent an unhealthy amount of time playing with [TensorFlow Playground](https://playground.tensorflow.org/). It is an amazing tool that visually shows what is happening in a small neural network. I can't recommend it enough.

At that point I still couldn't connect the dots.

I had enough information to follow along and build regression and classification models, but I didn't really understand how to approach a problem on my own. If someone had simply handed me a dataset and said, “Build a model,” I would have been lost.

That became obvious when I tried the Titanic Kaggle challenge and got nowhere. That failure hit me harder than I expected. At 33, I briefly started wondering whether I simply wasn't learning new things as quickly as I used to. I said to myself, even though I don't understand a lot, things will become clearer by the end of the course — my second mistake!

> Note from future me: One thing I would do differently now is stop whenever a concept feels fuzzy and ask for another explanation. “Explain loss functions intuitively, then show me a numerical example” is far more useful than memorising that regression uses MSE.

From there, things quickly escalated to CNNs and transfer learning (which, to this day, I find fascinating). The cool part was again [visualizing the neural network](https://poloclub.github.io/cnn-explainer/). I took a photo of my coffee cup and uploaded it here — and it said espresso! It felt like magic. Then recreating it myself made me feel like the magician from my game.

The course was great and went on to experiment tracking and model deployment. The paper replication part was pure gold. And I finished with a few models built and an EfficientNetB2 fine-tuned model for pizza, steak and sushi.

But I still had burning questions.

1. What actually are MSE, BCE and cross-entropy?
2. What does sigmoid really do?
3. Is accuracy actually a good metric?
4. How do I choose a model rather than copy the tutorial?
5. How did Daniel know to pick EfficientNetB2?
6. How do I extend a trained model with new classes?
7. How do I deploy models beyond Gradio?
8. What changes when the data is tabular?

I was left with more questions than answers. So the next step was obvious: dig deeper...

![A game character celebrates completing a PyTorch deep learning bootcamp](/images/pytorch-bootcamp-completion.png)
