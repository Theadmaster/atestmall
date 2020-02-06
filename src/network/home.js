import {request} from './request'

export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}

export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}


// 把一个数组塞到另一个数组中去
// let totalNums = []
// const nums1 = [20 ,21, 22]
// const nums2 = [1 ,2, 24]

// 方法一
// for(let n in num1) {
//     totalNums.push(n)
// }

// 方法二
// totalNums.push(...nums1)
