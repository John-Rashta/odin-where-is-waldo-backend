import prisma from "../../config/client";

const imagePool = [
    {
        name: "One Piece Collaboration",
        id: 1,
        url: "https://res.cloudinary.com/dju5ydi5i/image/upload/v1738939295/sa99fss0kcihsagxrjkb.webp",
    },
    {
        name: "Horseplay in Troy",
        id: 2,
        url: "https://res.cloudinary.com/dju5ydi5i/image/upload/v1738939335/j1a3q5ftpwfaqlldstcf.webp",
    },
    {
        name: "Gobbling Gluttons",
        id: 3,
        url: "https://res.cloudinary.com/dju5ydi5i/image/upload/v1738939383/nc4bh51b9tomcicpjnek.webp",
    },
    {
        name: "Knights of the Magic Flag",
        id: 4,
        url: "https://res.cloudinary.com/dju5ydi5i/image/upload/v1738939419/cajeljhin6lmwonimcss.webp",
    },
    {
        name: "Fighting Foresters",
        id: 5,
        url: "https://res.cloudinary.com/dju5ydi5i/image/upload/v1738939452/nckq7vz7d5c7vfbsfisl.webp",
    },
];


const fixDatabase = async function fixMainDatabase() {
    
    for (let j = 0; j < 5; j++) {
    await prisma.image.update({
        data: {
            url: imagePool[j].url,
        },
        where: {
            id: imagePool[j].id
        }
    });
    }

    await prisma.character.updateMany({
        where: {
            name: "Woof"
        },
        data : {
            url: "https://res.cloudinary.com/dju5ydi5i/image/upload/v1738939253/jtt0mbds8zy5tgfhybiw.png"
        }
    })
 };

 fixDatabase();