---
slug: ""
published_date: null
created_date: null
title: ""
template: "post"
draft: true
description: 
subtitle: 
tags: []
featuredImgPath: 
---

# Task Schedulers 101

Schedulers are a beautiful piece of code. In computer systems it is as old as a OS and in terms of real world it is as old as our alarm clocks. When computers were new, programmers schedule an appointment to run their code. The technology is that old.

So when Operating systems came into picture, instead of computer operators it was schedulers job to feed programs into the CPU to execute tasks. As the number of processing core increased the complexity of our schduling algorthims. The layers of hardware added up to different kinds of scheduling long, medium and short term. 

Now in the era of cloud and distrubuted systems, schedulers are major component of any software that we use, these asynchrous task executors are behind the emails and notifications we recieve, the pop up that greets us on logging in, the report that you exported recently and so on.

Celery, RabbitMQ, Redis, Google Task Queue API, Amazon's SQS are different technologies available these days that help us achieve scheduling in distributed environment. One of the earliest scheduling technology is crontabs, set a time and execute tasks at set intervals of time.

In the rest of the blog we will try to understand and dig deeper into various concepts of these scheduling services.

## Traditional Task Schedulers

- Uses Databases
- Sets a flag
- Deamon checks every n seconds

Disadvantage
- Table grows too fast
- Querying is costyl
- 

## Asynchronous Tasks

Asynchronous python is getting it's popularity after the release of asyncio. It is important to understand where it stands with respect to task schedulers.

### Threading
Python threading is an age old story. Though it gives newbies an idea of running multiple threads simultaneously in reality it doesn't. Why? Becasue cpython has GIL(Global intepreter locks). Unless your program has a lot of waiting over external (I/O) events using threading is not of much use. Even when your laptop of multiple cores, you would often find them idle on CPU intensive tasks due to this phenomena

```
import threading
def do_something():
    print ("Running the task")
	
threading.Timer(10.0,do_something).start()
```

### Multiprocessing

Multiprocessing module enables us to overcome the disadvantage of threading. Simplest way to understand this is GIL applies only to threads and not to processes, thereby providing us a way to achieve parallelism.

Multiprocessing also works well on CPU intensive tasks as we can use all the cores available independently. When designing a multi processing problem they often share a queue from where processes can load tasks for its next execution.

```
from multiprocessing import Process
def do_something():
    print ("Running the task")
	
Process(do_something).start()
```

### Asyncio

In the above two examples, the switching between the threads are processes is handled by the CPU. It might add overhead to our execution since context switching is expensive. This is the reason why asyncio gained so much popularity, letting the developer decide when should a task execute or await for a response.

1. Single process, single thread
2. Not parallel, concurreny achieved by asynchronous execution.

## Cron

Cron is the simplest software utility that enables you to run tasks asynchrously at a given time. The utiliy maintains a single file(a table) called **crontab**.  The utily itself is a scheduled job that runs every minute takes a log of every comand that is scheduled to run in the current minute and run it. How cool is that?

### Usecases
1. Backup
2. Cleanup temp files
3. Reminders

### Example

I wrote a simple python script to trigger a Mac notification that asks me to take a break every 20 minutes

```
import os

def notify(title, text):
    os.system(""" 
    osascript -e 'display notification "{}" with title "{}"'
    """.format(text, title))
    
notify("Take a break", "You are sitting for too long")
```

```
# > crontab -e
*/20 * * * * python /<path_to_script>/notfication.py
```
### Problems to remember

**1. What if you have users across timezones?**
	Whenever we deal with time, we are also dealing with timezone problems. Cron jobs by default runs in the configuration of timezone in the machine it is running, we can override it using `TZ` environment variable. But what we want to different tasks at different timezones.
	
**2. What happens if a cron fails?**
When a script fails on executing a cron job, the error is just logged on the cron waits for the next schedule. This is not the most reliable way of handling errors. We would often want schedulers to retry until a certain threshold before moving on.

**3. Scaling**
	- What if the number tasks to be executed at a given time is very large?
	- What if a single tasks occupies most memory?

## Celery

> Celery is an asynchronous task queue/job queue based on distributed message passing. It is focused on real-time operation, but supports scheduling as well.

Celery works around two primary componets a `Queue`and a `Worker`. `Queue` also called as `message_brokers` is a queuing system is where you push your tasks to be executed asynchronously. `Worker` pings the queue once in a while and executes the tasks.

