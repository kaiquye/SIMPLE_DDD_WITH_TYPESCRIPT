# Domain Driven Architectures :building_construction:
Software design is a very hard thing. From years, a trend has appeared to put the business logic, a.k.a. the (Business) Domain, and with it the User, in the heart of the overall system. Based on this concept, different architectural patterns was imaginated.

One of the first and main ones was introduced by E. Evans in its Domain Driven Design approach.

![image](https://user-images.githubusercontent.com/69175890/191153158-c5829a96-a3e3-417b-98f1-8f0d7bc99fff.png)

Controladores (também conhecidos como manipuladores de rota)
Os controladores são os pontos de entrada para o contexto do aplicativo.

# **Casos de uso**  :necktie:

Um caso de uso é uma unidade lógica de negócios.

É uma classe que deve ter um executemétodo que será chamado pelos controladores.

Ele pode ter um construtor para definir suas dependências (implementações concretas - também conhecidas como adaptadores - dos objetos de porta ) ou seu contexto de execução.

Tome cuidado! Um caso de uso deve ter apenas uma responsabilidade comercial precisa!

Um caso de uso pode chamar objetos na mesma camada (como repositórios de dados) ou na camada de domínio.
