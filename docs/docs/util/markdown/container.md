---
API:
 - name: color
   type: String
   parameters: RGB, HEX, primary, success, danger, warning, dark
   description: Component color
   default: primary
 - name: closable
   type: Boolean
   parameters: null
   description: With closable button
   default: false
 - name: icon
   type: String
   parameters: null
   description: With custom icon
   default: null
---

## Container

### Using Markdown
```md
::: tip YINGYANG - Lead Developer & Maintainer
![avatar](https://cdn.discordapp.com/attachments/396964573007052800/534165823645024296/YingYang.gif)

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore 
magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd 
gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

<em>All inquires about Lorem can be sent to <a href="mailto:zach@mtgjson.com">test@example.com</a></em>
:::
```
::: tip YINGYANG - Lead Developer & Maintainer
![avatar](https://cdn.discordapp.com/attachments/396964573007052800/534165823645024296/YingYang.gif)

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore 
magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd 
gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

<em>All inquires about Lorem can be sent to <a href="mailto:zach@mtgjson.com">test@example.com</a></em>
:::

```md
::: warning Warning
Theme components `are subject` to the same [browser API access restrictions](./markdown.md).
:::
```
::: warning Warning
Theme components `are subject` to the same [browser API access restrictions](./README.md).
:::

```md
::: danger Danger
Theme components are subject to the same [browser API access restrictions](./markdown.md).
:::
```
::: danger Danger
Theme components are subject to the same [browser API access restrictions](./markdown.md).
:::

```md
::: info Info
Theme components are subject to the same [browser API access restrictions](./README.md).
:::
```
::: info Info
Theme components are subject to the same [browser API access restrictions](./README.md).
:::

### Using Vue Component
```
<Hint
    type='info'
    img='https://cdn.discordapp.com/attachments/396964573007052800/492135655233683458/PaladinHypeMain.gif'
    title='Info Block'
    text='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
/>
```

<Hint
    type='info'
    img='https://cdn.discordapp.com/attachments/396964573007052800/492135655233683458/PaladinHypeMain.gif'
    title='Info Block'
    text='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
/>