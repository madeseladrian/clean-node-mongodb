# Cadastro

> ## Caso de sucesso

1. ✅ Retorna erro **400** se o **name** não for fornecido pelo client
2. ✅ Valida o dado obrigatório **name**
3. ✅ Retorna erro **400** se o **email** não for fornecido pelo client
4. ✅ Valida o dado obrigatório **email**
5. ✅ Retorna erro **400** se o **password** não for fornecido pelo client
6. ✅ Valida o dado obrigatório **password**
7. ✅ Retorna erro **400** se o **passwordConfirmation** não for fornecido pelo client
8. ✅ Valida o dado obrigatório **passwordConfirmation**
9. ✅ Retorna erro **400** se o campo email for um e-mail inválido
10.✅ Valida que o campo **email** é um e-mail válido
11.✅ Retorna erro **500** se o **EmailValidator** falhar
12.✅ Valida que **password** e **passwordConfirmation** são iguais
13.✅ **Chama** um método criar conta para o usuário com os dados informados
14.✅ Retorna erro **500** se der erro ao tentar criar a conta do usuário
15. **Cria** uma conta para o usuário com os dados informados, **substituindo** a senha pela senha criptorafada
16. Recebe uma requisição do tipo **POST** na rota **/api/signup**
17. **Valida** se já existe um usuário com o email fornecido
18. Gera uma senha **criptografada** (essa senha não pode ser descriptografada)
19. Gera um **token** de acesso a partir do ID do usuário
20. **Atualiza** os dados do usuário com o token de acesso gerado
21. Retorna **200** com o token de acesso e o nome do usuário
22. Retorna erro **404** se a API não existir
23. Retorna erro **400** se password e passwordConfirmation não forem iguais
24. Retorna erro **403** se o email fornecido já estiver em uso
25. Retorna erro **500** se der erro ao tentar gerar uma senha criptografada
26. Retorna erro **500** se der erro ao tentar gerar o token de acesso
27. Retorna erro **500** se der erro ao tentar atualizar o usuário com o token de acesso gerado