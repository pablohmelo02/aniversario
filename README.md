# Presente para Adriane

Um site/álbum de aniversário feito para a Adriane — a Joia e Riqueza.

## Como abrir

Abra o arquivo `index.html` no navegador. Para testar como um site local, também
é possível executar, nesta pasta:

```powershell
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

O projeto é um site estático e pode ser importado diretamente na Vercel, sem
comando de build e com a pasta raiz como diretório de publicação.

## Onde personalizar

- **Carta e frases:** edite os textos em `index.html`.
- **Fotos:** substitua os caminhos em `index.html` e em `style.css`.
- **Assinatura:** procure por `seu amor ♡` no fim da carta e troque pelo seu nome.
- **Música:** coloque a música em `musica/musica.mp3`. Ela começa quando o presente
  é aberto e pode ser pausada pelo botão no canto da tela.

As imagens HEIC foram mantidas na pasta, mas não foram usadas nesta versão porque
esse formato não abre de forma consistente em todos os navegadores e celulares.

Algumas fotos que estavam fisicamente giradas ganharam cópias corrigidas em
`assets/photos`; os arquivos originais continuam intactos.
