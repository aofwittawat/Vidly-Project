import _ from 'lodash';

// เป็น function ไว้ตัดเพื่อสร้าง array ของ movie ใหม่ตามหน้าที่ต้องการ 

export const paginate = (items, pageNumber, PageSize) => {
    const startIndex = (pageNumber-1) * PageSize
    // console.log(startIndex);
    return _(items).slice(startIndex).take(PageSize).value()

}