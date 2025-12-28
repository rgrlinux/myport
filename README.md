# 🎨 myport - Landing Page com CSS Puro Moderno

Uma landing page moderna e performática construída com **CSS puro**, sem frameworks ou dependências.

## 🚀 Características

✅ **Zero dependências** - Apenas HTML, CSS e JavaScript  
✅ **CSS moderno** - Grid, Flexbox, Custom Properties, Nesting  
✅ **Totalmente responsivo** - Mobile-first design  
✅ **Performance máxima** - Sem build steps, carregamento instantâneo  
✅ **Acessível** - ARIA labels, keyboard navigation, skip links  
✅ **Código limpo** - Organização modular e comentada  

## 📁 Estrutura do Projeto

```
myport/
├── index.html              # Página principal
├── css/
│   ├── main.css           # Arquivo principal (importa tudo)
│   ├── base/              # Estilos base
│   │   ├── variables.css  # Variáveis CSS (Design System)
│   │   ├── reset.css      # Reset moderno
│   │   ├── typography.css # Sistema tipográfico
│   │   └── utilities.css  # Classes utilitárias
│   ├── components/        # Componentes reutilizáveis
│   │   ├── buttons.css    # Sistema de botões
│   │   └── cards.css      # Componentes de cartão
│   ├── layout/           # Layout estrutural
│   │   ├── header.css    # Menu fixo
│   │   └── footer.css    # Rodapé fixo
│   └── sections/         # Estilos por seção
│       ├── hero.css      # Seção hero
│       └── common.css    # Estilos comuns de seções
├── js/
│   └── main.js           # JavaScript modular
├── assets/               # Recursos estáticos
│   ├── images/          # Imagens
│   ├── icons/           # Ícones e favicon
│   └── fonts/           # Fontes locais (opcional)
├── pages/               # Páginas adicionais
│   └── examples.html    # Página de exemplos
└── README.md            # Esta documentação
```

## 🛠️ Como Usar

### 1. Desenvolvimento Local
```bash
# Navegue para o projeto
cd myport

# Use um servidor local simples:
# Python
python3 -m http.server 8000

# Ou Node.js (se tiver)
npx serve .

# Ou abra diretamente no navegador
open index.html
```

### 2. Customização

#### Cores e Tema
Edite `css/base/variables.css` para mudar:
- Cores primárias/secundárias
- Espaçamentos
- Tipografia
- Breakpoints

#### Conteúdo
Edite `index.html` para alterar o conteúdo da página.

#### Estilos
Adicione seus estilos em:
- `css/sections/` para novas seções
- `css/components/` para novos componentes
- `css/base/` para estilos globais

## 🎯 Recursos CSS Modernos Utilizados

### 1. Custom Properties (Variáveis CSS)
```css
:root {
  --primary: #4361ee;
  --spacing: clamp(1rem, 5vw, 3rem);
}
```

### 2. CSS Nesting (2023)
```css
.header {
  &__logo {
    color: var(--primary);
  }
  
  @media (width >= 768px) {
    height: 100px;
  }
}
```

### 3. Grid & Flexbox
```css
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}
```

### 4. Clamp() para Responsividade
```css
font-size: clamp(1rem, 2vw, 1.5rem);
```

### 5. Container Queries (se suportado)
```css
@container (width > 400px) {
  .card {
    /* Estilos para cards maiores */
  }
}
```

## 📱 Responsividade

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px  
- **Desktop:** > 1024px

## 🔧 JavaScript Incluído

- Menu mobile responsivo
- Scroll suave entre seções
- Botões de scroll (↑↓)
- Seletor de idioma
- Atualização automática do ano no footer
- Suporte a prefers-reduced-motion

## 🚀 Deploy

### GitHub Pages
```bash
# Faça commit e push
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin seu-repositorio.git
git push -u origin main

# Ative GitHub Pages nas configurações
```

### Netlify/Vercel
Arraste a pasta do projeto para o deploy.

## 📄 Licença

MIT - Use como quiser!

## ✨ Dicas

1. Use `pages/examples.html` como referência de componentes
2. Consulte `css/base/variables.css` para o design system
3. Teste a acessibilidade com ferramentas como Lighthouse
4. Otimize imagens antes de adicionar ao projeto

---

**Feito com ❤️ e CSS puro!**
