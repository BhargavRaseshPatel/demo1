// /********************************************************************************
// * WEB700 – Assignment 02
// *
// * I declare that this assignment is my own work in accordance with Seneca's
// * Academic Integrity Policy:
// *
// * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
// *
// * Name: Bhargav Rasesh Patel 
//   Student ID: 116520248 
//   Date: January 29, 2025
// *
// ********************************************************************************/

// // import { Data } from '../data/setData.js'
// // import { Theme } from '../data/themeData.js'

// // const Data = require('../data/setData.js')
// // const Theme = require('../data/themeData.js')

// class LegoData {
//     sets

//     constructor() {
//         this.sets = []
//     }

//     initialize() {

//         const setData = require('../data/setData.js')
//         const themeData = require('../data/themeData.js')

//         this.sets = setData.map(element => {
//             element.theme = themeData.find((ele) => ele.id == element.theme_id).name
//             return {...element}
//         });
//     }

//     getAllSets() {
//         return new Promise((resolve, reject ) => {
//             resolve(this.sets)
//         })
//     }

//     getSetByNum(setNum) {
//         return new Promise((resolve, reject) => {
//             resolve(this.sets.find((ele) => ele.set_num == setNum))
//         }) 
//     }

//     getSetsByTheme(theme) {
//         return new Promise((resolve, reject) => {
//             resolve(this.sets.filter((element) => element.theme.toLowerCase().includes(theme)))
//         }) 
//     }
// }

// // export default LegoData;
// module.exports = LegoData

class LegoData {
    constructor() {
        this.sets = [];
    }

    initialize() {
        return new Promise((resolve, reject) => {
            try {
                const setData = require('../data/setData.js');
                const themeData = require('../data/themeData.js');

                this.sets = setData.map(element => {
                    const theme = themeData.find(ele => ele.id == element.theme_id);
                    if (theme) {
                        element.theme = theme.name;
                    }
                    return { ...element };
                });
                resolve();
            } catch (error) {
                reject("Error initializing LegoData: " + error);
            }
        });
    }

    getAllSets() {
        return new Promise((resolve, reject) => {
            if (this.sets.length > 0) {
                resolve(this.sets);
            } else {
                reject("No Lego sets available");
            }
        });
    }

    getSetByNum(setNum) {
        return new Promise((resolve, reject) => {
            const set = this.sets.find(ele => ele.set_num == setNum);
            if (set) {
                resolve(set);
            } else {
                reject("Set not found");
            }
        });
    }

    getSetsByTheme(theme) {
        return new Promise((resolve, reject) => {
            const filteredSets = this.sets.filter(element => element.theme.toLowerCase().includes(theme.toLowerCase()));
            if (filteredSets.length > 0) {
                resolve(filteredSets);
            } else {
                reject("No sets found for the given theme");
            }
        });
    }
}

module.exports = LegoData;
