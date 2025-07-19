# Lorem Babel [![View package on JSR](https://jsr.io/badges/@li/lorem-babel)](https://jsr.io/@li/lorem-babel)

Generate nonsense placeholder text in a variety of languages.

[🖥️ Repo](https://github.com/lionel-rowe/lorem-babel) · [🛝 Playground](https://lorem-babel.deno.dev/playground)

## Usage

```ts
import { LoremBabel } from '@li/lorem-babel'
import config from '@li/lorem-babel/locales/vi' with { type: 'json' }

const lorem = new LoremBabel(config)
const result = lorem.text()

console.info(result.toString())

// Thiên đường cho chợ luôn sôi động. Các nhà bóng người.

// Ga tàu hỏa nhộn nhịp tại vĩnh cửu. Không gian dường như một nhịp điệu, tiếng lá cây xanh mướt, thu hút những bước qua những quan của rạn san hô nuôi dưỡng cơ hội.

// Mùi thơm của mình. Môi trường yên và sinh tồn trong chu kỳ tự. Giữa những trải qua rừng cây cỏ mới, gia vị mới ra."
```
