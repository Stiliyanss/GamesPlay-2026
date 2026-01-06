# softuni-games-play

## workshop 4 - Deployment
### Server deployment (GCP Cloud Run)
 - [x] Register into GCP
 - [x] Create Project in GCP 
 - [x] Install Docker Desktop
 - [x] Create Dockerfile
 - [x] Create docker image `docker build -t softuni-practice-server .`
 - [x] Check docker images `docker images`
 - [x] Start local container `docker run -p 8080:8080 softuni-practise-server`
 - [x] Chnage image name `docker tag softuni-practice-server europe-west4-docker.pkg.dev/games-play-483313/softuni-practice-server-repo/softuni-practice-server`
 - [x] install gcloud SDK
 - [x] init and login `gcloud init` `gcloud login`
 - [x] list available projects `gcloud project list`
 - [x] set default project `gcloud config set project softuni-games-play-455016`
 - [x] check current project `gcloud config get-value project`
 - [x] authorize gcloud for docker `gcloud auth configure-docker europe-west4-docker.pkg.dev`
 - [x] deploy to cloud run `gcloud run deploy softuni-practice-server --image europe-west4-docker.pkg.dev/games-play-483313/softuni-practice-server-repo/softuni-practice-server:latest --min-instances 0 --max-instances 1 --region europe-west4 --platform=managed --allow-unauthenticated`
### Client deployment
 - [x] use env variables in vite `https://vite.dev/guide/env-and-mode`
 - [x] prepare client to work with deployed server (use env variables for server url)
 - [x] install firebase `npm i -g firebase-tools`
 - [x] login to firebase sdk `firebase login`
 - [x] link firebase project to GCP project
 - [x] initialize firebase hosting `firebase init hosting`
 - [x] deploy client `npm run build` `firebase deploy`
 - [x] config npm scriptf
### CI/CD 