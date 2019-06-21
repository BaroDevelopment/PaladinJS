## Container

### Using Markdown
<br/>

<Expansion>
    ::: tip YINGYANG - Lead Developer & Maintainer
    
    ![avatar](https://cdn.discordapp.com/attachments/396964573007052800/534165823645024296/YingYang.gif)
    
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
    
    <em>All inquires about Lorem can be sent to <a href="mailto:zach@mtgjson.com">test@example.com</a></em>
    :::
</Expansion>
  
::: tip YINGYANG - Lead Developer & Maintainer
![avatar](https://cdn.discordapp.com/attachments/396964573007052800/534165823645024296/YingYang.gif)

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore 
magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd 
gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

<em>All inquires about Lorem can be sent to <a href="mailto:zach@mtgjson.com">test@example.com</a></em>
:::

<Expansion>
    ::: warning Warning
    Theme components `are subject` to the same [browser API access restrictions](./markdown.md).
    :::
</Expansion>    

::: warning Warning
Theme components `are subject` to the same [browser API access restrictions](./README.md).
:::

<Expansion>
    ::: danger Danger
    Theme components are subject to the same [browser API access restrictions](./markdown.md).
    :::
</Expansion>

::: danger Danger
Theme components are subject to the same [browser API access restrictions](./markdown.md).
:::

<Expansion>
    ::: info Info
    Theme components are subject to the same [browser API access restrictions](./README.md).
    :::
</Expansion>

::: info Info
Theme components are subject to the same [browser API access restrictions](./README.md).
:::

### Using Vue Component
<br/>
<Expansion lang="vue">

    <Hint
        type='info'
        img='https://cdn.discordapp.com/attachments/396964573007052800/492135655233683458/PaladinHypeMain.gif'
        title='Info Block'
        text='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor inviduntlor sit amet.'
    />
</Expansion>

<Hint
    type='info'
    img='https://cdn.discordapp.com/attachments/396964573007052800/492135655233683458/PaladinHypeMain.gif'
    title='Info Block'
    text='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
/>

<Expansion>
    ::: vue Test
    .
    ├── docs
    │   ├── .vuepress _(**Optional**)_
    │   │   ├── `components` _(**Optional**)_
    │   │   ├── `theme` _(**Optional**)_
    │   │   │   └── Layout.vue
    │   │   ├── `public` _(**Optional**)_
    │   │   ├── `styles` _(**Optional**)_
    │   │   │   ├── index.styl
    │   │   │   └── palette.styl
    │   │   ├── `templates` _(**Optional, Danger Zone**)_
    │   │   │   ├── dev.html
    │   │   │   └── ssr.html
    │   │   ├── `config.js` _(**Optional**)_
    │   │   └── `enhanceApp.js` _(**Optional**)_
    │   │ 
    │   ├── README.md
    │   ├── guide
    │   │   └── README.md
    │   └── config.md
    │ 
    └── package.json
    :::
</Expansion>

::: vue Directory Structure
.
├── docs
│   ├── .vuepress _(**Optional**)_
│   │   ├── `components` _(**Optional**)_
│   │   ├── `theme` _(**Optional**)_
│   │   │   └── Layout.vue
│   │   ├── `public` _(**Optional**)_
│   │   ├── `styles` _(**Optional**)_
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── `templates` _(**Optional, Danger Zone**)_
│   │   │   ├── dev.html
│   │   │   └── ssr.html
│   │   ├── `config.js` _(**Optional**)_
│   │   └── `enhanceApp.js` _(**Optional**)_
│   │ 
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│ 
└── package.json
:::

<Expansion lang="vue">

    <Admonition 
    text="Note Admonition Content" 
    type="note" 
    title="Note Admonition Title"
    :expand="1"
    />
</Expansion>
<Admonition text="Note Admonition Content" type="note" title="Note Admonition Title" :expand="1"/>

<Expansion lang="vue">

    <Admonition 
    text="Abstract Admonition Content" 
    type="abstract" 
    title="Abstract Admonition Title"
    :expand="1"
    />
</Expansion>
<Admonition text="Abstract Admonition Content" type="abstract" title="Abstract Admonition Title" :expand="1"/>

<Expansion lang="vue">

    <Admonition 
    text="Infoormation Admonition Content" 
    type="information" 
    title="Infoormation Admonition Title"
    />
</Expansion>
<Admonition text="Infoormation Admonition Content" type="information" title="Infoormation Admonition Title"/>

<Expansion lang="vue">

    <Admonition 
    text="Check Admonition Content" 
    type="check" 
    title="Check Admonition Title"
    />
</Expansion>
<Admonition text="Check Admonition Content" type="check" title="Check Admonition Title"/>

<Expansion lang="vue">

    <Admonition 
    text="Question Admonition Content" 
    type="question" 
    title="Question Admonition Title"
    />
</Expansion>
<Admonition text="Question Admonition Content" type="question" title="Question Admonition Title"/>

<Expansion lang="vue">

    <Admonition 
    text="Warn Admonition Content" 
    type="warn" 
    title="Warn Admonition Title"
    />
</Expansion>
<Admonition text="Warn Admonition Content" type="warn" title="Warn Admonition Title"/>

<Expansion lang="vue">

    <Admonition 
    text="Fail Admonition Content" 
    type="fail" 
    title="Fail Admonition Title"
    />
</Expansion>
<Admonition text="Fail Admonition Content" type="fail" title="Fail Admonition Title"/>

<Expansion lang="vue">

    <Admonition 
    text="Error Admonition Content" 
    type="err" 
    title="Error Admonition Title"
    />
</Expansion>
<Admonition text="Error Admonition Content" type="err" title="Error Admonition Title"/>

<Expansion lang="vue">

    <Admonition 
    text="Bug Admonition Content" 
    type="bug" 
    title="Bug Admonition Title"
    />
</Expansion>
<Admonition text="Bug Admonition Content" type="bug" title="Bug Admonition Title"/>

<Expansion lang="vue">

    <Admonition 
    text="Example Admonition Content" 
    type="example" 
    title="Example Admonition Title"
    />
</Expansion>
<Admonition text="Example Admonition Content" type="example" title="Example Admonition Title"/>

<Expansion lang="vue">

    <Admonition 
    text="Quote Admonition Content" 
    type="quote" 
    title="Quote Admonition Title"
    />
</Expansion>
<Admonition text="Quote Admonition Content" type="quote" title="Quote Admonition Title"/>