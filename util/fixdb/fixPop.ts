import prisma from "../../config/client";

const imagePool = [
    {
        name: "One Piece Collaboration",
        id: 1,
        url: "https://res.cloudinary.com/dju5ydi5i/image/upload/c_scale,h_0.50,w_0.50/sa99fss0kcihsagxrjkb.webp",
    },
    {
        name: "Horseplay in Troy",
        id: 2,
        url: "https://res.cloudinary.com/dju5ydi5i/image/upload/c_scale,h_0.50,w_0.50/j1a3q5ftpwfaqlldstcf.webp",
    },
    {
        name: "Gobbling Gluttons",
        id: 3,
        url: "https://res.cloudinary.com/dju5ydi5i/image/upload/c_scale,h_0.50,w_0.50/nc4bh51b9tomcicpjnek.webp",
    },
    {
        name: "Knights of the Magic Flag",
        id: 4,
        url: "https://res.cloudinary.com/dju5ydi5i/image/upload/c_scale,h_0.50,w_0.50/cajeljhin6lmwonimcss.webp",
    },
    {
        name: "Fighting Foresters",
        id: 5,
        url: "https://res.cloudinary.com/dju5ydi5i/image/upload/c_scale,h_0.50,w_0.50/nckq7vz7d5c7vfbsfisl.webp",
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

    const  poolData = await prisma.character.findMany({
         where: {
            NOT: {
                mapid: 1
            }
         }
    });

    await prisma.$transaction(
        poolData.map((char) => 
            prisma.character.update({
                where: {id: char.id},
                data: {
                    coordXMax: Math.floor(char.coordXMax / 2),
                    coordXMin: Math.floor(char.coordXMin / 2),
                    coordYMax: Math.floor(char.coordYMax / 2),
                    coordYMin: Math.floor(char.coordYMin / 2),
                }
            })
        )
    )
 };

 fixDatabase();