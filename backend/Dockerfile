# syntax=docker/dockerfile:1

FROM python:3.12.3

WORKDIR /pictionary-docker

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python3", "main.py"]