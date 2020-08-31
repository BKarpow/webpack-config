async function getTime(){
    return await Promise.resolve('Resulve');
}

console.log(getTime())

class Test {
    static test = "This property test class Test"
}

console.log(Test.test)

