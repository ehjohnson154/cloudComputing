


MongoDB commands:

* create network
docker network create mongo-net

* run that network
docker run -d --name mongo-server --network mongo-net -p "27017:27017" -e "MONGO_INITDB_ROOT_USERNAME=root" -e "MONGO_INITDB_ROOT_PASSWORD=hunter2" mongo:latest

* Test server:
docker run --rm -it --network host mongo mongosh mongodb://localhost:27017 --username root --password hunter2 --authenticationDatabase admin