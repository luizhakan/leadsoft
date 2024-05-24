## Como rodar o projeto
Instalar o Docker: https://docs.docker.com/desktop/install/windows-install/
Dependendo do seu sistema operacional, você pode trocar por linux ou mac

Para não ter problema com permissão, sempre execute o container com permissão de administrador, no caso do linux, use o sudo

Como rodar no Linux (meu sistema operacional): sudo docker-compose up --build
No Windows deve ser a mesma coisa, mas sem o sudo (mas deve-se iniciar o CMD/PowerShell como administrador)

Usuário padrão:
username: leadsoft
password: softlead

## Backend

### Modelos de Dados

1. **User**
   - Id
   - username
   - password
   - role (admin, basic)

2. **Animes**
   - Id
   - gender
   - title
   - type
   - source

### Endpoints da API

1. **POST /users/login:** Autentica um usuário existente.
2. **POST /users/create:** Cria um novo usuário (somente administradores).
3. **GET /users:** Retorna uma lista de usuários (somente administradores).
4. **POST /process/start:** Inicia o processamento da planilha para um usuário específico (somente administradores).
5. **POST /process/pause:** Pausa o processamento da planilha para um usuário específico (somente administradores).
6. **POST /animes:** Retorna uma lista de animes.

## Frontend

### Telas

1. **Tela de Login:** Esta tela será usada tanto pelo administrador quanto pelo usuário comum para autenticar no sistema.
2. **Tela de Administração de Usuários (somente para administradores):** Esta tela exibirá uma lista de usuários já cadastrados e permitirá ao administrador criar um novo usuário.
3. **Tela de Processamento de Planilha (somente para administradores):** Nesta tela, o administrador poderá iniciar o processamento da planilha CSV para um usuário específico, selecionando os parâmetros Type e Source.
4. **Tela de Lista de Itens (para usuários comuns):** Após a autenticação, o usuário comum terá acesso a esta tela, que exibirá uma lista paginada de itens que já foram processados.
5. **Tela de Contador de Itens (para usuários comuns):** Esta tela exibirá um contador que mostra a quantidade de itens já processados, atualizado em tempo real de acordo com os status dos processamentos.

### Componentes

1. **Componente de Login:** Este componente permitirá que os usuários insiram suas credenciais para autenticar no sistema.
2. **Componente de Lista de Usuários:** Este componente exibirá a lista de usuários já cadastrados no sistema.
3. **Componente de Criação de Usuário:** Este componente permitirá ao administrador criar um novo usuário.
4. **Componente de Processamento de Planilha:** Este componente permitirá ao administrador iniciar o processamento da planilha CSV para um usuário específico.
5. **Componente de Lista de Itens:** Este componente exibirá a lista paginada de itens que já foram processados.
6. **Componente de Contador de Itens:** Este componente exibirá a quantidade de itens já processados, atualizado em tempo real.
