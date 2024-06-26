

const customerValidation={

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
    city:{
        in: ['body'],
        exists: {
            errorMessage: 'city  is required'
        },
        notEmpty: {
            errorMessage: 'city cannot be empty'
        },
        isNumeric:{
            errorMessage:"city numbers allowed"
        }
        
    },
    
    
    }
    
    
    module.exports=customerValidation