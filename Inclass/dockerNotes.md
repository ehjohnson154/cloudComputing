Making our own image:

start with official node image.

set up dockerfile
set up dockerignore

docker build .

//-it makes it ineractive
//--rm removes container when done
//-p exposes port
//end is image name

docker run -it --rm -p 3000:3000 project1 