"use strict";

const patisserie = {
  bananaCaramel: {
    stock: 3,
    price: 9.99,
  },
  contessa: {
    stock: 5,
    price: 7.99,
  },
  concorde: {
    stock: 11,
    price: 22.99,
  },
  mouseCake: {
    stock: 8,
    price: 16.99,
  },
  confettiSuprise: {
    stock: 9,
    price: 14.99,
  },
};

const checkOrder = (order) => {
  return new Promise((resolve, reject) =>{
    setTimeout(() =>{
      let totalPayment = order[1] * patisserie[order[0]].price;
      if(patisserie[order[0]].stock >= order[1]){
        resolve ([order, totalPayment]);
        console.log('Your order is ' + order[1] + ' and your payment is ' + totalPayment + ' ; If it is ok press 1')
      } else {
        reject ('Sorry order couldn\'t completed because it is sold out')
      }
    }, 3000)
  })
}

const payment = (resovedValueArray) =>{
  const totalCost = resovedValueArray[1];
  const order = resovedValueArray[0];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      document.addEventListener('keypress', function(e){
        if(e.key === '1'){
          resolve (order);
          console.log('Payment process completed. You paid ' + totalCost + ' .');
        } else{
          reject ('Cannot procces order, thank you for choosing us!');
        }
      })
    }, 2000);
  })
}

// let i = document.addEventListener('keypress', function(e){
//   console.log(e.key)
// })
// console.log(i)

const stockControl = (order) =>{
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('To Casier: wait for cheking stock...');
      if(patisserie[order[0]].stock-order[1] > 2){
        resolve (order[0] + ' stock is enough');
      } else{
        reject(order[0] + ' stock is critic')
      }
    }, 1000)
  })
}

const cakeType = document.getElementById('cakeSelect');
const cakeAmount = document.getElementById('cakeAmount');
const orderBtn = document.getElementById('submit_btn');

orderBtn.onclick = () => {
  console.log('You ordered ' + cakeAmount.value + ' of ' + cakeType.options[cakeType.selectedIndex].text)
  const order = [cakeType.value, cakeAmount.value];

  checkOrder(order)
  .then((resovedValueArray) => {
    return payment(resovedValueArray)
  })
  .then ((resovedValueArray) => {
    return stockControl(resovedValueArray)
  })
  .then ((succsesMessage) => {
    console.log(succsesMessage);
  })
  .catch((errorMessage) => {
    console.log(errorMessage);
  });
  
}


// console.log(cakeType.options[cakeType.selectedIndex].text);


