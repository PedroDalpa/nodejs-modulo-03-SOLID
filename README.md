# APP

GymPass style app.

## RFs (Requisitos funcionais)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o numero de check-ins realizados pelo usuário;
- [ ] Deve ser possível o usuário obter o seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócios)

- [ ] O usuário nao deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário nao pode fazer mais de um check-in no mesmo dia;
- [ ] O usuário nao pode fazer fazer check-in se nao estiver a mais de 100m da academia;
- [ ] O check-in so pode ser validado ate 20 minutos apos criado;
- [ ] O check-in so pode ser validado por administradores;
- [ ] A academia so pode ser cadastrada por administradores;

## RNFs (Requisitos nao funcionais)

- [ ] A senha do usuário precis esta criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itemns por pagina;
- [ ] O usuário deve ser identificado por JWT (JSON web Token);

