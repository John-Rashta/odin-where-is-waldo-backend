import prisma from "../../config/client";
import { createCharacter } from "../queries";

const imagePool = [
    {
        name: "One Piece Collaboration",
        id: 1,
        url: "https://ia800402.us.archive.org/1/items/wheres-waldo-archive/Other/special-2021-one-piece-collaboration.jpeg",
    },
    {
        name: "Horseplay in Troy",
        id: 2,
        url: "https://ia800402.us.archive.org/1/items/wheres-waldo-archive/04%20-%20In%20Hollywood/2016%20-%20In%20Hollywood%20Deluxe%20Edition/book4-2016-scene03-horseplay-in-troy-full-600dpi.jpg",
    },
    {
        name: "Gobbling Gluttons",
        id: 3,
        url: "https://ia800402.us.archive.org/1/items/wheres-waldo-archive/03%20-%20The%20Great%20Waldo%20Search/2013%20-%20The%20Fantastic%20Journey%20Deluxe%20Edition/book3-2013-scene01-the-gobbling-gluttons-full-600dpi.jpg",
    },
    {
        name: "Knights of the Magic Flag",
        id: 4,
        url: "https://ia600402.us.archive.org/1/items/wheres-waldo-archive/03%20-%20The%20Great%20Waldo%20Search/2013%20-%20The%20Fantastic%20Journey%20Deluxe%20Edition/book3-2013-scene09-the-knights-of-the-magic-flag-full-600dpi.jpg",
    },
    {
        name: "Fighting Foresters",
        id: 5,
        url: "https://ia800402.us.archive.org/1/items/wheres-waldo-archive/03%20-%20The%20Great%20Waldo%20Search/2013%20-%20The%20Fantastic%20Journey%20Deluxe%20Edition/book3-2013-scene07-the-fighting-foresters-full-600dpi.jpg",
    },
];

const charsMainInfo = [
    {
        name: "Waldo",
        url: "https://res.cloudinary.com/dju5ydi5i/image/upload/v1738610457/znfyyvjwn3xrd5p4vyjp.png",

    },
    {
        name: "Woof",
        url: "https://static.wikia.nocookie.net/waldo/images/b/bc/Character.Woof.jpg/revision/latest/scale-to-width-down/200?cb=20071001045027",

    },
    {
        name: "Wenda",
        url: "https://res.cloudinary.com/dju5ydi5i/image/upload/v1738610457/lkwo4djemnxqyrahtpuk.png",

    },
    {
        name: "Wizard",
        url: "https://res.cloudinary.com/dju5ydi5i/image/upload/v1738610457/eeyfft2sfgdwax7klwgy.png",

    },
    {
        name: "Odlaw",
        url: "https://res.cloudinary.com/dju5ydi5i/image/upload/v1738610457/m4b5hfrtykm15qu3fsjc.png",

    }, 
];

const coordsInfo = [
    [
       {
        minX: 581 ,
        maxX: 601 ,
        minY: 1221 ,
        maxY: 1252 ,

       },
       {
        minX: 1362  ,
        maxX: 1375 ,
        minY: 1156 ,
        maxY: 1162 ,

       },
       {
        minX: 1574 ,
        maxX: 1593 ,
        minY: 413 ,
        maxY: 456 ,

       },
       {
        minX: 876 ,
        maxX: 905 ,
        minY: 476 ,
        maxY: 563,

       },
       {
        minX: 1121 ,
        maxX: 1139 ,
        minY: 1042 ,
        maxY: 1078 ,

       },
    ],
    [
        {
            minX: 1177,
            maxX: 1257,
            minY: 3937,
            maxY: 4013,
    
           },
           {
            minX: 4713,
            maxX: 4765,
            minY: 3229,
            maxY: 3265,
    
           },
           {
            minX: 5841,
            maxX: 5909,
            minY: 3513,
            maxY: 3601,
    
           },
           {
            minX: 2153,
            maxX: 2201,
            minY: 281,
            maxY: 337,
    
           },
           {
            minX: 6705,
            maxX: 6761,
            minY: 3829,
            maxY: 3901,
    
           },
        
    ],
    [
        {
            minX: 4309 ,
            maxX: 4421,
            minY: 1669,
            maxY: 1845,
    
           },
           {
            minX: 5165,
            maxX: 5257,
            minY: 2957,
            maxY: 3005,
    
           },
           {
            minX: 2945,
            maxX: 3029,
            minY: 1557,
            maxY: 1657,
    
           },
           {
            minX: 6441,
            maxX: 6577,
            minY: 4005,
            maxY: 4273,
    
           },
           {
            minX: 3041,
            maxX: 3133,
            minY: 2861,
            maxY: 3000,
    
           },
        
    ],
    [
        {
            minX: 1909,
            maxX: 1997,
            minY: 3185,
            maxY: 3305,
    
           },
           {
            minX: 5609,
            maxX: 5695,
            minY: 1483,
            maxY: 1533,
    
           },
           {
            minX: 6297,
            maxX: 6389,
            minY: 3329,
            maxY: 3425,
    
           },
           {
            minX: 3497,
            maxX: 3569,
            minY: 305,
            maxY: 401,
    
           },
           {
            minX: 593,
            maxX: 673,
            minY: 3513,
            maxY: 3633,
    
           },
        
    ],
    [
        {
            minX: 4705,
            maxX: 4797,
            minY: 1509,
            maxY: 1617,
    
           },
           {
            minX: 653,
            maxX: 741,
            minY: 3977,
            maxY: 4045,
    
           },
           {
            minX: 3101,
            maxX: 3177,
            minY: 3389,
            maxY: 3489,
    
           },
           {
            minX: 7165,
            maxX: 7229,
            minY: 1445,
            maxY: 1625,
    
           },
           {
            minX: 5561,
            maxX: 5641,
            minY: 3437,
            maxY: 3553,
    
           },
        
    ],
];

const populateDatabase = async function poolTestDatabase() {
    
    for (let j = 0; j < 5; j++) {
    await prisma.image.create({
        data: {
            id: imagePool[j].id,
            name: imagePool[j].name,
            url: imagePool[j].url,
        }
    });
    
        for (let i = 0; i < 5; i++) {
        await createCharacter({
            name: charsMainInfo[i].name,
            url: charsMainInfo[i].url,
            coordXMax: coordsInfo[j][i].maxX,
            coordXMin: coordsInfo[j][i].minX,
            coordYMax: coordsInfo[j][i].maxY,
            coordYMin: coordsInfo[j][i].minY,
            mapid: imagePool[j].id,
        });
    }}
 };

 populateDatabase();