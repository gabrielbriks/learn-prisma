import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

// A `main` function so that you can use async/await
async function main() {
  
//#region User
  //>>retorna todos os registros
  const resulTodos = await prisma.user.findMany();
  
  //>>cria um novo registro
  // const resultCreate = await prisma.user.create({
  //   data: {
  //     email: 'juquinha@test.com'
  //   }
  // });

  //>>Atualiza registro
  // const resultUpdate = await prisma.user.update({
  //   data: {
  //     name: 'Juquinha Atualizado',

  //   },
  //   where:{
  //     id: 4
  //   }
  // });

  
  //Task7: Find register unique by email
  const findByEmail = await prisma.user.findUnique({
    where: {
      email: 'gabriel@teste.com'
    }
  });


  //Task8: Find register trazendo apenas alguns campos
  const findOnlyFielEspecific = await prisma.user.findMany({
    select: {
      id:true,
      email: true
    }
  })


  //Task9: Subconsulta para incluir relacionamento no reasultado 
  const findWithIncludingRelationshipPost = await prisma.user.findMany({
   include:{
     posts: true
   }
  })


  //Task10: Cria novo usuario vinculando o Post numa mesma consulta
  // const createUserAndPost = await prisma.user.create({
  //   data:{
  //     name: 'Muriel Com post',
  //     email: 'muriel@post.com',
  //     posts: {
  //       create: {
  //         title: 'Post Muriel',
  //         published: true,
  //         content: 'ARCHIVE'
  //       }
  //     }
  //   }
  // });


  //Task11: Find user using o like (usuarios que começam com a letra 'M')
  const FindByLetterStartWithM =  await prisma.user.findMany({
    where: {
      name: {
        startsWith: 'J'
      }
    }
  })


  //Task12: Find Registers with pagination(incluir paginação ao resultado)
  const findUsersWithPagination = await prisma.user.findMany({
    skip: 0,
    take: 1,
    /*#Description
      > Representa: Primeiro registro na primeira pagina
      skip: 0,
      take: 1,

      > Representa: Ingonra o primeiro registro(exibido na primeira pagina)
        e tras o proximo registro em uma nova pagina 
      skip: 1,
      take: 1,
    */
  })

  

  //>>Show resultados
  // console.log(resulTodos);
  // console.log('CREATE NEW REGISTER',resultCreate);
  // console.log('UPDATE REGISTER', resultUpdate);
  // console.log(findByEmail);
  // console.log(findOnlyFielEspecific);
  // console.log(JSON.parse(findWithIncludingRelationshipPost, null, 1));
  // console.log(createUserAndPost);
  // console.log(FindByLetterStartWithM);
  // console.log(findUsersWithPagination);




//#endregion


//#region Post

  //>>Task5: Create new post
  // const resultCreatePost = await prisma.post.create({
  //   data: {
  //     title: 'Teste 1',
  //     published: false,

  //   }
  // });

  //Task6: Add link/realation between post and User
  // const resultLinkPostWithUser = await prisma.post.update({
  //   data:{
  //     /*autorId: 3, //>> Posso fazer simplesmente assim ou da maneira abaixo:*/
  //     author: {
  //       connect: {
  //         id: 3,
  //       }
  //     }
  //   },
  //   where: {
  //     id: 1
  //   }
  // })



  // console.log(resultCreatePost);
  // console.log(resultLinkPostWithUser);

//#endregion

}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
