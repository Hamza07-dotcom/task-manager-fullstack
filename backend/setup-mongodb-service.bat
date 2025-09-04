@echo off
echo Creating MongoDB logs directory...
if not exist "D:\mongodb\logs" mkdir "D:\mongodb\logs"

echo Starting MongoDB...
"D:\mongodb\bin\mongod.exe" --dbpath="D:\mongodb\data" --logpath="D:\mongodb\logs\mongodb.log" --install --serviceName MongoDB

echo Starting MongoDB Service...
net start MongoDB

echo MongoDB is now running as a service!
echo You can now start your Node.js application
pause