**Message Broker**

You might often confused between the terms `Redis`, `Celery` and `RabbitMQ`. The `Queue` component that I mentioned earlier is not an inbuilt in celery. It uses `RabbitMq` or `Redis` queuing system for this purpose. This is why you often find articles that mentions all of them

**Worker**

When you start a `celery worker` it creates a supervisor process which in turn spins up a bunch of other `executors` these are called `execution pool`. The number of tasks that can be executed by a celery worker depends on the number of processes in the execution pool
<figure>
![](http://2.bp.blogspot.com/-iAwTD0E_wjw/VhDg3edfHmI/AAAAAAAAAYg/SxaJTBKHgl4/s1600/django_celery_architecture.png)
</figure>

**Scheduling Tasks in Celery**

Unlike crontab, celery by default does not schedule tasks to be ran at certain times. To support job scheduling celery uses Celery Beat.

**What happens when a task fails?**
When a particular tasks fails, you can configure celery to retry until a particular expection occurs, or set `max_retries` param to enable retrying `n` times before giving up.

**Idempodency**

Let's say you have backing up `N-items` into a DB as your task and just incase if two workers picks up the tasks and executes it then it is for the calling function to make sure that the same entry is not made in a DB twice. Workers will have no clue about the side effects of running a particular task.

## Redis Queue

Redis by default is a in memory database and that's about it. But Redis queue is a task scheduler to asynchronously execute tasks. It uses redis `Queue` data structure and has an inbuilt worker implemetation. The architecture and working is very similar to that of Celery

**RQ vs Celery**
1. What if one fine day you wake up and decide to change your Queueing system. Celery supports an extensive line up of message brokers but RQ is built only to work with `Redis`
2. Celery supports subtasks. RQ doesn't
3. RQ works with priority queues and you can configure workers to work on tasks with certain priority. In celery the only way to achieve this is by routing those tasks to a different server
4. RQ is only for python, Celery is not.
5. Celery supports Scheduled jobs.
6. RQ workers will only run on systems that implement `fork()`. Most notably, this means it is not possible to run the workers on Windows without using the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/about) and running in a bash shell. If you are using windows RQ is not for you

## RabbitMQ

RabbitMQ is just a queuing system. It is built over AMQP protocol. In comparison with celery(which only has worker), RQ(has both worker and Queue), RabbitMQ has just the queueing system, a robust one.

#### Architechture

![exchanges-topic-fanout-direct](https://i2.wp.com/blog.knoldus.com/wp-content/uploads/2018/12/exchanges-topic-fanout-direct.png?resize=810%2C494&ssl=1)

### Components

#### Producers
#### Exchangers
	- Routing Key
#### Queues
#### Consumers

RabbitMQ when used with celery creates a queue, binding key and exchange with a label `celery` covering up all the advanced configuration of RabbitMQ.


**Pros**

1. Wonderful documentation
2. Supports Multiple languages
3. Messages executed can be acknowledged

**Cons**
5. Difficult to trace and debug
6. Errored queues are stored in a different queue
7. Does not support priorty

## Google Task Queue

## Asyncio Vs Task Queues

## Resources I Refered To

I refered to a whole bunch of links and read through all the documnetation before writing this blog. Here are a bunch which I really enjoyed.

1. [https://realpython.com/async-io-python/](https://realpython.com/async-io-python/)
2. [https://realpython.com/python-concurrency/](https://realpython.com/python-concurrency/)
3. [https://www.distributedpython.com/2018/10/26/celery-execution-pool/](https://www.distributedpython.com/2018/10/26/celery-execution-pool/)
4. [Celery and Celery beat Euro Python](https://www.youtube.com/watch?v=kDoHrFLkahA)
5. [https://www.youtube.com/watch?v=ztyyn7hmcJo](https://www.youtube.com/watch?v=ztyyn7hmcJo)
6. [Celery Vs RQ](https://stackoverflow.com/questions/13440875/pros-and-cons-to-use-celery-vs-rq)
7. [https://www.fullstackpython.com/task-queues.html](https://www.fullstackpython.com/task-queues.html)
8. [https://www.youtube.com/watch?v=nrzLdMWTRMM](https://www.youtube.com/watch?v=nrzLdMWTRMM)
