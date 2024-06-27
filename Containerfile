#To use your own setup, create a Dockerfile with this content:
#First stage builds the application
FROM registry.access.redhat.com/ubi9/nodejs-20 as builder

#Add application sources
ADD src $HOME/src
ADD public $HOME/public
ADD package.json $HOME

#Install the dependencies
RUN npm install 

#Second stage copies the application to the minimal image
FROM registry.access.redhat.com/ubi9/nodejs-20-minimal

EXPOSE 3000

#Copy the application source and build artifacts from the builder image to this one
COPY --from=builder $HOME $HOME

#Run script uses standard ways to run the application
CMD npm run -d start