@echo off
echo Starting frontend development server with increased memory...
set NODE_OPTIONS=--max-old-space-size=4096
npm run dev
