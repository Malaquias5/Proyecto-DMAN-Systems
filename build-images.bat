@echo off
echo === BUILDING DMAN BACKEND IMAGES ===
echo.

echo === EUREKA ===
cd eureka_server\eureka_server
docker build -t dman/eureka-server:1.0 .
if errorlevel 1 goto error
cd ..\..

echo === API GATEWAY ===
cd api-gateway\api-gateway
docker build -t dman/api-gateway:1.0 .
if errorlevel 1 goto error
cd ..\..

echo === AUTH SERVICE ===
cd auth-service\auth-service
docker build -t dman/auth-service:1.0 .
if errorlevel 1 goto error
cd ..\..

echo === CLIENT SERVICE ===
cd client-service\client-service
docker build -t dman/client-service:1.0 .
if errorlevel 1 goto error
cd ..\..

echo === SERVICE CATALOG ===
cd service-catalog\service-catalog
docker build -t dman/service-catalog:1.0 .
if errorlevel 1 goto error
cd ..\..

echo === CONTACT SERVICE ===
cd contact-service\contact-service
docker build -t dman/contact-service:1.0 .
if errorlevel 1 goto error
cd ..\..

echo === ADMIN SERVICE ===
cd admin-service\admin-service
docker build -t dman/admin-service:1.0 .
if errorlevel 1 goto error
cd ..\..

echo.
echo === ALL IMAGES BUILT SUCCESSFULLY ===
docker images | findstr dman
goto end

:error
echo.
echo === BUILD FAILED ===
exit /b 1

:end