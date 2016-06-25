Light Hunter
=====================

Teste para aplicativo de identificação de semaforos sem necessidade de interface.


Manual:
=====================

=====================
Como rodar
=====================

1. Baixar os códigos que estão no repositório: 
   git clone https://github.com/andredalton/light_hunter.git

2. Se o virtual env não estiver instalado, execute o comando:
   sudo pip install virtualenv

3. Crie seu virtualenv:
   virtualenv NomeDoAmbiente

   E entre nesse ambiente virtual:
   source ./NomeDoAmbiente/bin/activate


4. Feito isso, é necessário instalar os requisitos necessários
   para rodar o código. Importante: usamos a versão 2.7 do python:
   pip install -r requirements.txt
   

Agora é só abrir a página do seu navegador http://127.0.0.1:5000/
Recomenda-se usar o Chromium do que o Firefox, pois os frames da imagem ficam
melhores. Provavelmente, porque o primeiro deve usar mais RAM do computador.

 5. Para sair do seu ambiente virtual basta rodar:
    deactivate


Referências
=====================

Código aproveitado do [repositório](http://github.com/miguelgrinberg/flask-video-streaming) 

Baseado no artigo [video streaming with Flask](http://blog.miguelgrinberg.com/post/video-streaming-with-flask).
