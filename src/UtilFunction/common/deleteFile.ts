import * as path from "path";
import * as fs from "fs";


export const deleteFile = (el) => {
    //разбиваем путь на массив
    const lengthArr = el.image.split('/').length

    //отбрасываем путь до папки static и имя файла
    const pathName = el.image.split('/').slice(3, lengthArr - 1).join('/')

    //последний елемент массива имя файла
    const fileName = el.image.split('/')[lengthArr - 1]

    const filePath = path.resolve(__dirname, '..', '..', 'static', pathName, fileName)
    console.log(filePath)
    fs.unlinkSync(filePath)
}