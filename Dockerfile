FROM siomiz/node-opencv

RUN apt-get install -y vim

CMD ["tail", "-f", "/dev/null"]
