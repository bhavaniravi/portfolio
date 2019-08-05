---
slug: "asynchronous-task-execution-in-python"
published_date: 2019-08-05
created_date: 2019-08-01
title: "Asynchronous Task Execution In Python"
template: "post"
draft: false
description: "Schedulers became major architechtural component of any software that we use, these asynchrous task executors are behind the emails and notifications, the pop up that greets us on logging in, the reports that gets sent to your email and so on."
subtitle: "Understand the software behind your social media notifications"
tags: ["python", "asyncio", "schedulers"]
featuredImgPath: /media/async-task-python.png
---

# Asynchronous Task Execution In Python

Schedulers are a beautiful piece of code. In computer systems it is as old as a OS and in terms of real world it is as old as our alarm clocks. In the world of  computers, programmers used to schedule an appointment with a operator(a person) to run their code. Later when programmers wanted to take operator out of their job they wrote scheduling algorithms.

So when Operating systems came into picture, instead of computer operators it was schedulers that fed programs into the CPU for its execution. Over the years, the number of processing core increased so did the complexity of schduling algorthims. The layers of hardware cache, RAM and hard-disks brought up the need for different kinds of scheduling long, medium and short term. 

Now, we are in the era of cloud and distrubuted systems, where thousands of servers sitting in the cloud is involved in bringing you the information. Schedulers became major architechtural component of any software that we use, these asynchrous task executors are behind the emails and notifications, the pop up that greets us on logging in, the reports that gets sent to your email and so on.

Celery, RabbitMQ, Redis, Google Task Queue API, Amazon's SQS are different technologies available these days that help us achieve scheduling in distributed environment. 

In the rest of the blog we will try to understand and dig deeper into various concepts of these scheduling services and what each of these services do differently.

<figure>

![](/media/async-task-python.png)

</figure>

## Code Example - Treasure Hunt
1. We have a treasure hunt program with 10000 files with one file containing a treasure.
2. The goal of the program is to go through the files and find the treasure. 

```
# Create treasure
def creating_treasure():  
    """  
    Creates N files with treasure randomly set in one of the files       
    """  
    treasure_in = randint(1, N)  
    for i in range(0, N):  
        logging.debug(i)  
        with open(f"treasure_data/file_{i}.txt", "w") as f:  
            if i != treasure_in:  
                f.writelines(["Not a treasure\n"] * N)  
            else:  
                f.writelines(["Treasure\n"] * N)  
    print (f"treasure is in {treasure_in}")  
creating_treasure()
```

## Traditional Task Schedulers
Conventional tasks queues are nothing but databases. For every task an entry is made in the database with a flag `NotStarted`, `Running`, `Completed`, `Failed` and so on. At any point task workers(say a never ending python program) will query this DB and look for incomplete tasks and starts running it. It is a merly simple implementation but has some disadvantages.

**Disadvantage**
- Table grows too fast
- Querying is costy

## Asynchronous Python

Asynchronous python is getting it's popularity after the release of asyncio. Though it has got nothing to do with task schedulers, It is important to understand where it stands in comparison to them

### Threading
Python threading is an age old story. Though it gives newbies an idea of running multiple threads simultaneously in reality it doesn't. Why? Becasue cpython has GIL(Global intepreter locks). Unless your program has a lot of waiting over external (I/O) events using threading is not of much use. Even when your laptop of multiple cores, you would often find them idle on CPU intensive tasks due to GIL.

```
import logging  
import threading  
import time   
  
N = 10000   
treasure_found = False  

def find_treasure(start, end):  
    logging.debug(f"{start}, {end}")  
    global treasure_found  
    for i in range(start, end):  
        if treasure_found:  
            return  
		with open(f"treasure_data/file_{i}.txt", "r") as f:  
            if f.readlines()[0] == "Treasure\n":  
                treasure_found = i  
                return  
  
num_of_process = 50  
count = int(N/num_of_process)
start_time = time.time()  

threads = [threading.Thread(target=find_treasure, args=[i, i+count])  
           for i in range(0, N, count)]  
[thread.start() for thread in threads]  
[thread.join() for thread in threads]  
  
print("--- %s seconds ---" % (time.time() - start_time))  
print (f"Found treasure {treasure_found}")
```

### Multiprocessing

Multiprocessing module enables us to overcome the disadvantage of threading. Simplest way to understand this is GIL applies only to threads and not to processes, thereby providing us a way to achieve parallelism.

Multiprocessing also works well on CPU intensive tasks as we can use all the cores available independently. When designing a multi processing problem they often share a queue from where processes can load tasks for its next execution.

```
num_of_process = 100  

start_time = time.time()  
processes = [Process(target=find_treasure, args=[i, int(i+N/num_of_process)])  
             for i in range(0, N, int(N/num_of_process))]  
             
[process.start() for process in processes]  
[process.join() for process in processes]  
  
print("--- %s seconds ---" % (time.time() - start_time))  
print (f"Found treasure {treasure_found}")
```

### Asyncio

