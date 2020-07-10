//Structure of an order

class Order{
  constructor(id, user,items, totalAmount, date){
    this.id= id;
    this.user = user;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date
  }
  // get readableDate(){
  //   return this.date.toLocaleDateString('en-EN',{
  //     year:'numeric',
  //     mongth:'long',
  //     day:'numeric',
  //     hour:'2-digit',
  //     minute:'2-digit'
  //   })
  // }
}

export default Order