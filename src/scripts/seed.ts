const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();


async function seed(){

    //Insert user
    await prisma.user.createMany({
        data:[
            {
            id:1,
            name:"Almant",
            email:"admin1@gmail.com",
            role:"ADMIN",
            password:bcrypt.hashSync('12345678',8)
        },
        {
            id:3,
            name:"Ari",
            email:"photo1@gmail.com",
            role:"PHOTOGRAPH",
            password:bcrypt.hashSync('12345678',8)
        },
        {
          id:4,
          name:"photo2",
          email:"photo2@gmail.com",
          role:"PHOTOGRAPH",
          password:bcrypt.hashSync('12345678',8)
        },
        {
          id:5,
          name:"photo3",
          email:"photo3@gmail.com",
          role:"PHOTOGRAPH",
          password:bcrypt.hashSync('12345678',8)
        },
        {
          id:6,
          name:"photo4",
          email:"photo4@gmail.com",
          role:"PHOTOGRAPH",
          password:bcrypt.hashSync('12345678',8)
        },
        {
          id:7,
          name:"User",
          email:"user1@gmail.com",
          role:"USER",
          password:bcrypt.hashSync('12345678',8)
        }
    ],skipDuplicates:true
})}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });