FROM ros:melodic-ros-base

# # Instala Node.js y npm (en este caso, se utiliza la versión 14 de Node.js)
# RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add -
# RUN echo "deb https://deb.nodesource.com/node_14.x $(lsb_release -sc) main" > /etc/apt/sources.list.d/nodesource.list
# RUN apt-get update && apt-get install -y nodejs

# RUN echo "source /catkin_ws/devel/setup.bash" >> /root/.bashrc

COPY ./autostart.sh /
RUN chmod +x /autostart.sh
ENTRYPOINT /autostart.sh
# ENTRYPOINT /bin/bash

