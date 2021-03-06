const zmq = require("zeromq")

const app = async function(){
    const subscribeSocket = zmq.socket("sub")
    subscribeSocket.connect("tcp://127.0.0.1:5557")
    subscribeSocket.subscribe("")
    const pushSocket = zmq.socket("push")
    pushSocket.connect("tcp://127.0.0.1:5558")

    
    subscribeSocket.on("message", function(msg){
        console.log("I : receive massage", msg.toString())
    })

    setInterval(() => {
        let randomInt = getRandomInt(1, 100)
        if (randomInt < 10){
            pushSocket.send(randomInt)
            console.log("I: sending message", randomInt)
        }
    }, 1000);
    function getRandomInt(min, max) {
        return parseInt(Math.random() * (max - min) + min)
    }
}

app()


