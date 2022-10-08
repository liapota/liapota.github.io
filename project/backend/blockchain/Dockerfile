FROM rust:latest as build

# create a new empty shell project
WORKDIR /blockchain

# copy your source tree
COPY . .

# build for release
RUN cargo build --release
# our final base
FROM debian:latest

WORKDIR /blockchain

# copy the build artifact from the build stage
COPY --from=build /blockchain/target/release/api .
COPY --from=build /blockchain/target/release/blago .
COPY --from=build /blockchain/tasks.crontab .
COPY --from=build /blockchain/bankchain .

# set the startup command to run your binary
RUN apt-get update && apt-get install -y cron
RUN crontab /blockchain/tasks.crontab
CMD ["./api"]