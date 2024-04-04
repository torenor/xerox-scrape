

function fun1() {
    function fun2() {
        console.log("From function fun2");
        return "Alert from fun2 ";
    }
    return fun2();
}

function fun3() {
    //function fun2() {
    //    console.log("From function fun2");
    //    return "Alert from fun2 ";
    //}
    //return fun2();
    return "test";
    return fun3();
}
 
function GFG_Fun() {
    console.log(fun3());
}
GFG_Fun()