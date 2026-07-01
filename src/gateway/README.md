# GraphQL Federation Gateway

## Overview

This project implements an Apollo Federation gateway on top of the OpenTelemetry Demo application.

The gateway aggregates multiple GraphQL subgraphs (DGS) and exposes a single GraphQL endpoint.

Final implementation branch: **feature/dockerization**

## Architecture

Frontend  
 |  
 v  
Apollo Gateway  
 |  
 +-- product-dgs  
 +-- currency-dgs  
 +-- cart-dgs  
 +-- recommendation-dgs  
 |  
 v  
OpenTelemetry Demo Backend Services

## Subgraphs

### product-dgs

Provides product catalog information.

GraphQL Query:

```graphql
query {
  products(currencyCode: "USD") {
    id
    name
  }
}
```

### currency-dgs

Provides available currencies.

```graphql
query {
  currencies
}
```

### cart-dgs

Provides cart queries and mutations.

Query:

```graphql
query {
  cart(sessionId: "SESSION_ID", currencyCode: "USD") {
    userId
  }
}
```

Mutation:

```graphql
mutation {
  addToCart(userId: "SESSION_ID", productId: "66VCHSJNUP", quantity: 1) {
    userId
  }
}
```

### recommendation-dgs

Provides product recommendations.

```graphql
query {
  recommendations(sessionId: "SESSION_ID", currencyCode: "USD") {
    id
    name
  }
}
```

## Dockerization

Each subgraph has its own Dockerfile.

Docker services:

- gateway
- product-dgs
- currency-dgs
- cart-dgs
- recommendation-dgs

Environment variables are used for service discovery.

Example:

```text
PRODUCT_DGS_URL=http://product-dgs:4001
CURRENCY_DGS_URL=http://currency-dgs:4002
CART_DGS_URL=http://cart-dgs:4003
RECOMMENDATION_DGS_URL=http://recommendation-dgs:4004
BACKEND_URL=http://host.docker.internal:8080
```

## Docker Compose

Build:

```bash
docker compose -f docker-compose.graphql.yml build
```

Start:

```bash
docker compose -f docker-compose.graphql.yml up
```

Stop:

```bash
docker compose -f docker-compose.graphql.yml down
```

## Validation

Federation was validated with the following combined query:

```graphql
query {
  products(currencyCode: "USD") {
    id
    name
  }

  currencies

  cart(sessionId: "b2db7761-fb9d-4e0c-85df-5bd64446a484", currencyCode: "USD") {
    userId
  }

  recommendations(
    sessionId: "b2db7761-fb9d-4e0c-85df-5bd64446a484"
    currencyCode: "USD"
  ) {
    id
    name
  }
}
```

## Notes regarding the demonstration environment

During development and testing, the project was executed on Windows using Docker Desktop and the OpenTelemetry Demo stack.

The OpenTelemetry ecosystem starts a significant number of containers and services
(frontend, product catalog, cart, recommendation, checkout, telemetry collector,
Grafana, Jaeger, Prometheus, databases, etc.).

On the available development machines, Docker Desktop and WSL2 occasionally caused:

- high memory consumption (> 90%)
- disk utilization reaching 100%
- reduced responsiveness of Docker Desktop
- occasional timeouts from backend services
- unstable behavior of some OpenTelemetry services

To mitigate these issues:

- GraphQL federation was developed and validated incrementally.
- Each DGS was validated independently.
- Federation tests were executed successfully through Apollo Gateway.
- Dockerized federation was validated using dedicated Docker Compose services.

If performance issues occur during the live demonstration, they are most likely related
to local resource limitations rather than to the GraphQL federation implementation itself.
