# headlessui 结合 tailwind构建obsidian plugin示例 

基本依赖
```shell
npm i -D esbuild-style-plugin tailwindcss@3 autoprefixer postcss
```

生成tailwindcss配置，要求是3.x版本
```shell
npx tailwindcss init
```

在src中创建xxx.css文件， 内容填入
```css
@tailwind base;
@tailwind components;
/* @tailwind utilities; */
.zkh {
  @tailwind utilities;
}
```
添加.zkh是为了避免污染现有样式， 为了奏效，需要在root元素添加zkh类， 代码中是在`App.tsx`中添加了`this.contentEl.addClass('zkh')`



在`esbuild_config.mjs`中配置生成选项， 主要是添加如下依赖:
```js
import stylePlugin from 'esbuild-style-plugin';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
```
添加插件:
```js
plugins: [
  stylePlugin({
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
    extract: true,           
    cssBundle: 'styles.css', 
  }),
  renamePlugin
],
```

由于只会生成main.css文件， 而不是obsidian期望的styles.css, 所以添加插件renamePlugin进行重命名。 注意添加`outdir`，去除`outfile`


注意在`tailwind.config.js`中添加,避免污染全局样式
```js
corePlugins: { preflight: false }
```


