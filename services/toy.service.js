
const fs = require('fs')
const toys = require('../data/toy.json')

module.exports = {
    query,
    getById,
    remove,
    save
}


function query(filterBy) {
    console.log(filterBy);
    const regex = new RegExp(filterBy.byName, 'i')
      let toysToShow = toys.filter((toy) => regex.test(toy.name))
    return Promise.resolve(toysToShow)
}

function getById(toyId) {
    const toy = toys.find(toy => toy._id === toyId)
    return Promise.resolve(toy)
}

function remove(toyId) {
    const idx = toys.findIndex(toy => toy._id === toyId)
    toys.splice(idx, 1)
    return _saveToysToFile()
}

function save(toy) {
    if (toy._id) {
        const idx = toys.findIndex(currToy => currToy._id === toy._id)
        toys[idx] = toy
    } else {
        toy._id = _makeId()
        toys.unshift(toy)
    }
    return _saveToysToFile().then(() => toy)
}



function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}
function _saveToysToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(toys, null, 2)

        fs.writeFile('data/toy.json', data, (err) => {
            if (err) return reject(err)
            resolve()
        })
    })
}
