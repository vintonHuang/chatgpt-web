###
 # @Author: Vinton
 # @Date: 2023-06-03 00:53:29
 # @Description: file content
###
echo -e "---------docker Login--------"
docker login uswccr.ccs.tencentyun.com  --username=$1  --password=$2
export NODE_IMAGES=uswccr.ccs.tencentyun.com/vinton/node:chatgbt-node-v1.0.0
export NGINX_IMAGES=uswccr.ccs.tencentyun.com/vinton/frontend:chatgpt-web-$3
export OPENAI_API_KEY=$4
echo $NODE_IMAGES
echo $NGINX_IMAGES
echo -e "---------docker Stop--------"
docker-compose down
echo -e "---------docker Create and Start--------"
docker-compose up -d
echo -e "---------deploy Success--------"
