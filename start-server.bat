@echo off
REM George Orphanides Portfolio - Local Server Starter (Windows)
REM This script starts a simple local web server to view the portfolio

echo.
echo Starting George Orphanides Portfolio...
echo.

REM Try Python 3 first
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Using Python to start server
    echo Server running at: http://localhost:8000
    echo Open this URL in your browser
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    python -m http.server 8000
    goto :end
)

REM Try PHP
where php >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Using PHP to start server
    echo Server running at: http://localhost:8000
    echo Open this URL in your browser
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    php -S localhost:8000
    goto :end
)

REM No suitable server found
echo Error: No suitable server found
echo.
echo Please install one of the following:
echo   - Python 3 (recommended)
echo   - PHP
echo.
echo Or use Node.js:
echo   npx http-server
echo.
pause

:end
