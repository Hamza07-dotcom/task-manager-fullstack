@echo off
echo Starting MongoDB...
start "MongoDB" "D:\mongodb\bin\mongod.exe" --dbpath "D:\mongodb\data"
timeout /t 5
echo MongoDB is running
echo Now you can run your Node.js application with: npm run dev
