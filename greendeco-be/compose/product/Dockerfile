FROM node:20-alpine AS node-builder
WORKDIR /build
COPY web/package.json web/package-lock.json ./
RUN npm ci
COPY web/ .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM golang:latest AS build
WORKDIR /build
COPY app ./app
COPY  .air.toml ./
COPY go.mod go.sum main.go ./
COPY --from=node-builder /build/dist ./web/dist
RUN go mod download && \
    go install github.com/cosmtrek/air@latest

CMD ["air"]
