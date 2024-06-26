

const customerValidation={

    registrationNumber:{
        in: ['body'],
        exists: {
            errorMessage: 'registrationNumber  is required'
        },
        notEmpty: {
            errorMessage: 'registrationNumber cannot be empty'
        },
        isAlphanumeric:{
            errorMessage:"registrationNumber must be isAlphanumeric"
        },
        trim: true 
    },
    vehicleType:{
        in: ['body'],
        exists: {
            errorMessage: 'city  is required'
        },
        notEmpty: {
            errorMessage: 'city cannot be empty'
        },
        isIn:{
            options: [['bike', 'truck']],
            errorMessage:' only bike and truck allowed '
        }

        
    },
    city :{
        in: ['body'],
        exists: {
            errorMessage: 'city  is required'
        },
        notEmpty: {
            errorMessage: 'city cannot be empty'
        },
        trim: true 
    },
    activeOrdersCount :{
custom:{
    options:async function(value){
        if(value>2 || value<0){
             throw new Error('should be between 0-2')
        }
    }
}    }
    
    }
    
    
    module.exports=customerValidation