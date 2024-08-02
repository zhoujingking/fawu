# 部署步骤

确保安装 nodejs

## docker 部署

```sh
npm run docker-all
```

docker 生成脚本: scripts/build-docker.sh

nginx 配置文件:  scripts/nginx/*.conf， 其中有后端服务的指向，如果后端部署有变化，可以修改 default.conf 重新生成镜像

## 非docker 部署

可以参考 scripts/build-docker.sh 中的步骤:

```sh
npm install
npm run build
```

将成的dist文件部署到nginx上，并调整相应配置即可

### 注意

所有的文件(/file/v1/****.{ext}) 都会代理到配置的后端服务器。这里有两个问题

1. 如果不这样做, pdf预览会有跨域的问题, 造成无法渲染pdf成功

2. 网站中用的office online viewer, 它限制了文件公网地址必须有域名，且http端口必须为80， https端口必须为443, 所以可以让前端 docker 占用这个端口，从而解决这个问题。
