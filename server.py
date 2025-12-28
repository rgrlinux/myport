import subprocess
import sys
import os
from pathlib import Path

# Instala livereload se não tiver
try:
    from livereload import Server
except ImportError:
    print("Instalando livereload...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "livereload"])
    from livereload import Server

# Detecta estrutura automaticamente
def detect_root():
    # Se src/index.html existe, usa src
    if os.path.exists('src/index.html'):
        return 'src'
    # Se index.html está na raiz, usa .
    elif os.path.exists('index.html'):
        return '.'
    # Senão, pergunta
    else:
        print("❌ Não encontrei index.html")
        print("📂 Pastas encontradas:", os.listdir('.'))
        root = input("Digite a pasta raiz (ex: src, public, .): ").strip()
        return root if root else '.'

ROOT_DIR = detect_root()
PORT = 5500

print(f"📂 Usando diretório: {ROOT_DIR}")
print(f"📄 Index.html existe: {os.path.exists(os.path.join(ROOT_DIR, 'index.html'))}")

server = Server()

# Monitora tudo dentro da pasta raiz
server.watch(f'{ROOT_DIR}/*.html')
server.watch(f'{ROOT_DIR}/**/*.css')
server.watch(f'{ROOT_DIR}/**/*.js')
server.watch(f'{ROOT_DIR}/**/*.svg')
server.watch(f'{ROOT_DIR}/**/*.png')
server.watch(f'{ROOT_DIR}/**/*.jpg')

print(f"\n🚀 Servidor iniciado em http://localhost:{PORT}")
print("🔄 Live Reload ativo - Salve arquivos para ver mudanças")
print("⏹️  Pressione Ctrl+C para parar\n")

# Inicia servidor
try:
    server.serve(root=ROOT_DIR, port=PORT, open_url_delay=1)
except KeyboardInterrupt:
    print("\n👋 Servidor encerrado")
except Exception as e:
    print(f"\n❌ Erro: {e}")