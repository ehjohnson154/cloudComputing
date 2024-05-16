Run server:
npm start


MongoDB commands:

* create network
docker network create mongo-net

* run that network
docker run -d --name mongo-server --network mongo-net -p "27017:27017" -e "MONGO_INITDB_ROOT_USERNAME=root" -e "MONGO_INITDB_ROOT_PASSWORD=hunter2" mongo:latest

* Test server:
docker run --rm -it --network host mongo mongosh mongodb://localhost:27017 --username root --password hunter2 --authenticationDatabase admin

Options:
smart code for checkign if database already has
Shell script for post commands
not worry about it



dOCKER compose up
then hit a endpoint

then inspect code for endpoits

## START DOCKER COMPOSE

docker compose up

* check to see if should rebuild the image if something has changed
docker compose up --build 