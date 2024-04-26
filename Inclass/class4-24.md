# TODAY

## Luanch the MySQL server
## Enviroment variables needed

```
export MYSQL_DB=bookaplace
export MYSQL_USER=bookaplace
export MYSQL_PASSWORD=somepassword
```

## add code to the app to initialize the database
## add code to the app to access the database
## a note about sequelize
## a note about persistence
    * '/var/lib/mysql'


## commands:
docker run --rm -it --network mysql-net mysql \ mysql -h mysql-server -u bookaplace -p