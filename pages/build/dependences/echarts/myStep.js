;
var myStep =(function(){
    function _verticalStep(str){
        console.log(str);
        var step = document.getElementById("myStep")
        step.append(svg)
    };
    return{
        verticalStep: _verticalStep,
    };
})();
