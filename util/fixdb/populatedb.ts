import { createCharacter, createImage } from "../queries";
import { imageCreation, CharCreation } from "../type/interfaces";
import "dotenv/config";


const imagePool : imageCreation = {
    name: "Basic Map",
    url: "wwwBasicMapcom"
};

 const charsPool : CharCreation[] = [
    {
        name: "waldo",
        coordXMax : 1155,
        coordYMax : 560,
        coordXMin : 1123,
        coordYMin : 511,
        url: "wwwWaldoLinkcom",
        mapid: 1

    },
    {
        name: "larry",
        coordXMax : 123,
        coordYMax : 325,
        coordXMin : 100,
        coordYMin : 300,
        url: "wwwLarryLinkcom",
        mapid: 1
    },
    {
        name: "olly",
        coordXMax : 870,
        coordYMax : 770,
        coordXMin : 840,
        coordYMin : 730,
        url: "wwwOllyLinkcom",
        mapid: 1
    },
 ];

const populateDatabase = async function poolTestDatabase() {
    
    await createImage(imagePool);
    
    for (let i = 0; i < 3; i++) {
    await createCharacter(charsPool[i]);
    }
 };

 populateDatabase();

