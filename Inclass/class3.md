4/8/2024



result=$(curl http://localhost:8086/counter) can save command

if [ $result != "1" ]; then
    printf "Error\n"
