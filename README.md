# front-end

## Deployment

### Login AWS:

```bash
aws ecr get-login-password --region eu-west-3 | docker login --username AWS --password-stdin 943635619664.dkr.ecr.eu-west-3.amazonaws.com
```

```bash
docker build -t crosslink-front:1.0.0 -f docker/Dockerfile.production --build-arg configuration=production . && \
docker tag crosslink-front:1.0.0 943635619664.dkr.ecr.eu-west-3.amazonaws.com/crosslink-front:1.0.0 && \
docker push 943635619664.dkr.ecr.eu-west-3.amazonaws.com/crosslink-front:1.0.0
```
