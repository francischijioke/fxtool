exports.isConnectionValid = (userData) => {
    try {
    //connection parameters
    //sourceType => 1 for android, 2 for ios, 3 for web
    //sourceId => device id for android and ios, auto-generated for web
    //mode => 2 => Register user, 1 => visitor
    return ( (userData.sourceType == 1 || userData.sourceType == 2 || userData.sourceType == 3)  && (userData.sourceId != null 
        && userData.sourceId.length > 10)  && (userData.mode == 1 || userData.mode == 2) )
    
    } catch (e) {
     return false;   
    }
}


exports.sendPricesToConnections = (priceObj) => {
  try {
    MyWorkingSocket.connections.forEach(connection => {
        connection.sendUTF(priceObj)
     });
  } catch (e) {
    console.log('sendPricesToConnections error: '+e)
  }
}