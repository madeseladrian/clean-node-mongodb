# Cadastro

> ## SignUpController
1. ✅ Retorna um erro **400** se o name não for fornecido pelo client
2. ✅ Retorna um erro MissingParamError se o **name** estiver faltando
3. ✅ Retorna um erro **400** se o email não for fornecido pelo client
4. ✅ Retorna um erro MissingParamError se o **email** estiver faltando
5. ✅ Retorna um erro **400** se o password não for fornecido pelo client
6. ✅ Retorna um erro MissingParamError se o **password** estiver faltando
7. ✅ Retorna um erro **400** se o passwordConfirmation não for fornecido pelo client
8. ✅ Retorna um erro MissingParamError se o **passwordConfirmation** estiver faltando
9. Valida que **password** e **passwordConfirmation** são iguais
10.✅ Retorna um erro **400** se o campo **email** for inválido
11.✅ Valida se **EmailValidator** recebe o email correto
12.✅ Retorna um erro **500** se o **EmailValidator** falhar
13.✅ **Chama** o AddAccount para criar uma conta para o usuário com os dados informados
14.✅ Retorna um erro **500** se o AddAccount falhar
15.✅ Retorna **200** se os dados forem válidos