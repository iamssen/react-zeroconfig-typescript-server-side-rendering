# Start development

```bash
npm start
```

# Build and git publish

```bash
npm run build
npm run git.publish
```

# NginX and PM2 configuration

<https://github.com/iamssen/react-zeroconfig/blob/master/docs/Server-Side-Rendering/en.md#running-built-in-files-using-pm2-nginx>

```bash
pm2 start dist/server/index.js 
```

```
server {
  set $STATIC_FILES {your-project-root}/dist/web;
  set $SSR_PORT 4100;

  listen       9202;
  server_name  localhost;

  location / {
    proxy_redirect off;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;
    proxy_set_header Connection "";
    proxy_http_version 1.1;

    proxy_pass http://127.0.0.1:$SSR_PORT;
  }

  location ~ ^/(.*)\.(.*)$ {
    root $STATIC_FILES;
    autoindex off;
    expires off;
  }
}
```

# Build module and publish

- [English guide](https://github.com/iamssen/react-zeroconfig/blob/master/docs/Module/en.md)
- [한국어 가이드](https://github.com/iamssen/react-zeroconfig/blob/master/docs/Module/ko.md)

```bash
npm run build
npm run module.publish
```