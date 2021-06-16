import _ from 'lodash';

// เป็น function ไว้ตัดเพื่อสร้าง array ของ movie ตามหน้าที่ต้องการ ที่จะต้องให้แสดงใน 1 หน้า

export const paginate = (allMovies, pageNumber, PageSize) => {
    // หา index ที่เริ่มตัด
    const startIndex = (pageNumber-1) * PageSize
    // console.log(startIndex);
    return _(allMovies).slice(startIndex).take(PageSize).value() // จะได้ array ที่ถูกตัดเพื่อแสดงได้หน้านั้นๆ

}