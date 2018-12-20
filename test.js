const randomArray = [
    {
        a: 1,
        b: 2
    },
    {
        a: 3,
        b: 4
    },
    {
        a: 5,
        b: 2
    },
]

let newArray = randomArray.filter( (item, i) => {
    console.log(item)
    
    return randomArray.indexOf(item.b) === i
})