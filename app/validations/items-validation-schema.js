

const itemsValidation={

name:{
    in: ['body'],
    exists: {
        errorMessage: 'name  is required'
    },
    notEmpty: {
        errorMessage: 'name cannot be empty'
    },
    trim: true 
},
price:{
    in: ['body'],
    exists: {
        errorMessage: 'price  is required'
    },
    notEmpty: {
        errorMessage: 'price cannot be empty'
    },
    isNumeric:{
        errorMessage:"only numbers allowed"
    }
    
},


}


module.exports=itemsValidation