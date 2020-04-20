const http = require('http');
const fs = require('fs');
let etag = 0;
const path = require('path')
let tpl = fs.readFileSync(path.resolve(__dirname,'./index.html'));
let img = fs.readFileSync(path.resolve(__dirname,'./img/test.png'));

  // etag++; // 我是个假的eTag
setInterval(()=>{
  etag++; // 我是个假的eTag
},1000*60)

http.createServer((req, res) => {
  console.log('--->', req.url);
  switch (req.url) {
    // 模板
    case '/index':
      res.writeHead(200, {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-store'
      });
      res.end(tpl);
      break;


      // 1. 不给任何与缓存相关的头, 任何情况下, 既不会被浏览器缓存, 也不会被代理服务缓存
    case '/img/nothing_1':
      res.writeHead(200, {
        'Content-Type': 'image/png'
      });
      res.end(img);
      break;


      // 2. 设置了no-cache表明每次要使用缓存资源前需要向服务器确认
    case '/img/cache-control=no-cache_2':
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'cache-control': 'no-cache'
      });
      res.end(img);
      break;


      // 3. 设置max-age表示在浏览器最多缓存的时间
    case '/img/cache-control=max-age_3':
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'cache-control': 'max-age=1000'
      });
      res.end(img);
      break;


      // 4. 设置了max-age s-maxage public: public 是说这个资源可以被服务器缓存, 也可以被浏览器缓存, 
      // max-age意思是浏览器的最长缓存时间为n秒, s-maxage表明代理服务器的最长缓存时间为那么多秒
    case '/img/cache-control=max-age_s-maxage_public_4':
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'cache-control': 'public, max-age=10, s-maxage=40'
      });
      res.end(img);
      break;



      // 设置了max-age s-maxage private: private 是说这个资源只能被浏览器缓存, 不能被代理服务器缓存
      // max-age说明了在浏览器最长缓存时间, 这里的s-maxage实际是无效的, 因为不能被代理服务缓存
    case '/img/cache-control=max-age_s-maxage_private_5':
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'cache-control': 'private, max-age=10, s-maxage=40'
      });
      res.end(img);
      break;



      // 7. 可以被代理服务器缓存, 确不能被浏览器缓存
    case '/img/cache-control=private_max-age_7':
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'cache-control': 'public, s-maxage=40'
      });
      res.end(img);
      break;



      // 8. 协商缓存
    case '/img/talk_8':
      let stats = fs.statSync(path.resolve(__dirname, './img/test.png'));
      let mtimeMs = stats.mtimeMs;
      let If_Modified_Since = req.headers['if-modified-since'];
      let oldTime = 0;
      if (If_Modified_Since) {
        const If_Modified_Since_Date = new Date(If_Modified_Since);
        oldTime = If_Modified_Since_Date.getTime();
      }

      mtimeMs = Math.floor(mtimeMs / 1000) * 1000; // 这种方式的精度是秒, 所以毫秒的部分忽略掉
      console.log('mtimeMs', mtimeMs);
      console.log('oldTime', oldTime);
      if (oldTime < mtimeMs) {
        res.writeHead(200, {
          'Cache-Control': 'max-age=10',
          // 测试发现, 必须要有max-age=0 或者no-cache,或者expires为当前, 才会协商, 否则没有协商的过程 
          'Last-Modified': new Date(mtimeMs).toGMTString()
        });
        res.end(img);
      } else {
        res.writeHead(304);
        res.end();
      }


      // 9. 设置了expires, 表示资源到期时间
      case '/img/expires_9':
        const d = new Date(Date.now() + 5000);
        res.writeHead(200, {
          'Content-Type': 'image/png',
          'expires': d.toGMTString()
        });
        res.end(img);
        break;



        // 10. 设置了Etag
      case '/img/etag_10':
        const If_None_Match = req.headers['if-none-match'];
        console.log('If_None_Match,', If_None_Match);
        if (If_None_Match != etag) {
          res.writeHead(200, {
            'Content-Type': 'image/png',
            'Etag': String(etag)
          });
          res.end(img);
        } else {
          res.statusCode = 304;
          res.end();
        }

        break;



        // 11. no-store 能协商缓存吗? 不能, 请求不会带if-modified-since
      case '/img/no-store_11':
        const stats2 = fs.statSync('./img/test.png');
        let mtimeMs2 = stats2.mtimeMs;
        let If_Modified_Since2 = req.headers['if-modified-since'];
        let oldTime2 = 0;
        if (If_Modified_Since2) {
          const If_Modified_Since_Date = new Date(If_Modified_Since2);
          oldTime2 = If_Modified_Since_Date.getTime();
        }

        mtimeMs2 = Math.floor(mtimeMs2 / 1000) * 1000; // 这种方式的精度是秒, 所以毫秒的部分忽略掉
        console.log('mtimeMs', mtimeMs2);
        console.log('oldTime', oldTime2);
        if (oldTime2 < mtimeMs2) {
          res.writeHead(200, {
            'Cache-Control': 'no-store',
            // 测试发现, 必须要有max-age=0 或者no-cache,或者expires为当前, 才会协商, 否则没有协商的过程 
            'Last-Modified': new Date(mtimeMs2).toGMTString()
          });
          res.end(fs.readFileSync('./img/test.png'));
        } else {
          res.writeHead(304);
          res.end();
        }
        default:
          res.statusCode = 404;
          res.statusMessage = 'Not found',
            res.end();
  }

}).listen(8888);