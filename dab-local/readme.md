# how to use it

## Run docker container

```bash
./start-dab.sh
```

## Run a query to test grqphql endpoint

```bash
curl -X POST http://localhost:5000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { projects { items { id name description organization_id tech } } }"
  }'
```


```bash
curl -X POST http://localhost:5000/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{
    "query": "query { projects { items { id name description organization_id tech } } }"
  }'
```
