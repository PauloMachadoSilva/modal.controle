# Oi Modal Controle



## Como Instalar

**Step 1**: Clone o repositório
```bash
$ git clone ssh://celular@vs-ssh.visualstudio.com:22/Telecom%20Oi/_ssh/Modal.Controle oi-controle
```

**Step 2**: Acesse a pasta do repositório clonado
```bash
$ cd oi-modal-controle/
```

**Step 3**: Instale as dependências
```bash
$ npm install
```

Ou usando Yarn
```bash
$ yarn install
```

**Step 4**: Rode o projeto (Irá executar `gulp serve:hmg`)
```bash
$ gulp
```

## Comandos Adicionais

**Modo Development**: Roda o projeto em desenvolvimento
```bash
$ gulp serve:hmg
```

**Modo Production**: Roda o projeto em production
```bash
$ gulp serve:prod
```

**Build Para Development**: Gera build do projeto para desenvolvimento
```bash
$ gulp build:hmg
```

**Build Para Production**: Gera build do projeto para production
```bash
$ gulp build:prod
```

## Features do Projeto

- Sourcemaps para JS e CSS
- SASS
- Template Cache para AngularJS
- Separa o projeto em `vendors.js`, `templates.js` e `bundle.js`
- GZIP para build de produção
- Otimização de Imagens
- Browser Reload
- ESLint para JS e AngularJS