In the above two examples, the switching between the threads are processes is handled by the CPU. It might add overhead to our execution since context switching is expensive. Now the major distiction comes when instead of spinning up processes or threads it let's the developer decide when a program can halt and leave way for the execution of tother tasks.
```
async def find_treasure(start, end):  
    global treasure_found  
    for i in range(start, end):  
        logging.debug(i)  
        if treasure_found:  
            logging.info("Returning....")  
            return  
        # Await until file is read
		await read_file(i)  
  
  
async def main():  
    tasks = [find_treasure(i, i+count)  
            for i in range(0, N, count)]  
    await asyncio.gather(  
            *tasks  
    )  

asyncio.run(main())  
```

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

Redis by default is a in memory database and that's about it. But Redis queue is a task scheduler to asynchronously execute tasks. It uses redis `Queue` data structure and has an inbuilt worker implemetation. The architecture and working is very similar to that of Celery.
```
N = 10000  
num_of_process = 10  
count = int(N/num_of_process)  
  
start_time = time.time()  
q = Queue(connection=Redis())  
results = [q.enqueue(find_treasure, i, i+count)  
           for i in range(0, N, count)]
```

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

RabbitMQ works on publisher subscriber model. It has 4 major components.

**Producers** - The code that pushed the tasks to the queue. 
**Exchangers** - It decides which queue a message should be pushed into. 
	- Direct(Send message to queue with respective table)
	- Topic(Send message to queue which matches a specific routing pattern)
	- Fan out(Send message to all queues)
 **Queues** - Queues are what we have been discussing so far. It has a list of tasks for the workers/consumers
**Consumers**
Consuemers(Worker) are also called as workers are responsible for the actual excution of tasks. At a any point of time workers can be configured to work on a specific queue. RabbitMQ does not have it's own worker, hence it depends on task workers like celery.

> Fun Fact
RabbitMQ inspite of having support to have multiple queues, when used with celery creates a queue, binding key and exchange with a label `celery` hiding all the advanced configuration of RabbitMQ.

**Pros**

1. Wonderful documentation
2. Supports Multiple languages
3. Messages executed can be acknowledged

**Cons**
1. Difficult to trace and debug
2. Errored queues are stored in a different queue
3. Does not support priorty

## Google Task Queue
Google Task Queue provides two types of queueing mechanism.
1. **Push Mode** - The workers dequeue the tasks pushed into the queue.
2. **Pull Queue** -  Your code is responsible for dequeuing the task from the queue and executing it.

## Google Pub sub
While PubSub is close to asynchrous execution, Google Pub Sub primarily focuses on message queues and streams. Imagine sending a group message or posting something in a facebook group then every subscriber listienting to that queue should get an alert. These are classic usecases of a Google pub sub.

#### Where does it differ?

At this point it is valid to ask, why can't we implement the pub sub model with task queue since both are asynchronous and executes tasks. Google provides us with a clear distinction


Both  [Cloud Tasks](https://cloud.google.com/tasks/docs/dual-overview)  and  [Cloud Pub/Sub](https://cloud.google.com/pubsub/docs/overview)  can be used to implement message passing and asynchronous integration. Although they are conceptually similar, each is designed for different set of use cases. This page helps you choose the right product for your use case.

## Key Differences

The core difference between Cloud Pub/Sub and Cloud Tasks is in the notion of implicit vs. explicit invocation.

> Cloud Pub/Sub gives publishers no control over the delivery of the messages save for the guarantee of delivery. In this way, Cloud Pub/Sub supports  **implicit**  invocation: a publisher implicitly causes the subscribers to execute by publishing an event.
By contrast, Cloud Tasks is aimed at  **explicit**  invocation where the publisher retains full control of execution. In particular, a publisher specifies an endpoint where each message is to be delivered.
Overall Cloud Tasks are appropriate for use cases where a task producer needs to defer or control the execution timing of a specific webhook or remote procedure call. 
Cloud Pub/Sub is optimal for more general event data ingestion and distribution patterns where some degree of control over execution can be sacrificed.

## Resources 

I refered to a whole bunch of links and read through all the documnetation before writing this blog. Here are a bunch which I really enjoyed.

1. [Asyncio in Python](https://realpython.com/async-io-python/)
2. [Python Concurrency](https://realpython.com/python-concurrency/)
3. [Celery Execution Pool](https://www.distributedpython.com/2018/10/26/celery-execution-pool/)
4. [Celery and Celery beat Euro Python](https://www.youtube.com/watch?v=kDoHrFLkahA)
5. [https://www.youtube.com/watch?v=ztyyn7hmcJo](https://www.youtube.com/watch?v=ztyyn7hmcJo)
6. [Celery Vs RQ](https://stackoverflow.com/questions/13440875/pros-and-cons-to-use-celery-vs-rq)
7. [https://www.fullstackpython.com/task-queues.html](https://www.fullstackpython.com/task-queues.html)
8. [https://www.youtube.com/watch?v=nrzLdMWTRMM](https://www.youtube.com/watch?v=nrzLdMWTRMM)
9. [Google Task Queue vs Pub Sub](https://groups.google.com/d/msg/google-appengine/IcIjLfgnNXs/-m_ik7h6DgAJ)
