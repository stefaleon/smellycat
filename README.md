# Surge deployment
## CSR rendering issue workaround

When you reload a page in a client-side rendered (CSR) Angular app, the request is sent to the server. However, Surge is a static file hosting service and doesn't handle server-side routing by default. This means that when you reload a specific route, the server doesn't know how to handle it and returns a "Not Found" error.


*This is a workaround rather than a proper fix, since instead of displaying the existing route on reload, we redirect to the root*
- After building, include a **200.html** file inside the build folder (in our case *./dist/smellycat*).

*200.html*
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My Angular App</title>
  </head>
  <body>
    <script>
      // Redirect to index.html
      (function () {
        var path = window.location.pathname;
        if (path !== '/' && !path.includes('static')) {
          window.location.replace('/index.html');
        }
      })();
    </script>
  </body>
</html>
```

- Redeploy with
```
npx surge --project ./dist/smellycat --domain smellycat.surge.sh
```


