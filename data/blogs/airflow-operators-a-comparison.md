---
title: Airflow Operators - A Comparison
sub_title: 'Comparison between Python, Docker and Kubernetes Airflow Operator'
slug: airflow-operators-comparison
tags:
  - airflow
featuredImgPath: 'https://i.imgur.com/UvlPSAW.png'
isexternal: true
published_date: '2021-01-12'
created_date: '2021-01-10'
description: >-
  Airflow provides a variety of operators to couple your business logic into
  executable tasks in a workflow. Often times it is confusing to decide when to
  use what. In this article we will discuss the pros and cons of each in detail.
draft: false
---


# Airflow Operators - A Comparison

Airflow provides a variety of operators to couple your business logic into executable tasks in a workflow. Often it is confusing to decide when to use what. In this article, we will discuss the pros and cons of each in detail.

## PythonOperator


Using `PythonOperator`, all the business logic and it's associated code resides in the airflow DAG directory. The `PythonOperator` imports and runs them during the execution


```
airflow 
    \__dags
        \_classification_workflow.py
        \_ tweet_classification
            \_preprocess.py
            \_predict.py
            \_ __init__.py
    \__logs
    \__airflow.cfg
```



### Pros

1. Best option when the code is in the same repo as airflow
2. Simple and easy to use
3. Works well on small teams

### Cons:

1. Couples airflow code with business logic
2. Any business logic change would mean redeploying airflow code
3. Sharing a single airflow instance across multiple projects will be a nightmare
4. Can run only Python code, well, duh.


## DockerOperator

When using `DockerOperator`, all the business logic and it's associated code resides in a docker image. During execution 
1. Airflow pulls the specified image 
2. Spins up a container
3. Executes the respective command.

```
DockerOperator(
    dag=dag,
    task_id='docker_task',
    image='gs://project-predict/predict-api:v1',
    auto_remove=True,
    docker_url='unix://var/run/docker.sock',
    command='python extract_from_api_or_something.py'
)
```



### Pros


1. Works well across cross-functional teams
2. Can run projects that are not built-in Python

### Cons

1. Needs docker installed in the worker machine
2. Depending on the resources available, The load of the worker machine might be heavy when multiple containers run at the same time


## KubernetesPodOperator


When using `KubernetesPodOperator`, all the business logic and it's associated code resides in a docker image. During execution, airflow spins up a worker pod, which pulls the mentioned docker image and executes the respective command.


```
KubernetesPodOperator(
        task_id='classify_tweets',
        name='classify_tweets',
        cmds=['python', 'app/classify.py'],
        namespace='airflow',
        image='gcr.io/tweet_classifier/dev:0.0.1')
```

### Pros

1. Works well across cross-functional teams
2. Single airflow instance can be shared across teams without hassle
3. Decouples DAG and the business logic

### Cons:

Complex on the infrastructure, since it uses docker and Kubernetes.








